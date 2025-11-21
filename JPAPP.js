/*        
        ➪：JP APP

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JPAPP.js

[MITM]
hostname = api.mercari.jp
*/

(async function() {

  // ====== 授权检查 ======
  const auth_url = "https://raw.githubusercontent.com/994339888/JS/refs/heads/main/key.txt"; // 你控制的授权文件
  let auth = "0";

  try {
    auth = await new Promise((resolve) => {
      $httpClient.get(auth_url, (err, resp, data) => {
        if (err) return resolve("0");
        resolve(data.trim());
      });
    });
  } catch (e) {
    auth = "0";
  }

  // 只有 auth.txt 内容为 “1” 才允许脚本继续运行
  if (key !== "1") {
    console.log("❌ 授权关闭，脚本停止运行");
    $done({});
    return;
  }

  // ====== 原脚本逻辑 ======
  let body = $response.body;
  body = body.replace(/("result"\s*:\s*)[^"]*"/g, '$1""');
  $done({ body });

})();