window.addEventListener('DOMContentLoaded', async () => {
    await fetch("./assets/data/articles.json").then(response => response.json()).then(data => {
        let article = data["articles"].find(article => (article.type == new URLSearchParams(window.location.search).get('title')));
        if (article != undefined) {
            document.title = article.title + '- 浮华のloc';
            document.getElementById('header').getElementsByTagName('a')[0].textContent = '浮华のloc : ' + article.title;
            document.getElementById('articleSection').innerHTML = `
                <h1>${article.title}</h1>
                <article class="article-content">
                    ${article["content"].join('\n')}
                </article>
            `;
            var prevArticle = document.getElementById('prevArticle');
            var nextArticle = document.getElementById('nextArticle');
            const currentIndex = data.articles.indexOf(article);
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
            const nextIndex = currentIndex < data.articles.length - 1 ? currentIndex + 1 : null;
            if (prevIndex != undefined) {
                prevArticle.href = `article.html?title=${data.articles[prevIndex].type}`;
                prevArticle.textContent += data.articles[prevIndex].title;
                prevArticle.style.display = 'block';
            }
            if (nextIndex != undefined) {
                nextArticle.href = `article.html?title=${data.articles[nextIndex].type}`;
                nextArticle.textContent += data.articles[nextIndex].title;
                nextArticle.style.display = 'block';
            }
        }
        else {
            document.title = '浮华のloc';
            document.getElementById('articleSection').innerHTML = `
                <h1>浮华のloc</h1>
                <article class="about-content">
                    <h2>关于</h2>
                    <p>浮华のloc<br>
                        一个纯HTML、CSS、JavaScript编写的个人博客网站<br>
                        分享个人的编程经验、生活感悟、学习心得等<br>
                        希望能给帮到大家<br>
                        欢迎大家常来访问<br>
                        有任何意见或建议，欢迎联系我<br>
                    </p>
                    <h2>参与写作</h2>
                    <p>如果您有好的文章想与大家分享，欢迎联系我的邮箱<br>
                        或者可以选择在GitHub上提交PR，审核通过后会发布到网站<br>
                        文章内容写在json文件中，格式如下：<br>
                        <pre style="white-space: pre-line;">
                        {
                        &emsp;&emsp;"title": "文章标题",
                        &emsp;&emsp;"description": 文章描述，尽量控制在30字左右",
                        &emsp;&emsp;"time": "0000-00-00",
                        &emsp;&emsp;"tags": [
                        &emsp;&emsp;&emsp;&emsp;"标签1",
                        &emsp;&emsp;&emsp;&emsp;"标签2"
                        &emsp;&emsp;],
                        &emsp;&emsp;"type": "文章内部标识符，请保持唯一性，必须纯英文，例如：article-example",
                        &emsp;&emsp;"content": [
                        &emsp;&emsp;&emsp;&emsp;"文章内容1",
                        &emsp;&emsp;&emsp;&emsp;"文章内容2",
                        &emsp;&emsp;&emsp;&emsp;"文章内容3"
                        &emsp;&emsp;&emsp;&emsp;]
                        &emsp;&emsp;}
                        }</pre><br>
                        其中content为文章内容，为HTML格式，如需换行撰写文章以便更易于阅读，请自行添加多组字符串元素<br>
                        对于文章内的标题请使用&lt;h2&gt;标签<br>
                        图片请使用&lt;img&gt;标签<br>
                        多行内容（如代码块）需要像文本一样展示缩进或换行的格式，请使用pre标签包裹<br>
                        显示代码块样式请用&lt;div class=\"code-block\"&gt;标签包裹<br>
                        段落标签&lg;p&gt;请不要使用&lt;article&gt;标签包裹<br>
                        除了pre标签外的其他标签内:<br>
                        &emsp;如需使用空格请输入'&'n'b's'p';'空一个ASCII字符如何英文单词和数字、'&'e'm's'p';'缩进，大约一个汉字的大小（去除所有单引号）<br>
                        &emsp;换行请使用&lt;br&gt;<br>
                        <strong>更多标签：如粗体等，请自行学习HTML语法，或者查看文章<a href="article.html?title=html-css-js-note">前端学习笔记</a></strong><br>

                    </p>
                    <h2>联系方式</h2>
                    <p>邮箱：sweellong@qq.com</p>
                    <p>GitHub Profile：https://github.com/SweelLong</p>
                    <p>B站：https://space.bilibili.com/481968939</p>
                </article>
            `;
        }
    });
    var colorfulTitle = document.getElementById('header');
    if (colorfulTitle) {
        colorfulTitle.addEventListener("mouseover", function () {
            colorfulTitle.style.transition = 'all 0.5s ease-out';
            colorfulTitle.style.left = `-${colorfulTitle.offsetWidth}px`;
            colorfulTitle.style.opacity = '0';

        });
        colorfulTitle.addEventListener("mouseout", function () {
            colorfulTitle.style.left = colorfulTitle.style.left || '0px';
            colorfulTitle.style.opacity = '1';
        });
    }
});