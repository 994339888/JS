/*        
        ➪：JP APP

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JPAPP.js

[MITM]
hostname = api.mercari.jp
/*        
        ➪：JP APP 授权版
*/

(async function() {

  // ====== 授权检查 ======
  const key_url = "https://raw.githubusercontent.com/994339888/JS/main/key"; 
  let key = "0";   // 授权变量叫 key，与远程文件一致

  try {
    key = await new Promise((resolve) => {
      $httpClient.get(key_url, (err, resp, data) => {
        if (err) return resolve("0");
        resolve(data.trim());
      });
    });
  } catch (e) {
    key = "0";
  }

  // key != 1 → 授权关闭
  if (key !== "1") {
    console.log("❌ 授权关闭，脚本终止");
    $done({});
    return;
  }

  // ====== 原脚本逻辑 ======
  let body = $response.body;
  body = body.replace(/("result"\s*:\s*)[^"]*"/g, '$1""');
  $done({ body });

})();