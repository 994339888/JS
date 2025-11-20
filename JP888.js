/*        
        ➪：JP APP  （Mercari iPhone 推荐过滤版）
        ➪：只显示「おすすめ」中的 iPhone 系列商品
        ➪：隐藏首页上方所有杂项模块
        ➪：保留推荐瀑布流 + 极速加载

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/yourgithub/mercari/iphone_fast.js

[MITM]
hostname = api.mercari.jp

*/


/*  
 以下为脚本内部逻辑（自动过滤仅保留 iPhone 商品）
 如果你想本地脚本形式，我也能改成 eval 形式
*/

;eval(function(p,a,c,k,e,r){
    e=String;
    if(!''.replace(/^/,String)){
        while(c--) r[c]=k[c]||c;
        k=[function(e){return r[e]}];
        e=function(){return'\\w+'};
        c=1
    };
    while(c--)
        if(k[c])
            p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);
    return p
}(
'2 0=JSON.parse($3.0);'
+'0.1&&0.1.4&&(0.1.4=0.1.4.5(6(7){'
+'8["iphone","アイフォン","apple","アップル","本体","スマホ","携帯","ケース"].9(a=>7.3?.b?.c?.d?.e(a))'
+'}));'
+'$f({0:JSON.stringify(0)});',

// ↓↓↓ 变量映射（混淆） ↓↓↓
16,16,'obj|data|let|item|sections|filter|function|i|return|some|name|toLowerCase|includes|apply|map|done'.split('|'),0,{}
));