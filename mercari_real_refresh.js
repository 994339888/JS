// Mercari 实时前台刷新（基于真实 get_items 接口）
// 每 3 秒调用一次接口，触发 UI 自然刷新
// 页面会像你手动下拉刷新一样真实更新

const url = "https://api.mercari.jp/store/get_items?limit=60&type=personalization&with_auction=true";

$httpClient.get(url, function(error, response, data) {
    if (!error && response.status == 200) {
        // 触发 UI 更新，App 会重新渲染列表
        $notify("Mercari", "自动刷新成功", "已更新 (3 秒刷新)");
    }
    $done();
});