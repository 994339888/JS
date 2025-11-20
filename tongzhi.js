/*
        ➪：JP APP — 通知测试脚本

[rewrite_local]
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/tongzhi.js

[MITM]
hostname = api.mercari.jp
*/

let obj = JSON.parse($response.body);

$notify(
    "Mercari 脚本已生效",
    "接口被触发",
    "返回数量：" + Object.keys(obj).length
);

$done({ body: JSON.stringify(obj) });