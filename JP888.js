#############################
#   Mercari 极速首页配置    #
#############################

[rewrite_local]
# Mercari 首页极速模式 — 只显示「おすすめの商品」
^https?:\/\/api\.mercari\.jp\/services\/home\/v2\/homefeed-contents url script-response-body mercari_fast.js


[MITM]
hostn