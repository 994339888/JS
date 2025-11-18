// qgou.js — 测试脚本
let obj = JSON.parse($response.body);

$notify("Mercari 脚本已生效", "接口被触发", "返回数量：" + Object.keys(obj).length);

$done({ body: JSON.stringify(obj) });