## 案例：“阅读时间“扩展

创建在页面上插入新元素的第一个扩展。

构建了一个扩展，它将预期的阅读时间添加到“新浪新闻”文档页面上。

### 构建扩展

首先，创建一个名为`reading-time`保存扩展文件的新目录。如果您愿意，可以从[GitHub](https://github.com/justinzm/chrome-extensions-learning/tree/main/02_reading_time)下载完整的源代码。

#### 第一步 添加有关扩展的信息

清单 JSON 文件是唯一需要的文件。它包含有关扩展的重要信息。**在项目的根目录**下创建一个`manifest.json`文件并添加以下代码：

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles",
}
```

这些键包含扩展的基本元数据。他们控制扩展在扩展页面上的显示方式，以及在发布时在 Chrome 网上应用店中的显示方式。要深入了解，请查看后面Manifest的课程。

**name**：是扩展的主要标识符，是必填字段（最多 45 个字符）；它显示在以下位置：安装对话框，扩展管理界面，Chrome 网上应用店；

**short_name**：是扩展名的简短版本。可选字段，如果未指定，`name`将使用它，尽管它可能会被截断。短名称通常用于没有足够空间显示全名的地方，如：应用启动器、新标签页；

**version**：自动更新系统比较版本以确定是否需要更新已安装的扩展。如果已发布的扩展具有比已安装的扩展更新的版本字符串，则扩展会自动更新。

**version_name** ：除了用于更新目的的版本字段之外，version_name 可以设置为描述性版本字符串，如果存在，将用于显示目的；如果没有 version_name，则 version 字段也将用于显示目的。如：`"version_name": "1.0 beta"`；

**description**： 描述扩展的纯文本字符串（不超过 132 个字符）；

**manifest_version**：一个整数，指定您的包所需的清单文件格式的版本。当前版本是 Manifest V3。目前也允许使用 Manifest V2，但将来会逐步淘汰；

#### 第二步 设置图标

那么，为什么我们需要图标？尽管图标在开发过程中是可选的，但如果您计划在 Chrome Web Store 上分发您的扩展程序，它们是必需的。它们也出现在扩展页面等其他地方。

> 128x128 在安装时和 Chrome 网上应用店中显示；
>
> 48x48  用于扩展程序管理页面 (chrome://extensions)；
>
> 32x32  Windows 计算机通常需要这种尺寸；
>
> 16x16  扩展页面上的图标和上下文菜单图标；

创建一个`images`文件夹并将图标放入其中。[您可以在GitHub](https://github.com/justinzm/chrome-extensions-learning/tree/main/02_reading_time)上下载图标。接下来，将突出显示的代码添加到清单中以声明图标：

```
{
  ...
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
  ...
}
```

建议使用 PNG 文件，但允许使用其他文件格式，SVG 文件除外。

#### 第三步 设置 content_scripts

扩展程序可以运行读取和修改页面内容的脚本。这些被称为**content_scripts**。他们在一个孤立的世界中（后面content_scripts课程会详细介绍），这意味着他们可以更改他们的 JavaScript 环境，而不会与他们的主机页面或其他扩展程序的内容脚本发生冲突。

将以下代码添加到`manifest.json`以注册名为`content.js`.

```
{
  ...
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://news.sina.com.cn/*",
        "https://sports.sina.com.cn/*"
      ]
    }
  ]
}
```

该`"matches"`字段可以有一个或多个匹配模式。这些允许浏览器识别将内容脚本注入哪些站点（本例中选择新浪新闻、新浪体育新闻）。匹配模式由三部分组成`<scheme>://<host><path>`。它们可以包含 ' `*`' 字符。

#### 第四步 编写插入阅读时间

内容脚本可以使用标准文档对象模型(DOM) 来读取和更改页面内容。扩展将首先检查页面是否包含该`<div class="article">`元素。然后，它将计算该元素中的所有单词并创建一个显示总阅读时间的段落。

`content.js`在名为的文件夹中创建一个名为的文件`scripts`并添加以下代码：
