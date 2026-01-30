function generateTableOfContents(containerSelector = "#toc-container", contentSelector = ".page-container", levels = [1, 2, 3, 4, 5, 6]) {
    let toggleBtn = document.getElementById("toc-toggle");
    if (!toggleBtn) {
        toggleBtn = document.createElement("button");
        toggleBtn.id = "toc-toggle";
        toggleBtn.textContent = "点击查看目录";
        document.body.prepend(toggleBtn);
    }
    let tocContainer = document.querySelector(containerSelector);
    if (!tocContainer) {
        tocContainer = document.createElement("div");
        tocContainer.id = "toc-container";
        tocContainer.classList.add("hidden");
        document.body.prepend(tocContainer);
    }
    tocContainer.innerHTML = '<h2>目录</h2><ul class="toc-list root-list"></ul>';
    const rootList = tocContainer.querySelector(".root-list");
    const contentContainer = document.querySelector(contentSelector);
    if (!contentContainer) {
        return;
    }
    const headings = [];
    levels.forEach(level => {
        const headingElements = contentContainer.querySelectorAll(`h${level}`);
        headingElements.forEach(heading => {
            headings.push({
                element: heading,
                level: level,
                text: heading.textContent.trim(),
                position: heading.offsetTop
            });
        });
    });
    headings.sort((a, b) => a.position - b.position);
    if (headings.length === 0) {
        return;
    }
    headings.forEach((heading, index) => {
        if (!heading.element.id) {
            heading.element.id = `heading-${index + 1}`;
        }
        heading.id = heading.element.id;
    });
    const parentLists = [];
    parentLists[0] = rootList;
    headings.forEach(heading => {
        const listItem = document.createElement("li");
        listItem.className = `toc-level-${heading.level}`;
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.text;
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById(heading.id).scrollIntoView({
                behavior: "smooth"
            });
            tocContainer.classList.add("hidden");
            toggleBtn.classList.remove("display-none");
        });
        listItem.appendChild(link);
        const parentLevel = heading.level - 1;
        while (parentLists.length <= parentLevel) {
            const newList = document.createElement("ul");
            newList.className = "toc-list";
            parentLists[parentLists.length - 1].lastChild.appendChild(newList);
            parentLists.push(newList);
        }
        parentLists[parentLevel].appendChild(listItem);
        while (parentLists.length > heading.level) {
            parentLists.pop();
        }
        const subList = document.createElement("ul");
        subList.className = "toc-list";
        listItem.appendChild(subList);
        parentLists[heading.level] = subList;
    });
    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY + 100;
        headings.forEach(heading => {
            const headingElement = document.getElementById(heading.id);
            const linkElement = tocContainer.querySelector(`a[href="#${heading.id}"]`);
            if (headingElement && linkElement) {
                const headingTop = headingElement.offsetTop;
                const nextHeading = headings[headings.indexOf(heading) + 1];
                const headingBottom = nextHeading
                    ? document.getElementById(nextHeading.id).offsetTop
                    : document.body.scrollHeight;

                linkElement.classList.remove("toc-active");
                if (scrollPosition >= headingTop && scrollPosition < headingBottom) {
                    linkElement.classList.add("toc-active");
                }
            }
        });
    });
    toggleBtn.addEventListener("click", function () {
        tocContainer.classList.toggle("hidden");
        if (!tocContainer.classList.contains("hidden")) {
            toggleBtn.classList.add("display-none");
        } else {
            toggleBtn.classList.remove("display-none");
        }
    });
}

function markdownToHtml(markdown) {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    let html = '';
    let inCodeBlock = false;
    let inList = false;
    const closeListIfNeeded = () => {
        if (inList) {
            html += '</ul>\n';
            inList = false;
        }
    };
    lines.forEach(line => {
        let content = line;
        const trimmed = content.trim();
        if (trimmed.startsWith('```') && !trimmed.includes('```', 3)) {
            closeListIfNeeded();
            inCodeBlock = !inCodeBlock;
            html += inCodeBlock ? '<div class="code-block"><pre>' : '</pre></div>';
            return;
        }
        if (inCodeBlock) {
            html += content + '\n';
            return;
        }
        if (trimmed.startsWith('#')) {
            closeListIfNeeded();
            const level = trimmed.indexOf(' ');
            if (level > 0 && level <= 6) {
                const text = trimmed.slice(level).trim()
                    .replace(/```(.*?)```/g, '<code>$1</code>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
                html += `<h${level}>${text}</h${level}>\n`;
            } else {
                html += `<p>${trimmed}</p>\n`;
            }
            return;
        }
        if (trimmed.startsWith('- ')) {
            const text = trimmed.slice(2).trim()
                .replace(/```(.*?)```/g, '<code>$1</code>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            html += `<li>${text}</li>\n`;
            return;
        }
        closeListIfNeeded();
        if (trimmed.startsWith('![')) {
            const match = trimmed.match(/!\[([^\]]+)\]\(([^)]+)\)/);
            if (match) html += `<img src="${match[2]}" alt="${match[1]}" class="tutorial-image">\n`;
            return;
        }
        content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/```(.*?)```/g, '<code>$1</code>');
        if (trimmed) html += `<p>${content}</p>\n`;
    });
    closeListIfNeeded();
    if (inCodeBlock) html += '</pre></div>';
    return html;
}

