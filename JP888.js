/*        
        ➪：JP APP

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents(\?.*)?$ url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP888.js

[MITM]
hostname = api.mercari.jp

*/

;eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(`

/*
    Mercari 首页顶部隐藏优化版
    ➤ 新接口结构适配
    ➤ 清空多余 sections
    ➤ 全程安全，不会白屏
    ➤ 加载更流畅、更轻量
*/

try {
    let body = JSON.parse($response.body);

    // 最新版本顶部模块全部在 data.sections
    if (body?.data?.sections) {
        body.data.sections = [];    // ⭐ 关键：直接清空顶部模块
    }

    // 某些情况下接口会多带 recommend → 不显示也要清理
    if (body?.data?.recommend) {
        delete body.data.recommend;
    }

    // 避免一些版本返回 summary / banners 造成 UI 卡顿
    if (body?.data?.banners) {
        body.data.banners = [];
    }

    // 返回优化后的内容
    $done({ body: JSON.stringify(body) });

} catch (err) {
    console.log("JP HideTop Optimized ERROR → " + err);
    $done($response);   // 安全回退
}

`,16,16,'||||||||||||||||'.split('|'),0,{}));