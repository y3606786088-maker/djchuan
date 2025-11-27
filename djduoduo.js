// 文件名: dianyinduoduo_vip_modify_final.js
// 描述: 点音多多VIP信息修改脚本 - 最终版

if ($response.status === 200) {
    try {
        let body = $response.body;
        console.log("开始执行VIP修改脚本...");
        
        // 1. 完全重写用户信息部分 - 使用更精确的匹配
        const newUserInfo = `
            <div class="userinfo-user-wrapper">
                <div class="userinfo-avatar-wrapper"></div>
                <div class="userinfo-info-wrapper">
                    <div class="userinfo-vip-wrapper">
                        <div class="userinfo-title">VIP尊享用户</div>
                        <div class="userinfo-vip-jiaobiao-wrapper" style="display: block">
                            <img class="userinfo-vip-jiaobiao-img" src="/img/vip/v1/svip_is_icon.png" alt="">
                        </div>
                    </div>
                    <div class="userinfo-desc">
                        有效期至: 2030-12-31 &nbsp;&nbsp; 用户ID: 12412462
                    </div>
                </div>
            </div>
        `;
        
        // 更精确的匹配用户信息区域
        body = body.replace(
            /<div class="userinfo-user-wrapper" onclick="login\(\)">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
            `<div class="userinfo-wrapper">
        <div class="userinfobg-wrapper">
            <div class="userinfobg"></div>
            ${newUserInfo}
        </div>
    </div>`
        );
        
        // 2. 强制修改所有登录状态变量
        body = body.replace(/var is_login = false;/g, 'var is_login = true;');
        body = body.replace(/is_login = false/g, 'is_login = true');
        
        // 3. 在jQuery ready函数中插入初始化调用
        body = body.replace(
            /\$\(function \(\) \{[\s\S]*?updatePaymethod\(paymethod, true\);\s*\}/,
            `$(function() {
        updateHtmlFontSize();
        updateViptaocan();
        updatePaymethod(paymethod, true);
        
        // 自动初始化VIP用户信息
        setTimeout(function() {
            if (typeof initUserInfo === 'function') {
                initUserInfo("VIP尊享用户", "", "2", "2030-12-31", "12412462");
            }
            // 强制更新UI显示
            $('.userinfo-title').text('VIP尊享用户');
            $('.userinfo-desc').html('有效期至: 2030-12-31 &nbsp;&nbsp; 用户ID: 12412462');
            $('.userinfo-vip-jiaobiao-wrapper').show();
            $('.userinfo-vip-jiaobiao-img').attr('src', '/img/vip/v1/svip_is_icon.png');
        }, 1000);
    }`
        );
        
        // 4. 修改默认选中的商品和价格显示
        body = body.replace(
            /<div class="pay-price">\$30<\/div>/,
            '<div class="pay-price">¥1</div>'
        );
        
        // 5. 确保VIP角标显示
        body = body.replace(
            /<div class="userinfo-vip-jiaobiao-wrapper" style="display: none">/g,
            '<div class="userinfo-vip-jiaobiao-wrapper" style="display: block">'
        );
        
        console.log("VIP信息修改完成，响应体长度:", body.length);
        $done({ body });
        
    } catch (error) {
        console.log(`VIP修改脚本错误: ${error}`);
        $done({});
    }
} else {
    $done({});
}
