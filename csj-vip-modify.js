
// 下载功能调试和发现脚本
(function() {
    'use strict';
    
    const url = $request.url;
    
    // 记录所有音乐相关请求
    if (url.includes('Music') || url.includes('music') || url.includes('Down')) {
        console.log("=== 音乐相关请求详情 ===");
        console.log("URL: " + url);
        console.log("Method: " + $request.method);
        console.log("请求头: " + JSON.stringify($request.headers));
        
        if ($request.body) {
            console.log("请求体: " + $request.body);
            try {
                const reqBody = JSON.parse($request.body);
                console.log("解析后的请求体: " + JSON.stringify(reqBody));
            } catch(e) {
                console.log("请求体解析失败");
            }
        }
        
        console.log("响应状态: " + $response.status);
        console.log("响应体: " + $response.body);
        console.log("=========================");
    }
    
    $done({});
})();
