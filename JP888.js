/*        
        ➪：JP APP ✦ Mercari 首页极速清爽脚本 ✦

📌 功能：
    - 首页清空（更快、更干净）
    - 不依赖密钥、不依赖授权、不出错
    - 适合需要稳定使用、简单使用的人
*/

const minimalResponse = {
    data: [],
    meta: { status: "ok" }
};

$done({
    body: JSON.stringify(minimalResponse)
});