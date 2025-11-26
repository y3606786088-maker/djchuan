// 传啥机完整VIP权限解决方案
// 同时处理用户信息和下载权限
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        // 用户信息API - 确保VIP状态
        if (url.includes('/api/User/Info')) {
            if (data.result) {
                // VIP核心状态
                data.result.isvip = true;
                data.result.viptype = 2;
                data.result.hasvipcode = true;
                data.result.expiretime = Math.floor(Date.now() / 1000) + 31536000;
                
                console.log("👑 用户VIP状态已设置");
            }
        }
        
        // 下载API - 精确修复VIP限制
        if (url.includes('/api/v2/Music/Down')) {
            const requestData = JSON.parse($request.body);
            const musicId = requestData.MusicId;
            
            console.log("⬇️ 处理音乐下载请求，MusicId: " + musicId);
            
            // 如果是VIP限制，修复为成功
            if (data.retmsg && data.retmsg.includes("VIP")) {
                data.retmsg = "记录成功";
                data.result.success = true;
                console.log("✅ VIP下载限制已修复");
            } else {
                console.log("ℹ️ 已经是成功状态，无需修改");
            }
        }
        
        body = JSON.stringify(data);
        
    } catch (e) {
        console.log("❌ 处理错误: " + e);
    }
    
    $done({body});
})();
