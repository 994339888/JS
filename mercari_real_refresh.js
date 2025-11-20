// Mercari 实时前台刷新（Task 版 - 使用 $task.fetch）
// 每 3 秒调用一次 get_items 接口，触发 UI 自动刷新

const url = "https://api.mercari.jp/store/get_items?limit=60&type=personalization&with_auction=true";

$task.fetch({ url: url }).then(response => {
    if (response.statusCode === 200) {
        // 通知可开可不开，不影响实际刷新
        console.log("Mercari 已刷新：" + new Date().toLocaleTimeString());
        $notify("Mercari", "已刷新", "3秒刷新成功");
    }
    $done();
}).catch(err => {
    console.log("刷新失败：" + err);
    $done();
});
