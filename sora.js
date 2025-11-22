const url = $request.url;

if (url.includes('sora.openai.com/video') && url.includes('watermark=true')) {
  let newUrl = url.replace('watermark=true', 'watermark=false');
  newUrl += '&inject=lama-inpaint';  // 注入 LaMA 修复模型
  $done({ url: newUrl });
} else {
  $done({});
}