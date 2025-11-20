/*        
        ➪：JP APP（首页顶部隐藏 + 首页商品流自动刷新）

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
 
# ② 自动刷新首页商品流（不跳、不闪、不滤）
^https?:\/\/api\.mercari\.jp\/store\/get_items(\?.*)?$ url script-response-body https://raw.githubusercontent.com/994339888/JS/main/0.js

[MITM]
hostname = api.mercari.jp
/*
  Mercari 首页自动刷新（保持商品完整）
  不删减、不过滤、不修改字段，只返回最新数据
*/

try {
    const data = JSON.parse($response.body);
    $done({ body: JSON.stringify(data) });
} catch (e) {
    console.log("Refresh ERROR → " + e);
    $done($response); // 安全回退
}