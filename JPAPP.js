/*        
        ➪：JP APP

[rewrite_local] 
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body https://raw.githubusercontent.com/994339888/JS/main/JPAPP.js

[MITM]
hostname = api.mercari.jp

  

  // ====== 原脚本逻辑 ======
  let body = $response.body;
  body = body.replace(/("result"\s*:\s*)[^"]*"/g, '$1""');
  $done({ body });

})();