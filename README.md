# starleapstudio.github.io

四叶草壁纸引擎（Clover Wallpaper Engine）官方站点。

站点地址：https://starleapstudio.github.io

视觉与文案对齐 `clover-wallpaper-engine/client/docs/design/DESIGN_SPEC.md` 及客户端规划文档（发现 / 已安装 / 创作坊、CloverScene、`.cwp` 等）。

## 本地预览

```bash
python3 -m http.server 8080
```

浏览器打开 http://localhost:8080 。

## 结构

```text
index.html      # 官网首页
css/main.css    # 设计 Token（深色主题 / 品牌渐变）
js/main.js      # 动效、类型预览、平台下载偏好
assets/mark.svg # 四叶草 Logo（与客户端一致）
```

## 待接事项

- 替换 Windows / macOS 安装包真实下载地址（Releases 或 OSS）
- 用真实壁纸视频 / Web 预览器替换 canvas 占位预览
- 增加 `/w/{id}` 壁纸落地页，对接 backend 与客户端 URL Scheme
