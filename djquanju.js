// ==UserScript==
// @name         电影多多 SVIP 状态修改
// @namespace    https://github.com/your-username/loon-scripts
// @version      1.0
// @description  Loon MITM 脚本，强制修改电影多多 VIP 状态为永久 SVIP
// @author       Your Name
// @match        https://new.dianyinduoduo.com/vip/h5/index.ios.v4.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Loon MITM 拦截响应处理
    if (typeof $response !== 'undefined' && $response.body) {
        let html = $response.body;
        
        // 1. 强制设置登录状态为已登录
        html = html.replace(/var is_login = false;/g, 'var is_login = true;');
        
        // 2. 注入 SVIP 用户信息（覆盖 initUserInfo 调用）
        // 用户名默认显示「SVIP会员」，头像用官方默认图，VIP类型2=SVIP，有效期永久（2099年）
        const svipInitCode = `
        // 注入 SVIP 配置
        (function() {
            // 强制初始化 SVIP 信息
            initUserInfo(
                "SVIP会员",  // 用户名
                "//hscdn.dianyinduoduo.com/img/vip/v1/vip_avatar_default.png",  // 头像
                "2",         // viptype=2（SVIP标识）
                "2099-12-31",// 有效期（永久有效）
                "${getUid()}" // 保留原用户ID（从URL参数提取）
            );
            
            // 从URL参数提取用户UID（保持原用户标识）
            function getUid() {
                const urlParams = new URLSearchParams(window.location.search);
                const dataParam = urlParams.get('data');
                if (dataParam) {
                    try {
                        const data = JSON.parse(decodeURIComponent(dataParam));
                        return data.Uid || "10000000"; // 默认UID
                    } catch (e) {
                        return "10000000";
                    }
                }
                return "10000000";
            }
            
            // 强制显示 SVIP 图标和权益
            document.querySelector('.userinfo-vip-jiaobiao-img').src = '//hscdn.dianyinduoduo.com/img/vip/v1/svip_is_icon.png';
            document.querySelector('.userinfo-vip-jiaobiao-wrapper').style.display = 'block';
            document.querySelector('.userinfo-desc').innerText = '永久SVIP会员';
        })();
        `;
        
        // 将 SVIP 注入代码插入到原脚本执行后（</script> 标签前）
        html = html.replace(/<\/script>(?=[\s\S]*<\/body>)/, svipInitCode + '</script>');
        
        // 3. 隐藏「立即登录」按钮和登录提示
        html = html.replace(/onclick="login\(\)"/g, 'onclick="return false;"');
        html = html.replace(/请登录后购买会员/g, 'SVIP会员无需重复购买');
        
        // 4. 强制所有套餐显示 SVIP 标识（可选优化）
        html = html.replace(/viptaocan-svip-price/g, 'viptaocan-svip-price svip-tag');
        
        // 返回修改后的响应
        $done({ body: html });
    }
})();
