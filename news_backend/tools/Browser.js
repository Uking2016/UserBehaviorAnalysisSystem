/**
 * 浏览器解析，浏览器、node.js皆可
 * https://github.com/mumuy/browser
 */

(function (root, factory) {
    if (typeof define === 'function' && (define.amd||define.cmd)) {
        // amd&cmd
        define(factory);
    } else if (typeof exports === 'object') {
        // node, commonjs-like
        module.exports = factory();
    } else {
        // browser globals (root is window)
        root.browser = factory();
    }
}(this, function () {
    var _window = this||{};
    var _navigator = typeof navigator!='undefined'?navigator:{};
    var _mime = function (option, value) {
        var mimetypes = navigator.mimetypes;      
        for (var mt in mimetypes) {
            if (mimetypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    };

    return function (useragent) {
        var u = useragent;
        var _this = this;
        var match = {
            //内核
            'trident': u.indexOf('trident') > -1 || u.indexOf('net clr') > -1,
            'presto': u.indexOf('presto') > -1,
            'webkit': u.indexOf('applewebkit') > -1,
            'gecko': u.indexOf('gecko/') > -1,
            //浏览器
            'safari': u.indexOf('safari') > -1,
            'chrome': u.indexOf('chrome') > -1 || u.indexOf('crios') > -1,
            'ie': u.indexOf('msie') > -1 || u.indexOf('trident') > -1,
            'edge': u.indexOf('edge') > -1,
            'firefox': u.indexOf('firefox') > -1 || u.indexOf('fxios') > -1,
            'firefox focus': u.indexOf('focus') > -1,
            'chromium': u.indexOf('chromium') > -1,
            'opera': u.indexOf('opera') > -1 || u.indexOf('opr') > -1,
            'vivaldi': u.indexOf('vivaldi') > -1,
            'yandex': u.indexOf('yabrowser') > -1,
            'arora': u.indexOf('arora') > -1,
            'lunascape': u.indexOf('lunascape') > -1,
            'qupzilla': u.indexOf('qupzilla') > -1,
            'coc coc': u.indexOf('coc_coc_browser') > -1,
            'kindle': u.indexOf('kindle') > -1 || u.indexOf('silk/') > -1,
            'iceweasel': u.indexOf('iceweasel') > -1,
            'konqueror': u.indexOf('konqueror') > -1,
            'iceape': u.indexOf('iceape') > -1,
            'seamonkey': u.indexOf('seamonkey') > -1,
            'epiphany': u.indexOf('epiphany') > -1,
            '360': u.indexOf('qihoobrowser') > -1,
            '360ee': u.indexOf('360ee') > -1,
            '360se': u.indexOf('360se') > -1,
            'uc': u.indexOf('uc') > -1 || u.indexOf(' ubrowser') > -1,
            'qqbrowser': u.indexOf('qqbrowser') > -1,
            'qq': u.indexOf('qq/') > -1,
            'baidu': u.indexOf('baidu') > -1 || u.indexOf('bidubrowser') > -1,
            'maxthon': u.indexOf('maxthon') > -1,
            'sogou': u.indexOf('metasr') > -1 || u.indexOf('sogou') > -1,
            'lbbrowser': u.indexOf('lbbrowser') > -1,
            '2345explorer': u.indexOf('2345explorer') > -1,
            'theworld': u.indexOf('theworld') > -1,
            'xiaomi': u.indexOf('miuibrowser') > -1,
            'quark': u.indexOf('quark') > -1,
            'qiyu': u.indexOf('qiyu') > -1,
            'wechat': u.indexOf('micromessenger') > -1,
            'taobao': u.indexOf('aliapp(tb') > -1,
            'alipay': u.indexOf('aliapp(ap') > -1,
            'weibo': u.indexOf('weibo') > -1,
            'douban': u.indexOf('com.douban.frodo') > -1,
            'suning': u.indexOf('snebuy-app') > -1,
            'iqiyi': u.indexOf('iqiyiapp') > -1,
            //系统或平台
            'windows': u.indexOf('windows') > -1,
            'linux': u.indexOf('linux') > -1 || u.indexOf('x11') > -1,
            'mac os': u.indexOf('macintosh') > -1,
            'android': u.indexOf('android') > -1 || u.indexOf('adr') > -1,
            'ubuntu': u.indexOf('ubuntu') > -1,
            'freebsd': u.indexOf('freebsd') > -1,
            'debian': u.indexOf('debian') > -1,
            'windows phone': u.indexOf('iemobile') > -1 || u.indexOf('windows phone')>-1,
            'blackberry': u.indexOf('blackberry') > -1 || u.indexOf('rim') > -1,
            'meego': u.indexOf('meego') > -1,
            'symbian': u.indexOf('symbian') > -1,
            'ios': u.indexOf('like mac os x') > -1,
            'chrome os': u.indexOf('cros') > -1,
            'webos': u.indexOf('hpwos') > -1,
            //设备
            'mobile': u.indexOf('mobi') > -1 || u.indexOf('iph') > -1 || u.indexOf('480') > -1,
            'tablet': u.indexOf('tablet') > -1 || u.indexOf('pad') > -1 || u.indexOf('nexus 7') > -1
        };
        var is360 = false;
       
        if(_window.chrome){
            is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
            if(_window.showmodaldialog){
                var chrome_vision = u.replace(/^.*chrome\/([\d]+).*$/, '$1');
                if(chrome_vision>36){
                    is360 = true;
                }
            }
        }
        //修正
        if (match['mobile']) {
            match['mobile'] = !(u.indexOf('ipad') > -1);
        } else if (is360) {
            if(_mime("type", "application/gameplugin")){
                match['360se'] = true;
            }else{
                match['360ee'] = true;
            }
        }
        if(match['ie']||match['edge']){
            var navigator_top = window.screentop-window.screeny;
            switch(navigator_top){
                case 71: //无收藏栏,贴边
                case 74: //无收藏栏,非贴边
                case 99: //有收藏栏,贴边
                case 102: //有收藏栏,非贴边
                    match['360ee'] = true;
                    break;
                case 75: //无收藏栏,贴边
                case 74: //无收藏栏,非贴边
                case 105: //有收藏栏,贴边
                case 104: //有收藏栏,非贴边
                    match['360se'] = true;
                    break;
            }
        }
        //基本信息
        var hash = {
            engine: ['webkit', 'trident', 'gecko', 'presto'],
            browser: ['safari', 'chrome', 'edge', 'ie', 'firefox', 'firefox focus', 'chromium', 'opera', 'vivaldi', 'yandex', 'arora', 'lunascape', 'qupzilla', 'coc coc', 'kindle', 'iceweasel', 'konqueror', 'iceape', 'seamonkey', 'epiphany', '360', '360se', '360ee', 'uc', 'qqbrowser', 'qq', 'baidu', 'maxthon', 'sogou', 'lbbrowser', '2345explorer', 'theworld', 'xiaomi', 'quark', 'qiyu', 'wechat', 'taobao', 'alipay', 'weibo', 'douban','suning', 'iqiyi'],
            os: ['windows', 'linux', 'mac os', 'android', 'ubuntu', 'freebsd', 'debian', 'ios', 'windows phone', 'blackberry', 'meego', 'symbian', 'chrome os', 'webos'],
            device: ['mobile', 'tablet']
        };
        _this.device = 'pc';
        for (var s in hash) {
            for (var i = 0; i < hash[s].length; i++) {
                var value = hash[s][i];
                if (match[value]) {
                    _this[s] = value;
                }
            }
        }
        //系统版本信息
        var osversion = {
            'windows': function () {
                var v = u.replace(/^.*windows nt ([\d.]+);.*$/, '$1');
                var hash = {
                    '6.4': '10',
                    '6.3': '8.1',
                    '6.2': '8',
                    '6.1': '7',
                    '6.0': 'vista',
                    '5.2': 'xp',
                    '5.1': 'xp',
                    '5.0': '2000'
                };
                return hash[v] || v;
            },
            'android': function () {
                return u.replace(/^.*android ([\d.]+);.*$/, '$1');
            },
            'ios': function () {
                return u.replace(/^.*os ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
            },
            'debian': function () {
                return u.replace(/^.*debian\/([\d.]+).*$/, '$1');
            },
            'windows phone': function () {
                return u.replace(/^.*windows phone( os)? ([\d.]+);.*$/, '$2');
            },
            'mac os': function () {
                return u.replace(/^.*mac os x ([\d_]+).*$/, '$1').replace(/_/g, '.');
            },
            'webos': function () {
                return u.replace(/^.*hpwos\/([\d.]+);.*$/, '$1');
            }
        };
        _this.osversion = '';
        if (osversion[_this.os]) {
            _this.osversion = osversion[_this.os]();
            if (_this.osversion == u) {
                _this.osversion = '';
            }
        }
        //浏览器版本信息
        var version = {
            'safari': function () {
                return u.replace(/^.*version\/([\d.]+).*$/, '$1');
            },
            'chrome': function () {
                return u.replace(/^.*chrome\/([\d.]+).*$/, '$1').replace(/^.*crios\/([\d.]+).*$/, '$1');
            },
            'ie': function () {
                return u.replace(/^.*msie ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
            },
            'edge': function () {
                return u.replace(/^.*edge\/([\d.]+).*$/, '$1');
            },
            'firefox': function () {
                return u.replace(/^.*firefox\/([\d.]+).*$/, '$1').replace(/^.*fxios\/([\d.]+).*$/, '$1');
            },
            'firefox focus': function () {
                return u.replace(/^.*focus\/([\d.]+).*$/, '$1');
            },
            'chromium': function () {
                return u.replace(/^.*chromium\/([\d.]+).*$/, '$1');
            },
            'opera': function () {
                return u.replace(/^.*opera\/([\d.]+).*$/, '$1').replace(/^.*opr\/([\d.]+).*$/, '$1');
            },
            'vivaldi': function () {
                return u.replace(/^.*vivaldi\/([\d.]+).*$/, '$1');
            },
            'yandex': function () {
                return u.replace(/^.*yabrowser\/([\d.]+).*$/, '$1');
            },
            'arora': function () {
                return u.replace(/^.*arora\/([\d.]+).*$/, '$1');
            },
            'lunascape': function(){
                return u.replace(/^.*lunascape[\/\s]([\d.]+).*$/, '$1');
            },
            'qupzilla': function(){
                return u.replace(/^.*qupzilla[\/\s]([\d.]+).*$/, '$1');
            },
            'coc coc': function(){
                return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
            },
            'kindle': function () {
                return u.replace(/^.*version\/([\d.]+).*$/, '$1');
            },
            'iceweasel': function () {
                return u.replace(/^.*iceweasel\/([\d.]+).*$/, '$1');
            },
            'konqueror': function () {
                return u.replace(/^.*konqueror\/([\d.]+).*$/, '$1');
            },
            'iceape': function () {
                return u.replace(/^.*iceape\/([\d.]+).*$/, '$1');
            },
            'seamonkey': function () {
                return u.replace(/^.*seamonkey\/([\d.]+).*$/, '$1');
            },
            'epiphany': function () {
                return u.replace(/^.*epiphany\/([\d.]+).*$/, '$1');
            },
            '360': function(){
                return u.replace(/^.*qihoobrowser\/([\d.]+).*$/, '$1');
            },
            '360se': function(){
                var hash = {'55':'9.1','45':'8.1','42':'8.0','31':'7.0','21':'6.3'};
                var chrome_vision = u.replace(/^.*chrome\/([\d]+).*$/, '$1');
                return hash[chrome_vision]||'';
            },
            '360ee': function(){
                var hash = {'63':'9.5','55':'9.0','50':'8.7','30':'7.5'};
                var chrome_vision = u.replace(/^.*chrome\/([\d]+).*$/, '$1');
                return hash[chrome_vision]||'';
            },
            'maxthon': function () {
                return u.replace(/^.*maxthon\/([\d.]+).*$/, '$1');
            },
            'qqbrowser': function () {
                return u.replace(/^.*qqbrowser\/([\d.]+).*$/, '$1');
            },
            'qq': function () {
                return u.replace(/^.*qq\/([\d.]+).*$/, '$1');
            },
            'baidu': function () {
                return u.replace(/^.*bidubrowser[\s\/]([\d.]+).*$/, '$1');
            },
            'uc': function () {
                return u.replace(/^.*uc?browser\/([\d.]+).*$/, '$1');
            },
            'sogou': function () {
                return u.replace(/^.*se ([\d.x]+).*$/, '$1').replace(/^.*sogoumobilebrowser\/([\d.]+).*$/, '$1');
            },
            'lbbrowser': function(){
                var hash = {'57':'6.5','49':'6.0','46':'5.9','42':'5.3','39':'5.2','34':'5.0','29':'4.5','21':'4.0'};
                var chrome_vision = navigator.useragent.replace(/^.*chrome\/([\d]+).*$/, '$1');
                return hash[chrome_vision]||'';
            },
            '2345explorer': function () {
                return u.replace(/^.*2345explorer\/([\d.]+).*$/, '$1');
            },
            'theworld': function () {
                return u.replace(/^.*theworld ([\d.]+).*$/, '$1');
            },
            'xiaomi': function () {
                return u.replace(/^.*miuibrowser\/([\d.]+).*$/, '$1');
            },
            'quark': function () {
                return u.replace(/^.*quark\/([\d.]+).*$/, '$1');
            },
            'qiyu': function () {
                return u.replace(/^.*qiyu\/([\d.]+).*$/, '$1');
            },
            'wechat': function () {
                return u.replace(/^.*micromessenger\/([\d.]+).*$/, '$1');
            },
            'taobao': function () {
                return u.replace(/^.*aliapp\(tb\/([\d.]+).*$/, '$1');
            },
            'alipay': function () {
                return u.replace(/^.*aliapp\(ap\/([\d.]+).*$/, '$1');
            },
            'weibo': function () {
                return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
            },
            'douban': function () {
                return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
            },
            'suning': function () {
                return u.replace(/^.*snebuy-app([\d.]+).*$/, '$1');
            },
            'iqiyi': function () {
                return u.replace(/^.*iqiyiversion\/([\d.]+).*$/, '$1');
            }
        };
        _this.version = '';
        if (version[_this.browser]) {
            _this.version = version[_this.browser]();
            if (_this.version == u) {
                _this.version = '';
            }
        }
        //修正
        if (_this.browser == 'edge') {
            _this.engine = 'edgehtml';
        } else if (_this.browser == 'chrome' && parseInt(_this.version) > 27) {
            _this.engine = 'blink';
        } else if (_this.browser == 'opera' && parseInt(_this.version) > 12) {
            _this.engine = 'blink';
        } else if (_this.browser == 'yandex') {
            _this.engine = 'blink';
        }
    };
}));