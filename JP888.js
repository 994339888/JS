/*
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP.js

[MITM]
hostname = api.mercari.jp

*/

try {
    let obj = JSON.parse($response.body);

    // 最高速方式：直接重建内容，只保留推荐
    if (obj?.data?.sections) {
        obj.data.sections = obj.data.sections.filter(s => s.type === "recommend");
    }

    // 如果首页数据结构不同，也自动 fallback 到推荐部分
    if (obj?.data?.sections?.length === 0 && obj?.data?.recommend) {
        obj.data.sections = [ obj.data.recommend ];
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    // 安全处理，不会卡住
    console.log("JP Mercari fast mode error: " + e);
    $done($response);
}