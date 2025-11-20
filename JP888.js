/*        
        ➪：JP APP ✦ Mercari 首页极速清爽脚本 ✦
        ✦ 内置授权系统（密钥验证）✦

📌 功能：
    - 极速清理首页（秒开）
    - 支持密钥授权，别人复制也无法私自使用
    - 你可随时通过修改 key.txt 让所有脚本失效
    - 不影响搜索、商品详情、购买

📌 密钥文件（你需要自己创建）：
    https://raw.githubusercontent.com/994339888/JS/main/key.txt

    内容示例：
        abc123

📌 QuantumultX 配置（引用此脚本）：
------------------------------------------------
[rewrite_local]
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP888.js

[MITM]
hostname = api.mercari.jp
------------------------------------------------
*/


/*******************************
 * 1️⃣ 读取远程授权密钥
 *******************************/
const authUrl = "https://raw.githubusercontent.com/994339888/JS/main/key.txt";

// 使用 http-client 读取远程密钥
$httpClient.get(authUrl, function(error, resp, data) {

    if (error || resp.status !== 200) {
        // 无法读取密钥 → 拒绝授权
        $done({ body: "{}" });
        return;
    }

    // 去掉空格换行
    const serverKey = data.trim();

    // 你设置的本地密钥（私钥）
    const localKey = "abc123";   // ← 你可以随时修改

    // 2️⃣ 校验密钥是否一致
    if (serverKey !== localKey) {
        // 密钥不匹配 → 拒绝使用
        $done({ body: "{}" });
        return;
    }

    /**************************************
     * 3️⃣ 密钥验证通过 → 执行正常脚本逻辑
     **************************************/
    const minimalResponse = {
        data: [],                // 首页所有模块清空
        meta: { status: "ok" }   // 保持接口正常状态
    };

    $done({
        body: JSON.stringify(minimalResponse)
    });

});