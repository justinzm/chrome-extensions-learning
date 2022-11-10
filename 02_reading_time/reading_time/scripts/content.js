$(function(){
    // 开始写 jQuery 代码...
    // 找到正文
    const article = $(".article").text();

    // 提取汉字
    const reg = /[\u4e00-\u9fa5]/g;
    const articles = article.match(reg);
    context = articles.join("");

    // 获取字数及计算阅读时间
    const context_num = context.length;
    const readingTime = Math.round(context_num / 200);
    
    const con = "<p>⏱️ " + readingTime + " 分钟阅读完</p>";
    
    // 加载到新闻标题后
    $("h1.main-title").after(con);
});