import os
import pandas as pd

# 读取 constantChart.csv 文件
csv_path = 'constantChart.csv'
df = pd.read_csv(csv_path, header=None)
df.columns = ['歌曲名', '歌曲ID', 'PAST', 'PRE', 'FTR', 'BYD', 'ETR']

# 生成 SQL 插入语句
insert_statements = []
for index, row in df.iterrows():
    song_id = row['歌曲ID']
    title = row['歌曲名']
    title = title.replace(',', '，')
    title = title.replace("'", "’")
    ratings = [row['PAST'], row['PRE'], row['FTR'], row['BYD'], row['ETR']]
    insert = f"INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('{title}', '{song_id}', '{ratings[0]}', '{ratings[1]}', '{ratings[2]}', '{ratings[3]}', '{ratings[4]}');"
    insert_statements.append(insert)

# SQL 模板
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

# 生成 SQL 文件
json_folder = '.'
sql_path = os.path.join(json_folder, 'query.sql')
insert_str = '\n'.join(insert_statements)
with open(sql_path, 'w', encoding='utf-8-sig') as sql_file:
    sql_file.write(sql_template.format(insert_statements=insert_str))
print('Done!')
    
