/*******************************
 * Mercari 首页极速优化 + 授权系统
 *******************************/
const authUrl = "https://cdn.jsdelivr.net/gh/994339888/JS/key.txt";

$httpClient.get(authUrl, function(error, resp, data) {

    if (error || resp.status !== 200) {
        $done({ body: "{}" });
        return;
    }

    const serverKey = data.trim();
    const localKey = "abc123";

    if (serverKey !== localKey) {
        $done({ body: "{}" });
        return;
    }

    const minimalResponse = {
        data: [],
        meta: { status: "ok" }
    };

    $done({
        body: JSON.stringify(minimalResponse)
    });
});