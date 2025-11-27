// 大学搜题酱VIP修改 - 修正版
if ($request.url.includes('/capi/user/userinfov3')) {
    console.log("🎯 脚本开始执行，匹配到userinfov3接口");
    
    try {
        let obj = JSON.parse($response.body);
        console.log("完整响应体: " + JSON.stringify(obj));
        
        // 检查数据结构
        if (obj.data && typeof obj.data.isVip !== 'undefined') {
            console.log("原始isVip: " + obj.data.isVip);
            
            // 修改VIP状态
            obj.data.isVip = 1;
            obj.data.upGradeFlag = false;
            obj.data.points = 9999;
            obj.data.grade = 100;
            
            console.log("修改后isVip: " + obj.data.isVip);
        } else {
            console.log("⚠️ 未找到isVip字段，当前数据结构:");
            console.log("data字段: " + JSON.stringify(obj.data));
        }
        
        $done({body: JSON.stringify(obj)});
        
    } catch (e) {
        console.log("错误: " + e);
        $done({});
    }
} else {
    $done({});
}
