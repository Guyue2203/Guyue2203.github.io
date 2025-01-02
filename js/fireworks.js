"use strict";

function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function createCircle(e, t) {
    console.log('Creating circle at:', e, t);
    var a = {};
    return a.x = e,
    a.y = t,
    a.color = "#5A87FF",
    a.radius = 0.1,
    a.alpha = 0.5,
    a.lineWidth = 3,
    a.draw = function () {
        console.log('Drawing circle with radius:', a.radius);
        ctx.globalAlpha = a.alpha,
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        ctx.lineWidth = a.lineWidth,
        ctx.strokeStyle = a.color,
        ctx.stroke(),
        ctx.globalAlpha = 1
    },
    a
}

function renderParticule(e) {
    console.log('Rendering with animatables:', e.animatables.length);
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw();
    }
}

function animateParticules(e, t) {
    console.log('Animating at:', e, t);
    var circles = [];
    
    // 创建四个圆环
    for (var i = 0; i < 4; i++) {
        circles.push(createCircle(e, t));
    }

    anime.timeline()
        .add({
            targets: circles,
            radius: function(el, i) {
                // 调整半径范围，让效果更明显
                switch(i) {
                    case 0: return anime.random(30, 40);    // 增大最内圈
                    case 1: return anime.random(60, 70);    // 增大第二圈
                    case 2: return anime.random(90, 100);   // 增大第三圈
                    case 3: return anime.random(120, 130);  // 增大最外圈
                }
            },
            lineWidth: function(el, i) {
                return 6 - i;  // 增加线条宽度
            },
            alpha: {
                value: 0,
                easing: "linear",
                duration: function(el, i) {
                    return 400 + i * 100;  // 稍微加快消失速度
                }
            },
            duration: function(el, i) {
                return 800 + i * 100;  // 稍微加快扩散速度
            },
            easing: "easeOutExpo",
            update: renderParticule,
            offset: function(el, i) {
                return i * 50;  // 减小时间间隔
            }
        });
}

var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
    console.log('Canvas found!');
    var ctx = canvasEl.getContext("2d"),
        numberOfParticules = 0,
        pointerX = 0,
        pointerY = 0,
        tap = "mousedown",
        render = anime({
            duration: Infinity,
            update: function() {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            }
        });

    document.addEventListener(tap, function(e) {
        console.log('Click event triggered!');
        if ("sidebar" !== e.target.id && 
            "toggle-sidebar" !== e.target.id && 
            "A" !== e.target.nodeName && 
            "IMG" !== e.target.nodeName) {
                render.play();
                updateCoords(e);
                animateParticules(pointerX, pointerY);
        }
    }, false);

    setCanvasSize(); // 立即设置画布大小

    var setCanvasSize = debounce(function() {
        canvasEl.width = 2 * window.innerWidth;
        canvasEl.height = 2 * window.innerHeight;
        canvasEl.style.width = window.innerWidth + "px";
        canvasEl.style.height = window.innerHeight + "px";
        canvasEl.getContext("2d").scale(2, 2);
    }, 500);

    window.addEventListener("resize", setCanvasSize, false);
}

function debounce(e, t) {
    var a;
    return function() {
        var n = this,
            i = arguments;
        clearTimeout(a),
        a = setTimeout(function() {
            e.apply(n, i);
        }, t);
    };
}

