// Mercari 关键词上新提醒（Task版）
// 关键词：iPhone
// 每 3 秒检查一次 get_items 接口
// 若出现新商品（标题包含关键词），立即通知，不重复提醒

const url = "https://api.mercari.jp/store/get_items?limit=60&type=personalization&with_auction=true";

// 你要监控的关键词（可多个）
const keywords = ["iphone", "iPhone", "IPHONE"];

// 用于存储已提醒过的商品ID，避免重复通知
let notified = $prefs.valueForKey("mercari_notified_ids") || "[]";
notified = JSON.parse(notified);

$task.fetch({ url: url }).then(resp => {
    if (resp.statusCode !== 200) {
        console.log("请求失败");
        $done();
        return;
    }
    
    const data = JSON.parse(resp.body);
    const items = data.data || [];

    let newNotified = false;

    for (let item of items) {
        const title = item.name || "";
        const id = item.id || "";

        // 检查关键词命中
        const hit = keywords.some(k => title.toLowerCase().includes(k.toLowerCase()));

        // 如果命中关键词 + 未提醒过
        if (hit && !notified.includes(id)) {
            $notify("📱 Mercari 上新（iPhone）", title, `价格：¥${item.price}`);
            notified.push(id);
            newNotified = true;
        }
    }

    // 有新提醒才保存
    if (newNotified) {
        $prefs.setValueForKey(JSON.stringify(notified), "mercari_notified_ids");
    }

    $done();
}).catch(err => {
    console.log("ERROR: " + err);
    $done();
});