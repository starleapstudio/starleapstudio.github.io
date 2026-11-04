# starleapstudio.github.io

四叶草壁纸引擎官方站点。

- 站点：https://starleapstudio.github.io
- 风格：浅色高对比、图文为主（参考同类动态壁纸官网信息密度）
- 品牌点缀：客户端紫青渐变（Logo / 主按钮）

## 本地预览

```bash
python3 -m http.server 8765
```

打开 http://127.0.0.1:8765/

## 结构

```text
index.html
css/main.css
js/main.js
assets/mark.svg
```

## 发布安装包（推荐）

**统一在本公开仓发版**：同一 Release 挂 Windows + macOS 安装包。

1. 在本仓创建 Release（如 `v0.1.0`）
2. 上传例如：
   - `Clover-Windows-x64.exe` / `.msi`
   - `Clover-macOS-arm64.dmg`（及 Intel 如需要）
3. 官网下载按钮已指向：
   `https://github.com/starleapstudio/starleapstudio.github.io/releases/latest`
4. 若要「一点即下文件」，在 `js/main.js` 的 `RELEASES.windows` / `RELEASES.mac` 写成具体 asset URL。

私有仓可用 CI（带 token）构建后把产物推送到本仓 Release，源码仍保持私有。

## 待接事项

- 替换为真实壁纸预览图 / 短视频
- 上传首个 Win / Mac Release 资源
- `/w/{id}` 落地页
