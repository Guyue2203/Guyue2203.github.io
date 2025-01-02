"use strict";

function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function createCircle(e, t) {
    var a = {};
    return a.x = e,
    a.y = t,
    a.color = "#5A87FF",
    a.radius = 0.1,
    a.alpha = 0.5,
    a.lineWidth = 3,
    a.draw = function () {
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
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw();
    }
}

function animateParticules(e, t) {
    var circles = [];
    for (var i = 0; i < 4; i++) {
        circles.push(createCircle(e, t));
    }

    anime.timeline().add({
        targets: circles,
        radius: function(el, i) {
            switch(i) {
                case 0: return anime.random(15, 20);
                case 1: return anime.random(30, 35);
                case 2: return anime.random(45, 50);
                case 3: return anime.random(60, 65);
            }
        },
        lineWidth: function(el, i) {
            return 4 - i * 0.5;
        },
        alpha: {
            value: 0,
            easing: "linear",
            duration: function(el, i) {
                return 600 + i * 100;
            }
        },
        duration: function(el, i) {
            return 1000 + i * 100;
        },
        easing: "easeOutExpo",
        update: renderParticule,
        offset: function(el, i) {
            return i * 80;
        }
    });
}

var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
    var ctx = canvasEl.getContext("2d"),
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
        "sidebar" !== e.target.id && 
        "toggle-sidebar" !== e.target.id && 
        "A" !== e.target.nodeName && 
        "IMG" !== e.target.nodeName && (
            render.play(),
            updateCoords(e),
            animateParticules(pointerX, pointerY)
        );
    }, false);

    var setCanvasSize = debounce(function() {
        canvasEl.width = 2 * window.innerWidth,
        canvasEl.height = 2 * window.innerHeight,
        canvasEl.style.width = window.innerWidth + "px",
        canvasEl.style.height = window.innerHeight + "px",
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

