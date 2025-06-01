import os
import json
import shutil
songs_folder = 'songs'
# 读取 songlist.json 文件
songlist_path = os.path.join(songs_folder, 'songlist')
with open(songlist_path, 'r', encoding='utf-8-sig') as f:
    songlist = json.load(f)
# 创建输出文件夹和子文件夹
output_folder = 'Output'
os.makedirs(output_folder, exist_ok=True)
processed_illustration_folder = os.path.join(output_folder, 'Processed_Illustration')
os.makedirs(processed_illustration_folder, exist_ok=True)
sample_folder = os.path.join(output_folder, 'sample')
os.makedirs(sample_folder, exist_ok=True)
json_folder = os.path.join(output_folder, 'json')
os.makedirs(json_folder, exist_ok=True)
# 处理图片
for song in songlist['songs']:
    song_id = song['id']
    song_id_folder = os.path.join(songs_folder, song_id)
    for file in os.listdir(song_id_folder):
        if 'base' in file and '.jpg' in file:
            src = os.path.join(song_id_folder, file)
            dst = os.path.join(processed_illustration_folder, f'{song_id}.jpg')
            shutil.copyfile(src, dst)
            break
# 生成 constantChart.csv 文件
csv_path = os.path.join(sample_folder, 'constantChart.csv')
with open(csv_path, 'w', encoding='utf-8-sig') as csv_file:
    for song in songlist['songs']:
        song_id = song['id']
        title = list(song['title_localized'].values())[0]
        title = title.replace(',', '，')
        title = title.replace("'", '’')
        ratings = [0, 0, 0, 0, 0]
        for diff in song['difficulties']:
            if diff['ratingClass'] in [0, 1, 2, 3, 4]:
                ratings[diff['ratingClass']] = round(float(diff['rating']), 1) if diff['rating'] >= 1 else 0
        #csv_file.write(f'{song_id},{title},{",".join(map(str, ratings))}\n')
        csv_file.write(f'{title},{song_id},{",".join(map(str, ratings))}\n')
# 复制 songlist 文件到 json 文件夹
shutil.copyfile(songlist_path, os.path.join(json_folder, 'songlist'))
# 生成 simplified_songlist.json 文件
simplified_songlist = {str(i): song['id'] for i, song in enumerate(songlist['songs'])}
simplified_path = os.path.join(json_folder, 'simplified_songlist.json')
with open(simplified_path, 'w', encoding='utf-8-sig') as f:
    json.dump(simplified_songlist, f, ensure_ascii=False, indent=4)
# 生成 query.sql 文件
sql_path = os.path.join(json_folder, 'query.sql')
insert_statements = []
for song in songlist['songs']:
    song_id = song['id']
    title = list(song['title_localized'].values())[0]
    title = title.replace(',', '，')
    title = title.replace("'", '’')
    ratings = [0, 0, 0, 0, 0]
    for diff in song['difficulties']:
        if diff['ratingClass'] in [0, 1, 2, 3, 4]:
            ratings[diff['ratingClass']] = round(float(diff['rating']), 1) if diff['rating'] >= 1 else '-'
    insert = f"INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('{title}', '{song_id}', '{ratings[0]}', '{ratings[1]}', '{ratings[2]}', '{ratings[3]}', '');"
    insert_statements.append(insert)
