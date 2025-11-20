/*        
        ➪：JP APP ✦ Mercari 首页极速清爽脚本 ✦

𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹

📌 本脚本用途：
    - 让 Mercari 首页“秒开”
    - 清除所有首页模块（推荐、广告、最近浏览等）
    - 不影响搜索、商品详情、购买等功能

📌 QuantumultX 配置（这是你实际要使用的）：
------------------------------------------------
[rewrite_local]
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JP888.js

[MITM]
hostname = api.mercari.jp
------------------------------------------------

📝 说明：
   - MITM 必须开启，否则无法修改 HTTPS 流量
   - 本脚本为完整文件，可直接作为远程资源引用
   - 你只要把它上传到 GitHub 的 JS 仓库即可
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
*/


/****************************************************
 * ✦ Mercari 首页极速优化脚本（可读+可维护版） ✦
 *
 * 原理：
 *   Mercari 首页接口返回大量 section 数据（推荐、广告等）。
 *   为达到最快速度，我们不再处理每个模块，
 *   而是直接返回“最小合法结构”：
 *
 *      { data: [], meta: { status: "ok" } }
 *
 *   APP 会认为首页正常加载，但无内容可显示 → 立即完成加载。
 ****************************************************/

// 定义最轻量，用于让首页秒开的结构
const minimalResponse = {
    data: [],                 // 清空首页所有区块
    meta: { status: "ok" }    // 保持正常状态，APP 不会报错
};

// 输出给 QuantumultX
$done({
    body: JSON.stringify(minimalResponse)
});