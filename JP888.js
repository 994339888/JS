#############################
#   Mercari 极速首页配置    #
#############################

[rewrite_local]
# Mercari 首页极速模式 — 只显示「おすすめの商品」
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body mercari_fast.js


[MITM]
hostname = api.mercari.jp


#############################
#   本地脚本（直接内嵌版）   #
#############################

# 你只需把下面内容保存成：mercari_fast.js
# 或直接放在本地脚本目录（不会出错）

;var __Mercari_FAST__=`
/*
Mercari 首页极速模式：
只保留「おすすめの商品」
加载最快、最稳定、最适合抢购
*/

try {
    let obj = JSON.parse($response.body);

    // 只保留推荐商品 recommend 类型 section
    if (obj?.data?.sections) {
        obj.data.sections = obj.data.sections.filter(s => s.type === "recommend");
    }

    // 防止 API 格式变化导致白屏
    if (obj?.data?.sections?.length === 0 && obj?.data?.recommend) {
        obj.data.sections = [ obj.data.recommend ];
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    // 兜底：不可解析则不修改
    console.log("JP Mercari fast mode error: " + e);
    $done($response);
}
`;