// 保守版脚本 - 最小化修改
(function() {
    'use strict';
    
    const url = $request.url;
    if (!url.includes("/api/User/Info")) {
        $done({});
        return;
    }
    
    let body = $response.body;
    try {
        let data = JSON.parse(body);
        
        // 只修改最基础的VIP状态
        if (data.result) {
            data.result.isvip = true;
            data.result.viptype = 1; // 使用最低的VIP等级
            // 不修改expiretime，让应用使用原始值
        }
        
        body = JSON.stringify(data);
        console.log("基础VIP状态已设置");
        
    } catch (e) {
        console.log("保守脚本执行失败: " + e);
    }
    
    $done({body});
})();
