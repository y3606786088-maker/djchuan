// 抖音Luna域名发现脚本
(function() {
    'use strict';
    
    const url = $request.url;
    
    // 记录所有包含luna、douyin、音乐的请求
    if (url.includes('luna') || 
        url.includes('douyin') || 
        url.includes('music') ||
        url.includes('歌曲') ||
        url.includes('播放') ||
        $request.headers['User-Agent'] && $request.headers['User-Agent'].includes('Luna')) {
        
        console.log("🎵 发现疑似抖音Luna请求:");
        console.log("📡 URL: " + url);
        console.log("🏷️ Host: " + $request.hostname);
        console.log("👤 User-Agent: " + ($request.headers['User-Agent'] || '未知'));
        console.log("---");
    }
    
    $done({});
})();
