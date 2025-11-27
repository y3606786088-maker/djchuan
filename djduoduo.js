// 文件名: dianyinduoduo_main.js
// 描述: 点音多多主页面VIP修改

if ($response.status === 200) {
    try {
        let body = $response.body;
        console.log("执行主页面VIP修改...");
        
        // 方法1: 直接替换整个用户信息区域
        const vipUserSection = `
    <div class="userinfo-wrapper">
        <div class="userinfobg-wrapper">
            <div class="userinfobg"></div>
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
        </div>
    </div>`;
        
        // 精确匹配用户信息区域
        body = body.replace(
            /<div class="userinfo-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
            vipUserSection
        );
        
        // 方法2: 修改所有登录相关变量
        body = body.replace(/is_login\s*=\s*false/g, 'is_login = true');
        body = body.replace(/var is_login = false/g, 'var is_login = true');
        
        // 方法3: 在页面加载后立即执行VIP初始化
        const vipInitCode = `
    // VIP自动初始化
    setTimeout(function() {
        if (typeof initUserInfo === 'function') {
            initUserInfo("VIP尊享用户", "", "2", "2030-12-31", "12412462");
        }
        // 强制更新显示
        $('.userinfo-title').text('VIP尊享用户').css('color', '#ffd700');
        $('.userinfo-desc').html('有效期至: 2030-12-31 &nbsp;&nbsp; 用户ID: 12412462');
        $('.userinfo-vip-jiaobiao-wrapper').show();
        $('.userinfo-vip-jiaobiao-img').attr('src', '/img/vip/v1/svip_is_icon.png');
        
        console.log("VIP信息已初始化");
    }, 1500);`;
        
        // 插入到jQuery ready函数中
        if (body.includes('$(function () {')) {
            body = body.replace(
                /\$\(function \(\) \{/,
                `$(function() {${vipInitCode}`
            );
        } else {
            // 或者插入到script标签末尾
            body = body.replace(
                /<\/script>\s*<\/body>/,
                `<script>${vipInitCode}<\/script><\/body>`
            );
        }
        
        console.log("主页面修改完成");
        $done({ body });
        
    } catch (error) {
        console.log("主页面修改错误:", error);
        $done({});
    }
} else {
    $done({});
}
