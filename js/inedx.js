// +----------------------------------------------------------------------
// | Quotes [ 突破自己，极速前进！]
// +----------------------------------------------------------------------
// | By: 过客
// +----------------------------------------------------------------------
// | Date: 2022年5月31日
// +----------------------------------------------------------------------
// | Link: https://gitee.com/ke1001/website
// +----------------------------------------------------------------------
(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();
document.onreadystatechange = completeLoading;
function completeLoading() {
    if (document.readyState == "complete") {
        const loadingMask = document.getElementById('loading');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}
window.addEventListener('load', function () {
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', function () {
        header.classList.toggle('open');
    });
    var moves = {
        delay: 500,
        distance: '50px',
        easing: 'ease-in',
        interval: 300,
        duration: 500,
        opacity: 0,
    }
    ScrollReveal().reveal('.abHd', { ...moves, origin: 'left' });
    ScrollReveal().reveal('.adBd', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.seBdBox', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.memberBdBox', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.navlistBdBox', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.caseBdBig', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.hd', { ...moves, origin: 'left' });
    ScrollReveal().reveal('.forHelp', { ...moves, origin: 'left' });
    ScrollReveal().reveal('.forDetails', { ...moves, origin: 'bottom' });
    ScrollReveal().reveal('.FooterSeparate', { ...moves, origin: 'left' });
    // 动画函数
    function animateTop(obj, target, callback) {
        clearInterval(obj.times);
        obj.times = setInterval(function () {
            var step = (target - window.pageYOffset) / 10;
            step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.times);
                if (callback) {
                    callback();
                }
            } else {
                window.scroll(0, window.pageYOffset + step);
            }
        }, 15)
    }
    const goBack = document.querySelector('.goBack');
    const clientHeight = document.documentElement.clientHeight;
    // 页面被卷去的高度超过当前屏幕的高度显示否则就隐藏
    window.addEventListener('scroll', function () {
        var goBackTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (goBackTop >= clientHeight) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        animateTop(window, 0);
    });
    // 打字机特效
    const typewriter = document.querySelector('.typewriter');
    // 获取显示文字的span元素
    const textEl = typewriter.querySelector("#text");
    // 获取并解析要展示的文本数组
    const texts = JSON.parse(textEl.getAttribute("data-text"));
    // 当前显示文本数组中的第几个
    let index = 0;
    // 当前显示第几个字
    let charIndex = 0;
    // 每个字显示间隔默认是500毫秒
    let delta = 500;

    // 记录动画执行开始时间
    let start = null;
    // 是否为删除动画
    let isDeleting = false;

    // 动画回调函数
    function type(time) {
        window.requestAnimationFrame(type);
        // 初始化开始时间
        if (!start) start = time;
        // 获取时间间隔
        let progress = time - start;
        // 每隔一定的时间，打印出一个新的字符
        if (progress > delta) {
            // 获取完整的字符
            let text = texts[index];
            // 如果是打字效果
            if (!isDeleting) {
                // 给展示文字的span新增一个字符，使用innerHTML来替换，charIndex自增1，然后返回新的字符串子串
                textEl.innerHTML = text.slice(0, ++charIndex);
                // 每个字符打印出来的速度不一样，模仿人工打字的速度
                delta = 500 - Math.random() * 400;
            } else {
                // 如果是删除效果，则把文字一个一个减掉
                textEl.innerHTML = text.slice(0, charIndex--);
            }
            // 把star更新为当前时间，进行下一个周期
            start = time;

            // 如果文字已经全部打印完毕
            if (charIndex === text.length) {
                // 下次开始删除文字
                isDeleting = true;
                // 删除文字的间隔为200毫秒
                delta = 200;
                // 额外等待1.2秒后再删除
                start = time + 1200;
            }

            // 如果文字删除完毕
            if (charIndex < 0) {
                isDeleting = false;
                // 额外增加200毫秒延迟
                start = time + 200;
                // 把index移动到下一个文本，并且在文本数组元素个数中循环
                index = ++index % texts.length;
            }
        }
    }
    window.requestAnimationFrame(type);
});