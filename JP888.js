/*
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP.js

[MITM]
hostname = api.mercari.jp

*/

try {
    let obj = JSON.parse($response.body);

    // 只保留推荐商品
    if (obj?.data?.sections) {
        obj.data.sections = obj.data.sections.filter(s => s.type === "recommend");
    }

    // 如果推荐存在，则过滤内容（只保留 iPhone 商品）
    if (obj?.data?.sections?.length > 0) {
        let sec = obj.data.sections[0];

        const keywords = [
            "iphone",
            "アイフォン",
            "apple",
            "アップル",
            "本体",
            "スマホ",
            "携帯",
            "ケース"
        ];

        if (sec?.data?.items) {
            sec.data.items = sec.data.items.filter(item => {
                let t = (item?.name || "").toLowerCase();
                return keywords.some(k => t.includes(k.toLowerCase()));
            });
        }
    }

    // fallback
    if (obj?.data?.sections?.length === 0 && obj?.data?.recommend) {
        obj.data.sections = [ obj.data.recommend ];
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("JP Mercari iPhone fast mode error: " + e);
    $done($response);
}