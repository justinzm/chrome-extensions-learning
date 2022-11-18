## manifest 配置项参数说明

扩展manifest向浏览器提供有关扩展的信息，例如最重要的文件和扩展可能使用的功能。当有新的manifest版本时，扩展平台功能会发生变化。

Manifest V3 专注于该愿景的三大支柱：隐私、安全和性能，同时保留和改进我们的能力和网络基础。

### 配置

chrome**插件的版本**
```
"manifest_version": 3,
```

插件**名称**

```
"name": "ChromeName",
```

插件**版本号**
 ```
 "version": "1.0.0",
 ```

插件**描述**, 132个字符以内
  ```
  "description": "插件描述内容",
  ```

**默认语言**(如果当前浏览器设置的语言不存在多语言配置文件，则默认中文)，Chrome插件的多语言只能根据当前浏览器设置的语言来设定，无法通过代码更改语言

 ```
 "default_locale": "zh_CN",
 ```

 **key**，发布插件后会给一个key，把那个key的值放这里，通常不需要使用此值。
  ```
  "key": "xxx",
  ```

icon，浏览器扩展程序管理里面的**图标**、浏览器右侧插件图标点开的下拉菜单展示的已开启插件的图标、以及插件详情页的标签卡的那个小图标

```
"icons": {
    "16": "static/img/logo-16.png",
    "19": "static/img/logo-19.png",
    "38": "static/img/logo-38.png",
    "48": "static/img/logo-48.png",
    "128": "static/img/logo-128.png"
  },
```

内容**安全政策**，V2的value是字符串，V3是对象

**`extension_pages`**：此政策涵盖您的扩展程序中的页面，包括 html 文件和service workers。

**`sandbox`**：此政策涵盖您的扩展程序使用的任何沙盒扩展程序页面。

`script-src,` `object-src`和`worker-src`指令只能具有以下值：

- `self`
- `none`
- 任何 localhost 源、（`http://localhost`、`http://127.0.0.1`或这些域上的任何端口）

```
"content_security_policy": {
    //原文：此政策涵盖您的扩展程序中的页面，包括 html 文件和服务人员；具体不是很明白，但是参数值得是self，即当前自己
    "extension_pages": "script-src 'self'; object-src 'self'",

	//原文：此政策涵盖您的扩展程序使用的任何[沙盒扩展程序页面]；具体不是很明白，但是参数值得是self，即当前自己
	"sandbox": "sandbox allow-scripts; script-src 'self'; object-src 'self'"
},
```

**常驻后台脚本**，后台脚本引入，v2是scripts:[xxx,xxx]，可以引入多个js文件，v3是service_worker：'xxx'，只能引入一个js，v3版最大的改动应该就是这里了，扩展程序管理界面的插件的那个“背景页”也将变成“Service Worker”，改动之后background.js将和浏览器完全分离，即无法调用window和ducoment对象。后面课程将详细进行介绍和演示。

“**Service Worker** 是您的浏览器在后台运行的脚本，与网页分开，为不需要网页或用户交互的功能打开了大门。” 这项技术可以实现类似原生的体验，例如推送通知、丰富的离线支持、后台同步和开放网络上的“添加到主屏幕”。

```
"background": {
    "service_worker": "background.js"
},
```

注入**内容脚本**，值是个数组对象，可以有多个对象；

内容脚本是在网页上下文中运行的文件。通过使用标准文档对象模型(DOM)，他们能够读取浏览器访问的网页的详细信息，对其进行更改，并将信息传递给其父扩展。

- **js**：字符串数组；*可选的。*要注入匹配页面的 JavaScript 文件列表。这些是按照它们在这个数组中出现的顺序注入的。
- **css**：字符串数组；*可选的。*要注入匹配页面的 CSS 文件列表。在为页面构建或显示任何 DOM 之前，它们按照它们在此数组中出现的顺序被注入。
- **matches**：字符串数组	必需的。指定此内容脚本将被注入到哪些页面。有关这些字符串的语法的更多详细信息
- **match_about_blank**：布尔值	可选的。脚本是否应该注入about:blank父框架或开启框架与matches. 默认为假
- **exclude_matches**：	字符串数组	可选的。排除此内容脚本将被注入的页面。有关这些字符串的语法的更多详细信息
- **include_globs**：	字符串数组	可选的。之后应用matches以仅包含那些也匹配此 glob 的 URL。
- **exclude_globs**：	字符串数组	可选的。之后应用matches以排除与此 glob 匹配的 URL。

```
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
```

**API权限**，需要使用某些API时需要设置该API权限才行

```
"permissions": [
	  "contextMenus", //自定义创建右键菜单API
	  "tabs", //tab选项卡API
	  "storage", //缓存API
	  "webRequest", //监听浏览器请求API
	  ...
  ],
```

**action**: 控制 Google Chrome 工具栏中的扩展程序图标。必填选项。

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

**web_accessible_resources** 通过网络**访问的资源**，v2是提供一个数组，v3得提供数组对象，每个对象可以映射到一组资源到一组 URL 或扩展 ID

```
  "web_accessible_resources": [{
  	//允许访问的资源路径，数组传多个参数
    "resources": ["*/img/xxx.png", "*/img/xxx2.png"],
	
	//允许访问资源的页面
	"matches": [
	  "https://*.csdn.net/*",
	  "https://*.xxx.com/*"
	]
  }]
```

### manifest.json

```
{
  //chrome插件的版本
  "manifest_version": 3,

  //插件名称
  "name": "ChromeName",

  //插件版本号
  "version": "1.0.0",

  //插件描述
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





