##  Chrome 扩展开发的基础知识

### 你好,扩展

我们将创建一个“Hello, Extensions”示例，在本地加载扩展。

![你好扩展 弹出窗口](.\images\0101.png)

首先创建一个新目录来存储扩展文件。如果您愿意，可以从GitHub下载完整的源代码。

接下来，在此目录中创建一个名为的新文件`manifest.json`并添加以下代码：

```
{
  "manifest_version": 3,
  "name": "Hello Extensions",
  "description": "Base Level Extension",
  "version": "1.0",
  "action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  }
}
```

这个 JSON 对象描述了扩展的功能和配置。例如，该`"action"`键声明 Chrome 应使用的图像作为操作的图标，以及在单击操作时在弹出窗口中显示的 HTML 页面。

![0102](.\images\0102.png)

将到您的目录，并确保更改其名称以匹配`"default_icon"`密钥中的内容。

对于弹出窗口，创建一个名为 的文件`hello.html`，并添加以下代码：

```
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
    </head>
    <body>
        <h1>Hello Extensions</h1>
        <div>你好 扩展</div>
    </body>
</html>
```

注意：显示中文需要添加 "<meta http-equiv="content-type" content="text/html;charset=utf-8">" 避免出现乱码。

### 加载已解压的扩展程序

在开发者模式下加载一个解压的扩展：

1. 通过输入`chrome://extensions`新选项卡进入扩展页面。（根据设计`chrome://`，URL 不可链接。）
   - 或者，单击扩展菜单拼图按钮，然后选择菜单底部的**管理扩展。**
   - 或者，单击 Chrome 菜单，将鼠标悬停在**更多工具上，**然后选择**扩展程序**。
2. 通过单击开发人员模式旁边的切换开关启用开发**人员模式**。
3. 单击**加载已解压的扩展程序**按钮并选择扩展目录。

![](.\images\0103.png)

扩展已成功安装。因为清单中没有包含扩展图标，所以将为扩展创建一个通用图标。

### 重新加载扩展

让我们回到代码，把扩展名改成“Hello Extensions of the world！” 在清单中。

```json
{
  "manifest_version": 3,
  "name": "Hello Extensions of the world!",
  ...
}
```

保存文件后，要在浏览器中查看此更改，您还必须刷新扩展。转到扩展页面并单击**开/关**切换旁边的刷新图标：

![](.\images\0104.png)

### 查询控制台日志和错误

#### 控制台日志

在开发过程中，您可以通过访问浏览器控制台日志来调试代码。在这种情况下，我们将找到弹出窗口的日志。首先将脚本标签添加到`hello.html`.

```html
<html>
  <body>
    <h1>Hello Extensions</h1>
    <script src="popup.js"></script>
  </body>
</html>
```

创建一个`popup.js`文件并添加以下代码：

```js
console.log("This is a popup!")
```

要查看控制台中记录的此消息：

1. 刷新扩展。

2. 打开弹出窗口。

3. 右键单击弹出窗口。

4. 选择**检查**。

   ![检查弹出窗口](.\images\0105.png)

   5.在DevTools中，导航到**控制台**面板。

   ![DevTools 代码面板](.\images\0106.png)

#### 错误日志

现在让我们打破扩展。我们可以通过删除结束引号来做到这一点`popup.js`：

```js
console.log("This is a popup!) // ❌ broken code
```

转到扩展页面并打开弹出窗口。将出现一个**错误**按钮。

![带有错误按钮的扩展页面](.\images\0107.png)

### 构建扩展项目

有很多方法可以构建扩展项目；但是，您必须将 manifest.json 文件放在扩展的**根目录**中。下面是一个结构示例：

![扩展文件夹的内容：manifest.json、background.js、scripts 文件夹、popup 文件夹和 images 文件夹。](.\images\0108.png)
