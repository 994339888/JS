/*
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
# Mercari 首页商品流接口（真正的数据）
^https?:\/\/api\.mercari\.jp\/store\/get_items url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP888.js

[MITM]
hostname = api.mercari.jp

*/

try {
    let obj = JSON.parse($response.body);

    // 真实首页数据在 obj.data（数组）
    if (obj?.data && Array.isArray(obj.data)) {

        // iPhone 关键词
        const keywords = [
            "iphone",
            "アイフォン",
            "apple",
            "アップル",
            "本体",
            "携帯",
            "スマホ",
            "ケース"
        ];

        // 过滤，只保留 iPhone 相关内容
        obj.data = obj.data.filter(item => {
            let title = (item?.name || "").toLowerCase();
            return keywords.some(k => title.includes(k.toLowerCase()));
        });

    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("JP Mercari iPhone filter error: " + e);
    $done($response);
}