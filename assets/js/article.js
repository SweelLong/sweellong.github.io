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