/*
  Mercari 首页自动刷新（保持商品完整）
*/

try {
    const data = JSON.parse($response.body);
    $done({ body: JSON.stringify(data) });
} catch (e) {
    console.log("Refresh ERROR → " + e);
    $done($response);
}