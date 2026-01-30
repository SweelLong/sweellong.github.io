import os
import json
from datetime import date

if __name__ == "__main__":
    BASE_URL = "https://blog.swiro.top"
    ARTICLES_JSON_PATH = "assets/data/articles.json"
    INCLUDE_INDEX_HTML = False
    os.chdir(os.path.dirname(__file__))
    try:
        with open(ARTICLES_JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
        articles = data.get('articles', [])
        if not articles:
            print("警告：articles.json 中未找到 articles 数据")
            article_types = []
        else:
            article_types = list({article.get('type') for article in articles if article.get('type')})
    except FileNotFoundError:
        print(f"错误：未找到 {ARTICLES_JSON_PATH} 文件，请检查路径")
        exit(1)
    except json.JSONDecodeError:
        print(f"错误：{ARTICLES_JSON_PATH} 格式错误，无法解析")
        exit(1)
    urls = []
    if INCLUDE_INDEX_HTML:
        urls.append(f"{BASE_URL}/index.html")
    urls.append(f"{BASE_URL}/")
    for t in article_types:
        article_url = f"{BASE_URL}/article.html?title={t}"
        urls.append(article_url)
    today = date.today().isoformat()
    sitemap_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''
    for url in urls:
        sitemap_content += f'''  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
  </url>
'''
    sitemap_content += '</urlset>'
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    print(f"✅ sitemap.xml 生成成功，共包含 {len(urls)} 个页面")
    print(f"文件路径：{os.path.abspath('sitemap.xml')}")