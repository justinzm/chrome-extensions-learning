## manifest.json配置项参数说明

扩展manifest向浏览器提供有关扩展的信息，例如最重要的文件和扩展可能使用的功能。当有新的manifest版本时，扩展平台功能会发生变化。

Manifest V3 专注于该愿景的三大支柱：隐私、安全和性能，同时保留和改进我们的能力和网络基础。

### manifest.json配置文件

```
{
  //chrome插件的版本
  "manifest_version": 3,

  //插件名称
  "name": "ChromeName",

  //插件版本号
  "version": "1.0.0",

  //插件描述，Plugin_Desc是多语言的key，chrome插件支持多语言配置，__MSG_xxx__
  "description": "__MSG_Plugin_Desc__",

  //默认语言(如果当前浏览器设置的语言不存在多语言配置文件，则默认中文)，Chrome插件的多语言只能根据当前浏览器设置的语言来设定，无法通过代码更改语言
  "default_locale": "zh_CN",

   //内容安全政策，V2的value是字符串，V3是对象
  "content_security_policy": {
    //原文：此政策涵盖您的扩展程序中的页面，包括 html 文件和服务人员；具体不是很明白，但是参数值得是self，即当前自己
    "extension_pages": "script-src 'self'; object-src 'self'",

	//原文：此政策涵盖您的扩展程序使用的任何[沙盒扩展程序页面]；具体不是很明白，但是参数值得是self，即当前自己
	"sandbox": "sandbox allow-scripts; script-src 'self'; object-src 'self'"
  },

   //key，发布插件后会给一个key，把那个key的值放这里
  "key": "xxx",

  //icon，浏览器扩展程序管理里面的图标、浏览器右侧插件图标点开的下拉菜单展示的已开启插件的图标、以及插件详情页的标签卡的那个小图标
  "icons": {
    "16": "static/img/logo-16.png",
    "19": "static/img/logo-19.png",
    "38": "static/img/logo-38.png",
    "48": "static/img/logo-48.png",
    "128": "static/img/logo-128.png"
  },

  //背景页，后台脚本引入，v2是scripts:[xxx,xxx]，可以引入多个js文件，v3是service_worker：'xxx'，只能引入一个js，v3版最大的改动应该就是这里了，扩展程序管理界面的插件的那个“背景页”也将变成“Service Worker”，改动之后background.js将和浏览器完全分离，即无法调用window和ducoment对象
  //可以看介绍：
  //1、//developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#background-service-workers；
  //2、//developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/

  "background": {
    "service_worker": "background.js"
  },

  //注入脚本，值是个数组对象，可以有多个对象
  "content_scripts": [
    //每个对象代表一个注入的配置
    {
	  //需要在指定页面注入的js脚本文件
      "js": [
        "xxx.js",
        "xxx.js",
      ],
	   //需要注入js脚本文件的指定页面
      "matches": [
        "https://*.csdn.net/*",
        "https://*.xxx.com/*"
      ],
       //不允许注入js脚本文件的指定页面
 	   "exclude_matches": ["https://*.xxx.com/*"],
	   //什么时候注入的js脚本，document_start=页面加载开始时，document_end=页面加载结束时
      "run_at": "document_end"
    }
  ],

  //API权限，需要使用某些API时需要设置该API权限才行
  "permissions": [
	  "contextMenus", //自定义创建右键菜单API
	  "tabs", //tab选项卡API
	  "storage", //缓存API
	  "webRequest", //监听浏览器请求API
	  ...
  ],

  //主机权限，在背景页backgroud.js里面或者popup页面走请求时，请求域名的白名单权限，如果没添加的则请求会失败
  "host_permissions": [
    "https://*.csdn.net/*",
    "https://*.xxx.com/*"
  ],

  //动作API，原文：在 Manifest V2 中，有两种不同的 API 来实现操作： `"browser_action"` 和 `"page_action"` . 
  //这些 API 在引入时扮演了不同的角色，但随着时间的推移它们变得多余，因此在 Manifest V3 中，我们将它们统一为单个 `"action"` API； 
  //配置上action:{}，可以是空对象，但是action这个配置得有，不然的话扩展程序管理界面的“Service Worker”将显示无效，
  //且无法点开“Service Worker”的开发者工具控制台以及点击插件图标时触发的这个方法会报错chrome.action.onClicked.addListener，

  "action": {

  },

  //通过网络访问的资源，v2是提供一个数组，v3得提供数组对象，每个对象可以映射到一组资源到一组 URL 或扩展 ID
  "web_accessible_resources": [{
  	//允许访问的资源路径，数组传多个参数
    "resources": ["*/img/xxx.png", "*/img/xxx2.png"],
	
	//允许访问资源的页面
	"matches": [
	  "https://*.csdn.net/*",
	  "https://*.xxx.com/*"
	]
  }]
}
```

#### action 

使用`chrome.action`API 控制 Google Chrome 工具栏中的扩展程序图标。必填选项。

为了使用`chrome.action`API，您需要指定 "manifest_version"`等于`3`或更高，并将`action 密钥包含在您的清单文件中。

```
{
  "name": "Action Extension",
  ...
  "action": {
    "default_icon": {              // 可选
      "16": "images/icon16.png",   // 可选
      "24": "images/icon24.png",   // 可选
      "32": "images/icon32.png"    // 可选
    },
    "default_title": "Click Me",   // 可选, 显示在工具提示
    "default_popup": "popup.html"  // 可选
  },
  ...
}
```



