// 文件名: dianyinduoduo_vip_modify.js
// 描述: 点音多多VIP信息修改脚本
// 作者: Generated
// 更新时间: 2025-11-27

if ($response.status === 200) {
    try {
        // 解析响应体
        let body = $response.body;
        
        // 替换用户信息部分，设置为已登录VIP状态
        body = body.replace(
            /<div class="userinfo-title">立即登录<\/div>\s*<div class="userinfo-desc">请登录后购买会员<\/div>/,
            `<div class="userinfo-title">VIP用户</div>
                        <div class="userinfo-desc">有效期至: 2030-12-31 &nbsp;&nbsp;用户ID: 12412462</div>`
        );
        
        // 替换VIP角标显示
        body = body.replace(
            /<div class="userinfo-vip-jiaobiao-wrapper" style="display: none">/,
            '<div class="userinfo-vip-jiaobiao-wrapper" style="display: block">'
        );
        
        // 替换VIP图标为非VIP状态（可根据需要修改）
        body = body.replace(
            /src="\/img\/vip\/v1\/vip_isnot_icon1.png"/,
            'src="/img/vip/v1/svip_is_icon.png"'
        );
        
        // 修改JavaScript中的登录状态
        body = body.replace(
            /var is_login = false;/,
            'var is_login = true;'
        );
        
        // 添加自动调用用户信息初始化（在$(function() {之后插入）
        body = body.replace(
            /\$\(function \(\) \{/,
            `$(function() {
        // 自动初始化VIP用户信息
        initUserInfo("高级VIP用户", "", "2", "2030-12-31", "12412462");`
        );
        
        $done({ body });
    } catch (error) {
        console.log(`VIP修改脚本错误: ${error}`);
        $done({});
    }
} else {
    $done({});
}
