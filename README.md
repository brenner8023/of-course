# of-course

> 基于 Vue3、TypeScript 实现的掘金一键三连谷歌插件（扩展）

技术栈：

- Vue3.x
- TypeScript
- Vite
- NaiveUI

## 介绍

manifest.json

```json
{
  "name": "of-course",
  "version": "0.1.0",
  "manifest_version": 2, // 配置文件的版本
  "description": "一键三连，下次一定",
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self';",
  "permissions": ["storage", "tabs", "http://*/", "https://*/"],
  "background": {
    "scripts": ["scripts/background.js"]
  },
  "browser_action": {},
  // 指定多个分辨率图标
  "icons": {
    "16": "icons/logo-16-disable.png",
    "32": "icons/logo-32-disable.png",
    "48": "icons/logo-48-disable.png",
    "128": "icons/logo-128-disable.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"], // 匹配需要注入的页面
      "js": ["scripts/content.js"],
      "run_at": "document_start",
      "all_frames": true
    }
  ],
  // 普通页面能够直接访问的插件资源列表
  "web_accessible_resources": ["scripts/inject-page.js", "index.html"]
}
```

## 参考

- [Chrome 插件（扩展）开发全攻略](https://github.com/sxei/chrome-plugin-demo)
