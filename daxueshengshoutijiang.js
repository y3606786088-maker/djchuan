// 大学搜题酱VIP修改 - 查看原始响应体
if ($request.url.includes('/capi/user/userinfov3')) {
    console.log("🎯 查看原始响应体");
    
    // 输出响应体的前500个字符
    console.log("响应体前500字符: " + $response.body.substring(0, 500));
    
    // 检查响应体是否包含VIP相关信息
    console.log("包含'vip': " + $response.body.includes('vip'));
    console.log("包含'Vip': " + $response.body.includes('Vip'));
    console.log("包含'VIP': " + $response.body.includes('VIP'));
    console.log("包含'isVip': " + $response.body.includes('isVip'));
    
    $done({});
}
