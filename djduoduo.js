// 文件名: dianyinduoduo_vip_fix.js
// 描述: 点音多多VIP页面强制修改

if ($response.status === 200 && $request.url.includes('/vip/h5/index.ios.v4.php')) {
    try {
        console.log("🎯 开始强制修改VIP页面...");
        let body = $response.body;
        
        // 记录原始内容用于调试
        console.log("📄 原始HTML包含关键词:");
        console.log("- 立即登录:", body.includes('立即登录'));
        console.log("- 请登录后购买会员:", body.includes('请登录后购买会员'));
        console.log("- is_login:", body.includes('is_login'));
        
        // 方法1: 直接字符串替换（最可靠）
        body = body.replace(/立即登录/g, 'VIP尊享用户');
        body = body.replace(/请登录后购买会员/g, '有效期至: 2030-12-31    用户ID: 12412462');
        
        // 方法2: 修改JavaScript变量
        body = body.replace(/var is_login = false;/g, 'var is_login = true;');
        body = body.replace(/is_login = false/g, 'is_login = true');
        
        // 方法3: 显示VIP角标
        body = body.replace(/display: none/g, 'display: block');
        body = body.replace(/vip_isnot_icon1\.png/g, 'svip_is_icon.png');
        
        // 方法4: 插入自动初始化代码
        const autoInit = `
<!-- VIP自动初始化 -->
<script>
setTimeout(function() {
    // 方法A: 调用页面现有函数
    if (typeof initUserInfo === 'function') {
        initUserInfo("VIP尊享用户", "", "2", "2030-12-31", "12412462");
    }
    
    // 方法B: 直接DOM操作
    try {
        var titleEl = document.querySelector('.userinfo-title');
        var descEl = document.querySelector('.userinfo-desc');
        var vipBadge = document.querySelector('.userinfo-vip-jiaobiao-wrapper');
        var vipImg = document.querySelector('.userinfo-vip-jiaobiao-img');
        
        if (titleEl) titleEl.textContent = 'VIP尊享用户';
        if (descEl) descEl.innerHTML = '有效期至: 2030-12-31 &nbsp;&nbsp; 用户ID: 12412462';
        if (vipBadge) vipBadge.style.display = 'block';
        if (vipImg) vipImg.src = '/img/vip/v1/svip_is_icon.png';
        
        console.log('VIP信息强制初始化完成');
    } catch(e) {
        console.log('DOM操作错误:', e);
    }
}, 500);
</script>
`;
        
        // 插入到body结束前
        if (body.includes('</body>')) {
            body = body.replace('</body>', autoInit + '</body>');
        } else {
            body += autoInit;
        }
        
        console.log("✅ VIP页面强制修改完成");
        console.log("📊 修改后长度:", body.length);
        $done({ body });
        
    } catch (error) {
        console.log("❌ VIP页面修改错误:", error);
        $done({});
    }
} else {
    $done({});
}
