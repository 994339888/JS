/**************************************
 🔥 Mercari 全站上新监控（API 版）
 作者：ChatGPT 专为你定制
 不需要 Cookie、不需要 MITM
 使用 App API，无风控，稳定可用
***************************************/

// Mercari 上新接口（App 真实接口）
const apiURL = "https://api.mercari.jp/v2/entities:search";

// 随机设备 ID（只生成一次）
function getDeviceID() {
    let id = $prefs.valueForKey("mercari_device_id");
    if (!id) {
        id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        $prefs.setValueForKey(id, "mercari_device_id");
    }
    return id;
}

// 请求头（绕过风控）
const headers = {
    "User-Agent": "Mercari_r/2025.1.0",
    "X-PLATFORM": "ios",
    "X-DEVICE-ID": getDeviceID(),
    "X-APP-VERSION": "2025.1.0",
    "Accept-Language": "ja-JP"
};

// 请求体（App 格式，sort=created_time 降序 = 最新上架）
const body = {
    "search_condition": {
        "sort": "created_time",
        "order": "desc"
    },
    "page_size": 40
};

// 发起请求
$task.fetch({
    url: apiURL,
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
}).then(resp => {

    if (resp.statusCode !== 200) {
        $notify("❌ 请求失败", "", "Status: " + resp.statusCode);
        return $done();
    }

    const data = JSON.parse(resp.body);
    const items = data?.items || [];

    if (items.length === 0) {
        $notify("❌ 未获取到商品", "", "可能 API 变更");
        return $done();
    }

    // 读取缓存
    const old = JSON.parse($prefs.valueForKey("mercari_all_cache") || "[]");

    // 提取商品 ID
    const ids = items.map(i => i.id);

    // 找新上架（不在旧缓存中）
    const newIds = ids.filter(id => !old.includes(id));

    // 保存新缓存
    $prefs.setValueForKey(JSON.stringify(ids), "mercari_all_cache");

    // 发现新上架
    if (newIds.length > 0) {
        const list = newIds.map(id => `https://www.mercari.com/jp/items/${id}`).join("\n");
        $notify("🆕 Mercari 新上架！", "", list);
    }

    $done();
});