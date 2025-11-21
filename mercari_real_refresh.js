// Mercari 首页过滤脚本：只显示 iPhone 商品
// 基于 /store/get_items 实时过滤

let body = $response.body;
let obj = JSON.parse(body);

// 关键词（你可以添加更多）
const keywords = ["iphone", "iPhone", "IPHONE"];

// 保留标题包含 iPhone 的商品
obj.data = obj.data.filter(item => {
    const title = item?.name || "";
    return keywords.some(k => title.toLowerCase().includes(k.toLowerCase()));
});

// 输出结果
$done({ body: JSON.stringify(obj) });