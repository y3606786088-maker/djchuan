// 文件名: dianyinduoduo_extended_debug.js
// 描述: 点音多多扩展域名调试

const url = $request.url;
const host = $request.host;

console.log("🔍 扩展调试 - 主机:", host);
console.log("🔗 URL:", url);

if ($response.body) {
    let body = $response.body;
    console.log("📦 响应体长度:", body.length);
    
    // 检查所有可能包含用户信息的域名
    const targetHosts = [
        'dianyinduoduo.com',
        'ctobsnssdk.com',
        'byteoversea.com',
        'bytedance.com',
        'snssdk.com'
    ];
    
    const isTargetHost = targetHosts.some(target => host.includes(target));
    
    if (isTargetHost) {
        console.log("🎯 目标域名:", host);
        
        // 用户信息关键词
        const userKeywords = [
            'vip_type', 'vip_expire', 'is_vip', 'vip_status', 
            'user_info', 'member_info', 'user_status', 'login_status',
            'uid', 'user_id', 'nickname', 'avatar', 'is_login'
        ];
        
        let foundKeywords = [];
        userKeywords.forEach(keyword => {
            if (body.includes(keyword)) {
                foundKeywords.push(keyword);
            }
        });
        
        if (foundKeywords.length > 0) {
            console.log("✅ 发现用户信息关键词:", foundKeywords.join(', '));
            console.log("📄 响应预览:", body.substring(0, 500));
            
            // 如果是JSON，解析结构
            if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
                try {
                    const jsonData = JSON.parse(body);
                    console.log("📊 JSON根级键名:", Object.keys(jsonData));
                } catch (e) {
                    console.log("❌ JSON解析失败");
                }
            }
        } else {
            console.log("❌ 未找到用户信息关键词");
        }
    }
}

$done({});
