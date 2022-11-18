// 一旦扩展安装后显示演示页面
chrome.runtime.onInstalled.addListener((_reason) => {
    chrome.tabs.create({
      url: 'demo/index.html'
    });
});

  