sql_template = """PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：allsongs
DROP TABLE IF EXISTS allsongs;
CREATE TABLE allsongs(
  songname TEXT,
  songId TEXT,
  PST,
  PRS,
  FTR,
  BYD,
  ETR
);
{insert_statements}
COMMIT TRANSACTION;

PRAGMA foreign_keys = on;
        DROP VIEW IF EXISTS PTT2;
        CREATE VIEW PTT2 AS
        SELECT
            allsongs.songname,
            allsongs.songId,
            CASE
            WHEN songDifficulty = 0 THEN "Past"
            WHEN songDifficulty = 1 THEN "Present"
            WHEN songDifficulty = 2 THEN "Future"
            WHEN songDifficulty = 3 THEN "Beyond"
            WHEN songDifficulty = 4 THEN "Eternal"
            END AS Difficulty,
            scores.score,
            scores.perfectCount AS Perfect,
            scores.shinyPerfectCount AS criticalPerfect,
            scores.nearCount AS Far,
            scores.missCount AS Lost,
            CASE
            WHEN songDifficulty = 0 THEN allsongs.PST
            WHEN songDifficulty = 1 THEN allsongs.PRS
            WHEN songDifficulty = 2 THEN allsongs.FTR
            WHEN songDifficulty = 3 THEN allsongs.BYD
            WHEN songDifficulty = 4 THEN allsongs.ETR
            END AS Constant,
            CASE
            WHEN score >= 10000000 THEN
            CASE
            WHEN songDifficulty = 0 THEN ROUND((allsongs.PST + 2.0), 6)
            WHEN songDifficulty = 1 THEN ROUND((allsongs.PRS + 2.0), 6)
            WHEN songDifficulty = 2 THEN ROUND((allsongs.FTR + 2.0), 6)
            WHEN songDifficulty = 3 THEN ROUND((allsongs.BYD + 2.0), 6)
            WHEN songDifficulty = 4 THEN ROUND((allsongs.ETR + 2.0), 6)
            END
            WHEN score >= 9800000 AND score < 10000000 THEN
            CASE
            WHEN songDifficulty = 0 THEN ROUND((allsongs.PST + 1.0 + CAST((score - 9800000) AS REAL) / 200000), 6)
            WHEN songDifficulty = 1 THEN ROUND((allsongs.PRS + 1.0 + CAST((score - 9800000) AS REAL) / 200000), 6)
            WHEN songDifficulty = 2 THEN ROUND((allsongs.FTR + 1.0 + CAST((score - 9800000) AS REAL) / 200000), 6)
            WHEN songDifficulty = 3 THEN ROUND((allsongs.BYD + 1.0 + CAST((score - 9800000) AS REAL) / 200000), 6)
            WHEN songDifficulty = 4 THEN ROUND((allsongs.ETR + 1.0 + CAST((score - 9800000) AS REAL) / 200000), 6)
            END
            ELSE
            CASE
            WHEN songDifficulty = 0 THEN
            CASE
            WHEN allsongs.PST + CAST((score - 9500000) AS REAL) / 300000 < 0 THEN 0
            ELSE ROUND((allsongs.PST + CAST((score - 9500000) AS REAL) / 300000), 6)
            END
            WHEN songDifficulty = 1 THEN
            CASE
            WHEN allsongs.PRS + CAST((score - 9500000) AS REAL) / 300000 < 0 THEN 0
            ELSE ROUND((allsongs.PRS + CAST((score - 9500000) AS REAL) / 300000), 6)
            END
            WHEN songDifficulty = 2 THEN
            CASE
            WHEN allsongs.FTR + CAST((score - 9500000) AS REAL) / 300000 < 0 THEN 0
            ELSE ROUND((allsongs.FTR + CAST((score - 9500000) AS REAL) / 300000), 6)
            END
            WHEN songDifficulty = 3 THEN
            CASE
            WHEN allsongs.BYD + CAST((score - 9500000) AS REAL) / 300000 < 0 THEN 0
            ELSE ROUND((allsongs.BYD + CAST((score - 9500000) AS REAL) / 300000), 6)
            END
            WHEN songDifficulty = 4 THEN
            CASE
            WHEN allsongs.ETR + CAST((score - 9500000) AS REAL) / 300000 < 0 THEN 0
            ELSE ROUND((allsongs.ETR + CAST((score - 9500000) AS REAL) / 300000), 6)
            END
            END
            END AS singlePTT
        FROM scores,allsongs
        WHERE
        /*(scores.songDifficulty = 2 OR scores.songDifficulty = 3)
            AND*/
            scores.songId = allsongs.songId
        ORDER BY singlePTT DESC;


        --SELECT * FROM PTT2;

        --输出新表
        DROP TABLE IF EXISTS PTT_DESC;
        --创建目标表， 如果尚未存在
        CREATE TABLE PTT_DESC(
            songname TEXT,
            songId TEXT,
            Difficulty TEXT,
            score INTEGER,
            Perfect INTEGER,
            criticalPerfect INTEGER,
            Far INTEGER,
            Lost INTEGER,
            Constant REAL,
            singlePTT REAL
        );

        --将视图查询结果插入到新表中
        INSERT INTO PTT_DESC
        SELECT * FROM PTT2;

        SELECT * FROM PTT_DESC;

--COMMIT TRANSACTION"""
insert_str = '\n'.join(insert_statements)
with open(sql_path, 'w', encoding='utf-8-sig') as sql_file:
    sql_file.write(sql_template.format(insert_statements=insert_str))
print('Done!')
