window.addEventListener("DOMContentLoaded", async function () {
  // 加载JSON数据
  var linkJson = [];
  var artJson = [];
  await fetch("./assets/data/links.json")
    .then(response => response.json())
    .then(data => {
      linkJson = data["links"];
    });
  await fetch("./assets/data/articles.json")
    .then(response => response.json())
    .then(data => {
      artJson = data["articles"];
    });
  // 加载随机背景
  var cnt = Math.ceil(Math.random() * 70);
  var obj = document.getElementById("banner");
  obj.style = "background-image: url('./assets/img/overlay.png'), url('./assets/img/bg/" + cnt + ".jpg')";
  // 动态插入推荐资源
  var rec_src = document.getElementById("rec_src");
  var cardContainer = document.createElement("div");
  cardContainer.className = "link-card-container";
  rec_src.appendChild(cardContainer);
  linkJson.forEach(item => {
    var card = document.createElement("div");
    card.className = "link-card";
    var domain = (new URL(item.link)).hostname;
    card.innerHTML = `
        <div class="card-content">
            <a href="${item.link}" target="_blank">
            <h3 class="res_title">${item.title}</h3>
            <br>
            <p class="card-description">${item.description}</p>
            <div class="card-url">${domain}</div>
            </a>
        </div>
    `;
    cardContainer.appendChild(card);
  });
  // 动态插入推荐文章
  var rec_art = document.getElementById("rec_art");
  artJson.forEach(item => {
    const card = document.createElement("div");
    card.className = "tutorial-card";
    card.innerHTML = `
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-meta">
            <span>标签：${item.tags.join("、")}</span><br>
            <span>发布时间：${item.time}</span>
        </div>
        <a href="${item.link}" class="btn-readmore">查看完整文章</a>
    `;
    rec_art.appendChild(card);
  });
});