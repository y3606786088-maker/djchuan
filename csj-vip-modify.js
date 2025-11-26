
// 传啥机强制VIP解决方案
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    // 用户信息API - 强制VIP状态
    if (url.includes('/api/User/Info')) {
        console.log("🔧 强制设置用户VIP状态");
        
        try {
            let data = JSON.parse(body);
            
            if (data.result) {
                // 全面VIP权限
                data.result.isvip = true;
                data.result.viptype = 3; // 最高等级
                data.result.hasvipcode = true;
                data.result.expiretime = 4102444800; // 2100年到期
                
                // 下载权限
                data.result.canDownload = true;
                data.result.downloadVipSongs = true;
                data.result.unlimitedDownload = true;
                
                body = JSON.stringify(data);
                console.log("✅ 强制VIP状态设置完成");
            }
        } catch (e) {
            console.log("用户信息处理错误: " + e);
        }
    }
    
    // 下载API - 强制成功
    if (url.includes('/api/v2/Music/Down')) {
        console.log("🔧 强制下载成功");
        
        try {
            let data = JSON.parse(body);
            data.retmsg = "记录成功";
            data.result.success = true;
            body = JSON.stringify(data);
            console.log("✅ 强制下载成功完成");
        } catch (e) {
            console.log("下载处理错误: " + e);
        }
    }
    
    $done({body});
})();