async function decryptAndDisplay(DECRYPTION_PASSWORD) {
    const imgElements = document.querySelectorAll("img.tutorial-image");
    imgElements.forEach(async (imgElement) => {
        const originUrl = imgElement.src;
        if (originUrl.endsWith('.slj')) {
            try {
                const response = await fetch(originUrl);
                const blob = await response.blob();
                const encryptedBuffer = await blob.arrayBuffer();
                const encryptedUint8Array = new Uint8Array(encryptedBuffer);
                if (encryptedUint8Array.length < 16 + 12) {
                    console.error('文件损坏或不是有效的加密文件');
                }
                const salt = encryptedUint8Array.subarray(0, 16);
                const iv = encryptedUint8Array.subarray(16, 16 + 12);
                const dataToDecrypt = encryptedUint8Array.subarray(16 + 12);
                const encoder = new TextEncoder();
                const passwordBuffer = encoder.encode(DECRYPTION_PASSWORD);
                const keyMaterial = await crypto.subtle.importKey(
                    'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveKey']
                );
                key = await crypto.subtle.deriveKey(
                    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
                    keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
                );
                const decryptedBuffer = await crypto.subtle.decrypt(
                    { name: 'AES-GCM', iv: iv },
                    key,
                    dataToDecrypt
                );
                const decryptedBlob = new Blob([decryptedBuffer]);
                const imageUrl = URL.createObjectURL(decryptedBlob);
                imgElement.src = imageUrl;
            } catch (error) {
                console.error('解密错误:', error);
            }
        }
    });
}

async function decryptContent(encryptedData, key) {
    try {
        const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        if (encryptedBytes.length < 44) {
            console.error("加密数据长度不足，可能已损坏");
        }
        const salt = encryptedBytes.slice(0, 16);
        const nonce = encryptedBytes.slice(16, 28);
        const tag = encryptedBytes.slice(28, 44);
        const ciphertext = encryptedBytes.slice(44);
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(key),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        const encryptionKey = await window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["decrypt"]
        );
        const combined = new Uint8Array(ciphertext.length + tag.length);
        combined.set(ciphertext);
        combined.set(tag, ciphertext.length);
        const decryptedBytes = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: nonce,
            },
            encryptionKey,
            combined
        );
        const decryptedStr = new TextDecoder().decode(decryptedBytes);
        return JSON.parse(decryptedStr);
    } catch (e) {
        console.error("解密失败:", e);
        return null;
    }
}

function decrypt(encryptedData, secretKey, title) {
    decryptContent(encryptedData, secretKey).then(result => {
        if (result) {
            document.title = title.replace("【已加密】", "");
            document.getElementById('header').getElementsByTagName('a')[0].textContent = '浮华のloc : ' + title.replace("【已加密】", "").replace(" - 浮华のloc", "");
            document.getElementById('articleSection').innerHTML = `
            <h1>${title.replace("【已加密】", "")}</h1>
            <article class="article-content">
                ${markdownToHtml(result.join('\n'))}
            </article>
            `;
            generateTableOfContents();
            decryptAndDisplay(secretKey);
        }
        else {
            document.getElementById('articleSection').innerHTML = `
            <h1>【已加密】无访问权限</h1>
            <article class="article-content">
                <h2>该内容已被加密，没有访问权限！</h2>
                <p>您可以尝试联系管理员以获取正确的密钥。</p>
            </article>
            `;
        }
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetch("./assets/data/articles.json").then(response => response.json()).then(data => {
        let article = data["articles"].find(article => (article.type == new URLSearchParams(window.location.search).get('title')));
        if (article != undefined) {
            document.title = article.title + ' - 浮华のloc';
            document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description', content: article.description }));
            document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'keywords', content: article.tags.join(', ') }));
            document.getElementById('header').getElementsByTagName('a')[0].textContent = '浮华のloc : ' + article.title;
            if (article["tags"][0] == "🔒") {
                document.getElementById('articleSection').innerHTML = `
                <h1>${article.title}</h1>
                <article class="article-content">
                    <h2>该文章已被加密，仅供部分人员查看！</h2>
                    <input type="text" id="password" placeholder="请输入密码">
                    <button onclick="decrypt('${article["ciphertext"]}', password.value, document.title)">解密</button>
                </article>
                `;
            }
            else {
                document.getElementById('articleSection').innerHTML = `
                <h1>${article.title}</h1>
                <article class="article-content">
                    ${markdownToHtml(article["content"].join('\n'))}
                </article>
                `;
                generateTableOfContents();
            }
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