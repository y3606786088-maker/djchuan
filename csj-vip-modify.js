// Loon VIP修改脚本 - 增强版
// 名称: 传啥机VIP高级解锁
// 作者: YourName
// 描述: 完整修改用户VIP状态、到期时间及权限信息
// 更新时间: 2024-01-01

(function() {
    'use strict';
    
    const requestUrl = $request.url;
    let responseBody = $response.body;
    
    // 只处理目标API
    if (!requestUrl.includes("/api/User/Info")) {
        $done({body: responseBody});
        return;
    }
    
    try {
        let jsonData = JSON.parse(responseBody);
        
        // 检查数据结构
        if (!jsonData.result) {
            console.log("响应数据格式不正确");
            $done({body: responseBody});
            return;
        }
        
        const userInfo = jsonData.result;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        
        // VIP配置选项
        const vipConfig = {
            isVip: true,                    // 开启VIP
            vipType: 3,                     // VIP类型: 3=超级VIP
            duration: 365,                  // VIP时长(天)
            nickname: "至尊VIP会员",        // 自定义昵称
            enhanceStats: true              // 增强统计数据
        };
        
        // ========== 修改VIP核心信息 ==========
        userInfo.isvip = vipConfig.isVip;
        userInfo.viptype = vipConfig.vipType;
        userInfo.hasvipcode = true;
        
        // 计算VIP到期时间
        userInfo.expiretime = currentTimestamp + (vipConfig.duration * 24 * 60 * 60);
        
        // ========== 修改用户基本信息 ==========
        if (vipConfig.nickname) {
            userInfo.nickname = vipConfig.nickname;
        }
        
        // ========== 增强用户统计数据 ==========
        if (vipConfig.enhanceStats) {
            userInfo.fanscount = 1888;              // 粉丝数
            userInfo.focuscount = 666;              // 关注数
            userInfo.visitors = 2999;               // 访客数
            userInfo.duration = 88888;              // 总使用时长
            userInfo.todayduration = 2880;          // 今日使用时长(48分钟)
            userInfo.sheetcount = 99;               // 歌单数量
        }
        
        // ========== 修改会员等级标识 ==========
        userInfo.rq = 999;                          // 人气值
        userInfo.sortorder = 1;                     // 排序权重
        
        // ========== 可选：修改其他字段 ==========
        userInfo.avatar = "https://example.com/vip-avatar.png";  // VIP头像
        userInfo.banner = "https://example.com/vip-banner.jpg";  // VIP横幅
        userInfo.location = "VIP专属区域";           // 地理位置
        userInfo.age = "相伴 : 永久会员";            // 会员时长显示
        
        console.log("🎉 VIP信息修改完成");
        console.log("📱 用户ID: " + userInfo.id);
        console.log("👑 VIP类型: " + getVipTypeText(userInfo.viptype));
        console.log("⏰ 到期时间: " + formatDate(userInfo.expiretime));
        console.log("📊 粉丝数: " + userInfo.fanscount);
        
        // 重新序列化JSON
        responseBody = JSON.stringify(jsonData);
        
    } catch (error) {
        console.log("❌ 脚本执行错误: " + error);
    }
    
    $done({body: responseBody});
})();

// ========== 工具函数 ==========

/**
 * 获取VIP类型描述
 */
function getVipTypeText(viptype) {
    const typeMap = {
        0: "非VIP",
        1: "普通VIP", 
        2: "高级VIP",
        3: "超级VIP"
    };
    return typeMap[viptype] || "未知类型";
}

/**
 * 格式化时间戳
 */
function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
