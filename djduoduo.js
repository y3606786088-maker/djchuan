// 文件名: dianyinduoduo_debug_enhanced.js
// 描述: 点音多多增强调试脚本

const url = $request.url;
const method = $request.method;
const status = $response.status;
const headers = $response.headers;

console.log("=== 点音多多请求调试 ===");
console.log("🔗 URL:", url);
console.log("📝 方法:", method);
console.log("📊 状态码:", status);

// 检查响应头
if (headers) {
    console.log("📋 响应头:", JSON.stringify(headers));
    
    // 检查内容类型
    const contentType = headers['Content-Type'] || headers['content-type'];
    if (contentType) {
        console.log("📄 内容类型:", contentType);
    }
    
    // 检查是否gzip压缩
    const contentEncoding = headers['Content-Encoding'] || headers['content-encoding'];
    if (contentEncoding) {
        console.log("🗜️ 内容编码:", contentEncoding);
    }
}

// 处理响应体
if ($response.body) {
    let body = $response.body;
    console.log("📦 原始响应体长度:", body.length);
    
    try {
        // 尝试直接作为文本处理（Loon通常会自动解压gzip）
        if (body.length > 0) {
            // 检查是否是HTML
            if (body.includes('<!DOCTYPE') || body.includes('<html') || body.includes('<script')) {
                console.log("🌐 响应类型: HTML页面");
                console.log("📄 HTML预览:", body.substring(0, 500).replace(/\n/g, ' '));
            }
            // 检查是否是JSON
            else if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
                console.log("📋 响应类型: JSON");
                try {
                    const jsonObj = JSON.parse(body);
                    console.log("📊 JSON键名:", Object.keys(jsonObj));
                    console.log("📄 JSON预览:", JSON.stringify(jsonObj).substring(0, 500));
                    
                    // 检查是否包含用户信息
                    const userKeys = ['user', 'vip', 'member', 'login', 'uid', 'vip_type', 'vip_expire'];
                    const hasUserInfo = JSON.stringify(jsonObj).toLowerCase().includes(userKeys.join('","').toLowerCase());
                    if (hasUserInfo) {
                        console.log("🎯 发现用户信息!");
                    }
                } catch (e) {
                    console.log("❌ JSON解析失败，可能是压缩数据");
                }
            }
            // 其他类型
            else {
                console.log("❓ 响应类型: 未知");
                console.log("📄 内容预览:", body.substring(0, 200));
            }
        }
    } catch (error) {
        console.log("❌ 响应体处理错误:", error);
    }
} else {
    console.log("📭 无响应体");
}

console.log("=== 调试结束 ===\n");
$done({});
