/*
📦 Mercari 上新检测脚本（网页抓取版）
💡 支持：Quantumult X
💡 不需要 Cookie、不需要抓包

❗你只需要修改下面的 keyword 即可
*/

const keyword = "switch";  // ← 修改为你要监控的关键字
const url = `https://www.mercari.com/jp/search/?keyword=${encodeURIComponent(keyword)}`;

// 获取网页 HTML
$task.fetch({url: url}).then(resp => {
    const html = resp.body;

    // 匹配商品 ID
    const regex = /\/jp\/items\/([0-9a-f]+)/g;
    let ids = [];
    let m;
    while ((m = regex.exec(html)) !== null) {
        ids.push(m[1]);
    }

    if (ids.length === 0) {
        $done();
        return;
    }

    const key = "mercari_new_" + keyword;
    const old = JSON.parse($prefs.valueForKey(key) || "[]");

    // 找出新商品 ID
    const newIds = ids.filter(id => !old.includes(id));

    if (newIds.length > 0) {
        // 缓存新的 ID 列表
        $prefs.setValueForKey(JSON.stringify(ids), key);

        // 发送通知
        $notify(
            `📢 Mercari 上新：${keyword}`,
            "",
            `新商品：\n${newIds.join("\n")}`
        );
    }

    $done();
});