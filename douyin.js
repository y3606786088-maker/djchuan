// 抖音Luna诊断脚本
(function() {
    'use strict';
    
    console.log("=== Loon诊断脚本开始执行 ===");
    console.log("请求URL: " + $request.url);
    console.log("请求方法: " + $request.method);
    console.log("响应状态: " + $response.status);
    console.log("响应体长度: " + ($response.body ? $response.body.length : 0));
    
    // 检查是否匹配目标域名
    if ($request.url.includes('beta-luna.douyin.com')) {
        console.log("✅ 匹配到目标域名: beta-luna.douyin.com");
        
        if ($request.url.includes('/luna/me/playlist')) {
            console.log("🎯 精确匹配到播放列表API");
            
            let body = $response.body;
            try {
                let data = JSON.parse(body);
                console.log("✅ JSON解析成功");
                
                // 检查原始VIP状态
                if (data.playlists && data.playlists[0] && data.playlists[0].owner) {
                    console.log("📋 原始VIP状态: " + data.playlists[0].owner.is_vip);
                    console.log("📋 原始VIP阶段: " + data.playlists[0].owner.vip_stage);
                }
                
            } catch (e) {
                console.log("❌ JSON解析失败: " + e);
            }
        } else {
            console.log("ℹ️ 匹配到域名但非目标API: " + $request.url);
        }
    } else {
        console.log("❌ 未匹配到目标域名");
    }
    
    console.log("=== 诊断脚本执行完成 ===");
    $done({});
})();
