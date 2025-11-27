// 大学搜题酱VIP修改 - 深度调试版
if ($request.url.includes('/capi/user/userinfov3')) {
    console.log("🎯 深度调试脚本开始执行");
    
    try {
        let obj = JSON.parse($response.body);
        console.log("🔍 完整响应结构:");
        console.log(JSON.stringify(obj, null, 2));
        
        // 检查所有可能的VIP相关字段
        console.log("🔍 检查VIP相关字段:");
        
        // 检查根级别的字段
        for (let key in obj) {
            if (key.toLowerCase().includes('vip') || 
                key.toLowerCase().includes('grade') || 
                key === 'isVip') {
                console.log("根级别字段 " + key + ": " + JSON.stringify(obj[key]));
            }
        }
        
        // 检查data对象中的字段
        if (obj.data) {
            console.log("🔍 data对象结构:");
            for (let key in obj.data) {
                if (key.toLowerCase().includes('vip') || 
                    key.toLowerCase().includes('grade') || 
                    key === 'isVip') {
                    console.log("data." + key + ": " + JSON.stringify(obj.data[key]));
                }
            }
            
            // 尝试修改所有可能的VIP字段
            let modified = false;
            
            // 修改已知的VIP字段
            if (typeof obj.data.isVip !== 'undefined') {
                obj.data.isVip = 1;
                modified = true;
            }
            if (typeof obj.data.vipStatus !== 'undefined') {
                obj.data.vipStatus = 1;
                modified = true;
            }
            if (typeof obj.data.vip !== 'undefined') {
                obj.data.vip = 1;
                modified = true;
            }
            if (typeof obj.data.upGradeFlag !== 'undefined') {
                obj.data.upGradeFlag = false;
                modified = true;
            }
            if (typeof obj.data.points !== 'undefined') {
                obj.data.points = 9999;
                modified = true;
            }
            if (typeof obj.data.grade !== 'undefined') {
                obj.data.grade = 100;
                modified = true;
            }
            
            if (modified) {
                console.log("✅ 已修改VIP相关字段");
            } else {
                console.log("⚠️ 未找到任何VIP相关字段");
            }
        } else {
            console.log("❌ 响应中没有data字段");
        }
        
        $done({body: JSON.stringify(obj)});
        
    } catch (e) {
        console.log("❌ 错误: " + e);
        $done({});
    }
} else {
    $done({});
}
