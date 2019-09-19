/* ------------------------------------------------------------------------------
 *
 *  # 微信分享自定义
 *
 *  Version: 1.0
 *  Latest update: 2016-07-04 14:08
 *
 * ---------------------------------------------------------------------------- */
$.fn.wechatShare = function (wxConfig, options) {
    var _wxdefaultConfig = {};
    var defaults = {
        debug: false,                  //调试模式
        tit : '分享标题',
        img : 'http://www.test.com/02.jpg',
        con :"分享描叙",
        link : 'http://www.test.com/', //不能跨域
        hy :function () {},
        pyq :function () {},
        qq :function () {},
        wb :function () {},
        qz :function () {}
    };

    var opts = $.extend(defaults, options);
    var wxConfig = $.extend(_wxdefaultConfig, wxConfig);

    var concat = function (o, fns) {
        return $.extend(o, {
            trigger: function (res) {
                if (fns.trigger) fns.trigger(res);
                if (opts.debug) alert("点击了分享");
            },
            complete: function (res) {
                if (fns.trigger) fns.trigger(res);
            },
            success: function (res) {
                if (fns.success) fns.success(res);
                if (opts.debug) alert("已分享");
            },
            cancel: function (res) {
                if (fns.cancel) fns.cancel(res);
                if (opts.debug) alert("已取消");
            },
            fail: function (res) {
                if (fns.fail) fns.fail(res);
                if (opts.debug) alert(JSON.stringify(res));
            }
        });
    }

    wx.config({
        debug: opts.debug,
        appId: wxConfig[0],
        timestamp: wxConfig[1], // 必填，生成签名的时间戳
        nonceStr: wxConfig[2], // 必填，生成签名的随机串
        signature: wxConfig[3], // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
    wx.ready(function () {
        wx.error(function(res){
			if (opts.debug) alert("出错了:"+  res[0].toString() + res[1].toString() );
        });
        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'],
            success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"onMenuShareAppMessage":true},"errMsg":"checkJsApi:ok"}
            }
        });
        wx.onMenuShareAppMessage(concat({
            title: opts.tit,
            desc: opts.con,
            link: opts.link,
            imgUrl: opts.img
        }, opts.hy));
        wx.onMenuShareTimeline(concat({
            title: opts.tit,
            desc: opts.con,
            link: opts.link,
            imgUrl: opts.img
        }, opts.pyq));
        wx.onMenuShareQQ(concat({
            title: opts.tit,
            desc: opts.con,
            link: opts.link,
            imgUrl: opts.img
        }, opts.qq));
        wx.onMenuShareWeibo(concat({
            title: opts.tit,
            desc: opts.con,
            link: opts.link,
            imgUrl: opts.img
        }, opts.wb));
    });
};