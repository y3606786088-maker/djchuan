// 文件名: dianyinduoduo_vip_modify_v3.js
// 描述: 点音多多VIP信息修改脚本 - 激进版

if ($response.status === 200) {
    try {
        let body = $response.body;
        
        // 完全重写用户信息部分
        const vipUserHTML = `
            <div class="userinfo-user-wrapper">
                <div class="userinfo-avatar-wrapper" style="background: url('//hs.ergecdn.com/bb/pages/img/buyvip/logo_ali.png') center center / cover no-repeat"></div>
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
        
        body = body.replace(
            /<div class="userinfo-user-wrapper" onclick="login\(\)">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
            vipUserHTML
        );
        
        // 强制修改所有相关JavaScript变量
        body = body.replace(/var is_login = false;/g, 'var is_login = true;');
        body = body.replace(/is_login = false/g, 'is_login = true');
        
        // 在脚本最前面插入初始化代码
        body = body.replace(
            /<script>\s*var c_gid =/,
            `<script>
        // VIP信息自动初始化
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                if (typeof initUserInfo === 'function') {
                    initUserInfo("VIP尊享用户", "//hs.ergecdn.com/bb/pages/img/buyvip/logo_ali.png", "2", "2030-12-31", "12412462");
                }
            }, 500);
        });
        var c_gid =`
        );
        
        $done({ body });
        
    } catch (error) {
        console.log(`VIP修改脚本错误: ${error}`);
        $done({});
    }
} else {
    $done({});
}
