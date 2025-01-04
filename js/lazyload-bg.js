document.addEventListener('DOMContentLoaded', function() {
    // 确保页面主要内容已加载
    setTimeout(function() {
        // 预加载背景图
        var img = new Image();
        img.src = '/images/background.jpg';  // 替换为你的背景图路径
        
        img.onload = function() {
            // 图片加载完成后添加类名
            document.body.classList.add('bg-loaded');
        };
    }, 1000);  // 延迟1秒再加载背景图
});
