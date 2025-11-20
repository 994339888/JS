/*
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
# Mercari 首页商品流接口（真正的数据）
^https?:\/\/api\.mercari\.jp\/store\/get_items(\?.*)?$ url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP888.js

[MITM]
hostname = api.mercari.jp

/*
  隐藏首页顶部（分类 / banner / 推荐标签）
*/

try {
    let obj = JSON.parse($response.body);

    if (obj?.data?.sections) {
        obj.data.sections = [];   // 清空顶部模块
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("Hide Home Error: " + e);
    $done($response);
}