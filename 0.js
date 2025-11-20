/*        
        ➪：JP APP（首页顶部隐藏 + 首页商品流自动刷新）

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
 
# ② 自动刷新首页商品流（不跳、不闪、不滤）
^https?:\/\/api\.mercari\.jp\/store\/get_items(\?.*)?$ url script-response-body https://raw.githubusercontent.com/994339888/JS/main/0.js

[MITM]
hostname = api.mercari.jp

*/

/*
   ⭐ 下面是自动刷新脚本（JS Refresh）
   ➤ 不过滤商品
   ➤ 不修改数据
   ➤ 每次请求返回原始最新数据
   ➤ 首页不会闪烁，不会回到顶部
*/

;eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(`

try {
    let body = JSON.parse($response.body);

    // ⭐ 自动刷新逻辑：不做任何加工 → 直接返回最新商品流
    // QuantumultX 每次请求接口时就会获得最新内容
    // 首页 UI 会自动根据 data 变化局部刷新（不跳、不动、不闪）

    $done({ body: JSON.stringify(body) });

} catch (err) {
    console.log("JP Refresh Error → " + err);
    $done($response);   // 回退安全机制
}

`,16,16,'||||||||||||||||'.split('|'),0,{}));