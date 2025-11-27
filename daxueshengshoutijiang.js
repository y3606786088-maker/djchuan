// 大学搜题酱VIP修改 - 修正版
const url = $request.url;

if (url.includes('/capi/user/userinfo')) {
    try {
        let obj = JSON.parse($response.body);
        console.log("原始响应: " + JSON.stringify(obj).substring(0, 200));
        
        if (obj && obj.data) {
            // 强制修改VIP字段
            obj.data.isVip = 1;
            obj.data.upGradeFlag = false;
            obj.data.points = 9999;
            obj.data.grade = 100;
            obj.data.gradeName = "毕业";
            
            console.log("修改后的响应: " + JSON.stringify(obj).substring(0, 200));
            $done({body: JSON.stringify(obj)});
        } else {
            console.log("data字段不存在");
            $done({});
        }
    } catch (e) {
        console.log("JSON解析错误: " + e);
        $done({});
    }
} else {
    $done({});
}
