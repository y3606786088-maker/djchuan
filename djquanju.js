// 文件名: dianyinduoduo_super_vip.js
// 描述: 点音多多超级VIP修改（扩展域名）

const url = $request.url;
const host = $request.host;

console.log("🚀 超级VIP修改 - 主机:", host);

// 目标域名列表
const targetHosts = [
    'dianyinduoduo.com',
    'ctobsnssdk.com',
    'byteoversea.com',
    'bytedance.com',
    'snssdk.com'
];

const isTargetHost = targetHosts.some(target => host.includes(target));

if (isTargetHost && $response.body) {
    let body = $response.body;
    let modified = false;
    
    console.log("🎯 处理目标域名:", host);
    
    // 检查是否包含用户信息
    const hasUserInfo = body.includes('vip_type') || body.includes('is_vip') || 
                       body.includes('user_info') || body.includes('uid') ||
                       body.includes('login_status');
    
    if (hasUserInfo) {
        console.log("✅ 发现用户信息，开始修改...");
        
        // 方法1: 处理JSON响应
        if ((body.trim().startsWith('{') || body.trim().startsWith('[')) && body.includes('{')) {
            try {
                let jsonData = JSON.parse(body);
                console.log("📊 JSON结构:", Object.keys(jsonData));
                
                // 递归修改VIP状态
                function superModifyVIP(obj, path = '') {
                    if (typeof obj !== 'object' || obj === null) return;
                    
                    for (let key in obj) {
                        const currentPath = path ? `${path}.${key}` : key;
                        const lowerKey = key.toLowerCase();
                        
                        // VIP状态修改
                        if (lowerKey.includes('vip_type') || lowerKey.includes('viptype')) {
                            obj[key] = 2;
                            console.log(`✅ 修改 ${currentPath}: 2`);
                            modified = true;
                        }
                        else if (lowerKey.includes('vip_status')) {
                            obj[key] = 2;
                            console.log(`✅ 修改 ${currentPath}: 2`);
                            modified = true;
                        }
                        else if (lowerKey.includes('is_vip') || lowerKey.includes('isvip')) {
                            obj[key] = true;
                            console.log(`✅ 修改 ${currentPath}: true`);
                            modified = true;
                        }
                        else if (lowerKey.includes('vip_expire') || lowerKey.includes('expire_time')) {
                            obj[key] = "2030-12-31 23:59:59";
                            console.log(`✅ 修改 ${currentPath}: 2030-12-31 23:59:59`);
                            modified = true;
                        }
                        else if (lowerKey.includes('uid') || lowerKey.includes('user_id')) {
                            obj[key] = "12412462";
                            console.log(`✅ 修改 ${currentPath}: 12412462`);
                            modified = true;
                        }
                        else if (lowerKey.includes('nickname') || lowerKey.includes('user_name')) {
                            obj[key] = "VIP尊享用户";
                            console.log(`✅ 修改 ${currentPath}: VIP尊享用户`);
                            modified = true;
                        }
                        else if (lowerKey.includes('is_login') || lowerKey.includes('logged_in')) {
                            obj[key] = true;
                            console.log(`✅ 修改 ${currentPath}: true`);
                            modified = true;
                        }
                        // 递归处理嵌套对象
                        else if (typeof obj[key] === 'object') {
                            superModifyVIP(obj[key], currentPath);
                        }
                    }
                }
                
                superModifyVIP(jsonData);
                
                if (modified) {
                    body = JSON.stringify(jsonData);
                    console.log("🎉 JSON响应修改完成");
                }
                
            } catch (e) {
                console.log("❌ JSON解析失败，尝试字符串替换");
            }
        }
        
        // 方法2: 字符串替换
        if (!modified) {
            console.log("🔄 尝试字符串替换");
            
            const replacements = [
                [/"vip_type":\s*\d+/g, '"vip_type": 2'],
                [/"vip_status":\s*\d+/g, '"vip_status": 2'],
                [/"is_vip":\s*false/g, '"is_vip": true'],
                [/"is_vip":\s*0/g, '"is_vip": 1'],
                [/"vip_expire":\s*"[^"]*"/g, '"vip_expire": "2030-12-31 23:59:59"'],
                [/"expire_time":\s*"[^"]*"/g, '"expire_time": "2030-12-31 23:59:59"'],
                [/"uid":\s*"\d+"/g, '"uid": "12412462"'],
                [/"user_id":\s*"\d+"/g, '"user_id": "12412462"'],
                [/"nickname":\s*"[^"]*"/g, '"nickname": "VIP尊享用户"'],
                [/"is_login":\s*false/g, '"is_login": true']
            ];
            
            replacements.forEach(([pattern, replacement]) => {
                if (body.match(pattern)) {
                    body = body.replace(pattern, replacement);
                    modified = true;
                    console.log(`✅ 字符串替换: ${pattern}`);
                }
            });
        }
        
        if (modified) {
            console.log("🎊 超级VIP修改完成");
        } else {
            console.log("⚠️ 未找到可修改字段");
        }
    } else {
        console.log("⏭️ 跳过（不包含用户信息）");
    }
}

$done({});
