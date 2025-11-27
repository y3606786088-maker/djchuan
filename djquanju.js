// 文件名: dianyinduoduo_global_vip.js
// 描述: 点音多多全局VIP状态修改

const url = $request.url;
console.log("🌐 处理全局VIP状态:", url);

if ($response.body && $response.body.length > 0) {
    let body = $response.body;
    let modified = false;
    
    // 处理JSON格式的用户信息
    if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
        try {
            let jsonData = JSON.parse(body);
            let originalJson = JSON.stringify(jsonData);
            
            // 递归修改用户VIP状态
            function modifyVIPStatus(obj) {
                if (typeof obj !== 'object' || obj === null) return;
                
                for (let key in obj) {
                    const lowerKey = key.toLowerCase();
                    
                    // 修改VIP类型
                    if (lowerKey.includes('vip_type') || lowerKey.includes('viptype')) {
                        obj[key] = 2; // SVIP
                        console.log(`✅ 修改 ${key}: 2`);
                        modified = true;
                    }
                    // 修改VIP过期时间
                    else if (lowerKey.includes('vip_expire') || lowerKey.includes('vip_expire_time') || 
                             lowerKey.includes('expire_time') || lowerKey.includes('expire')) {
                        obj[key] = "2030-12-31 23:59:59";
                        console.log(`✅ 修改 ${key}: 2030-12-31 23:59:59`);
                        modified = true;
                    }
                    // 修改是否VIP
                    else if (lowerKey.includes('is_vip') || lowerKey.includes('isvip') || 
                             lowerKey.includes('vip_status')) {
                        obj[key] = true;
                        console.log(`✅ 修改 ${key}: true`);
                        modified = true;
                    }
                    // 修改用户ID
                    else if (lowerKey.includes('uid') || lowerKey.includes('user_id')) {
                        obj[key] = "12412462";
                        console.log(`✅ 修改 ${key}: 12412462`);
                        modified = true;
                    }
                    // 修改用户名
                    else if (lowerKey.includes('nickname') || lowerKey.includes('user_name') || 
                             lowerKey.includes('username')) {
                        obj[key] = "VIP尊享用户";
                        console.log(`✅ 修改 ${key}: VIP尊享用户`);
                        modified = true;
                    }
                    // 递归处理嵌套对象
                    else if (typeof obj[key] === 'object') {
                        modifyVIPStatus(obj[key]);
                    }
                }
            }
            
            modifyVIPStatus(jsonData);
            
            if (modified) {
                body = JSON.stringify(jsonData);
                console.log("🎉 全局VIP状态修改完成");
            } else {
                console.log("ℹ️ 未找到可修改的用户状态字段");
            }
            
        } catch (e) {
            console.log("❌ JSON处理失败:", e);
        }
    }
    
    // 处理HTML页面中的用户状态
    else if (body.includes('<!DOCTYPE') || body.includes('<html') || body.includes('<script')) {
        console.log("🌐 处理HTML页面用户状态");
        
        // 修改常见的用户状态变量
        body = body.replace(/"vip_type":\s*\d+/g, '"vip_type": 2');
        body = body.replace(/"is_vip":\s*false/g, '"is_vip": true');
        body = body.replace(/"vip_status":\s*\d+/g, '"vip_status": 2');
        body = body.replace(/"vip_expire":\s*"[^"]*"/g, '"vip_expire": "2030-12-31 23:59:59"');
        
        modified = true;
        console.log("✅ HTML页面VIP状态修改完成");
    }
}

$done({});
