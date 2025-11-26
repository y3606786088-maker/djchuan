
// 终极安全版VIP脚本
(function() {
    'use strict';
    
    const url = $request.url;
    
    // 全面排除列表
    const excludeKeywords = [
        'sms', 'code', 'verify', 'captcha',
        'login', 'register', 'auth', 'password',
        'send', 'get', 'check', 'valid',
        'token', 'oauth', 'cert', 'security'
    ];
    
    // 检查URL是否包含排除关键词
    const shouldSkip = excludeKeywords.some(keyword => 
        url.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (shouldSkip) {
        console.log("跳过安全相关API: " + url);
        $done({});
        return;
    }
    
    // 严格匹配目标API
    if (!url.includes('/api/User/Info')) {
        $done({});
        return;
    }
    
    let body = $response.body;
    try {
        let data = JSON.parse(body);
        
        if (data.result) {
            // 最小化修改，避免触发验证
            data.result.isvip = true;
            data.result.viptype = 1;
            console.log("VIP状态已安全设置");
        }
        
        body = JSON.stringify(data);
    } catch(e) {
        console.log("JSON解析错误: " + e);
    }
    
    $done({body});
})();
