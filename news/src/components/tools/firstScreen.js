import $ from 'jquery' 

export function firstScreen(_this) {
    //收集所有页面的加载时间
    var imgs = document.getElementsByTagName("img");
    var fsItems = [];
    var loadEvent = function() {
        //gif避免
        if (this.removeEventListener) {
            this.removeEventListener("load", loadEvent, false);
        }
        var curTime = +new Date;
        fsItems.push({
            img: this,
            time: curTime
        });
    }
    for (var i = 0; i < imgs.length; i++) {
        (function() {
            var img = imgs[i];
            if (img.addEventListener) {
                !img.complete && img.addEventListener("load", loadEvent, false);
            } else if (img.attachEvent) {
                img.attachEvent("onreadystatechange", function() {
                    if (img.readyState == "complete") {
                        loadEvent.call(img, loadEvent);
                    }
                });
            }
        })();
    }

    //获取元素在dom中的位置
    function getOffsetTop(elem) {
        var top = 0;
        top = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
        top += elem.getBoundingClientRect().top;
        return top;
    }
    function findMaxTime() {
        var sh = document.documentElement.clientHeight,
            maxTime = 0;
        for (var i = 0; i < fsItems.length; i++) {
            var item = fsItems[i],
                img = item['img'],
                time = item['time'],
                top = getOffsetTop(img);
            if (top > 0 && top < sh) { //找首屏中的图片
                maxTime = time > maxTime ? time : maxTime;
            }
        }
        return maxTime;
    }
    window.addEventListener('load', function() {
        var imgTime = findMaxTime(),
            domTime = window.performance.timing.domInteractive, //dom完成时间
            speedTime,
            startTime = window.performance.timing.navigationStart || window.performance.timing.startTime, //页面首页时间
            screenTime = imgTime > 0 ? imgTime : domTime; //如果没有图片，直接取dom时间
        speedTime = screenTime - startTime;
        _this.startTime = startTime;
        _this.speedTime = speedTime;
        _this.addVisit();
    });
//     window.onbeforeunload = function(){
//              _this.endTime = new Date().getTime();
        
//         return "Are you sure to leave?" ;
//    }

}