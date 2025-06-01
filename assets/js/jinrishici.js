/**
 * 今日诗词V2 JS-SDK 1.2.3 (浮华のLoc定制版)
 * 今日诗词API 接口：https://www.jinrishici.com
 */
window.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "https://v2.jinrishici.com/one.json?client=browser-sdk/1.2.3";
    const token = window.localStorage?.getItem("jinrishici-token");
    const requestUrl = token ? `${baseUrl}&X-User-Token=${encodeURIComponent(token)}` : baseUrl;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            !token && window.localStorage?.setItem("jinrishici-token", response.token);
            document.getElementById("jinrishici-sentence").textContent = `赠你一言：${response.data.content}`;
        }
    };
    xhr.send();
});