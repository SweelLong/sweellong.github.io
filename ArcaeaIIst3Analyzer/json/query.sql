PRAGMA foreign_keys = off;
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
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Arcahv', 'arcahv', '4.0', '7.0', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('翠杜 - 隣の庭は青い', 'suito', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('GALACTIC WARZONE', 'galacticwarzone', '-', '9.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Permutation', 'permutation', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Boss Rush', 'Boss Rush - USAO', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Quadruplicity', 'quadruplicity', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('咲く星々', 'sakuhoshiboshi', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Starlight Traveler', 'StarlightTraveler', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Meteorite Lotus', 'Meteorite Lotus', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Ré：Ré', 'rere', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Noël', 'noel', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('イガク', 'tresuskeenae', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('World Vanquisher(Full)', 'World Vanquisher(Full)', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('董卓討つべし', 'dongzhuo', '-', '-', '-', '-', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('SUPERNOVA', 'supernova', '-', '-', '13.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('epitaxy', 'epitaxy', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('十拳剣', 'totsukanotsurugi', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('系ぎて', 'tsunagite(SaltedFish)', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Turning Point', 'turningpoint', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Viyella’s Melancholy', 'viyellasmelancholy', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Abyssgazer', 'Abyssgazer', '-', '9.0', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Observatory', 'observatory', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Re_Nascence(Psystyle.ver)', 'renascence', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('RUSH E', 'rushe', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Lostwizz', 'Lostwizz', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('’Eureka’', 'eureka', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Anomaly', 'anomaly', '-', '-', '9.0', '10.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Angel dust', 'angeldust', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Double Agent', 'Double Agent', '-', '-', '-', '10.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Bounded Quietude', 'boundedquietude', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Gekka (Short Version)', 'gekka', '-', '-', '-', '9.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('We Gonna Party', 'wegonnaparty', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('名無しの宣教師', 'missionary', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Reversed Zenith', 'Reversed Zenith', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('......已至', 'amiya', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Paradial Resonator', 'para with riz', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('月詠に鳴る', 'Tsukuyomi', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Echoism', 'echoism', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('枯枰竞', 'kupingjing', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('VIVID ABYSS', 'vividabyss', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Traxxendenza', 'traxxendenza', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('ゼーレンヴァンデルング', 'seelewanderung', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('MAGGOD', 'maggod', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('傷つき傷つけ痛くて辛い', 'kizukizuitatsura', '1.0', '1.0', '10.0', '10.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Fractured Angel', 'fracturedangel', '-', '-', '-', '12.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('空白とカタルシス', 'emptycatharsis', '-', '-', '9.0', '11.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Raven Emperor', 'raven', '1.0', '9.0', '11.0', '11.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Blew Moon', 'blewmoon', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Giver of Life', 'giveroflife', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('冲破穹顶', 'minima', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Untitled World', 'untitledworld', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('「阴云火花」', 'lightspark', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('BRAVE：ROAD', 'braveroad', '1.0', '1.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Maboroshi', 'maboroshi', '2.0', '5.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('幻影鬼魅(PLEASE)', 'please', '4.0', '6.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Bibic Heart', 'bibicheart', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Divide et impera!', 'divideetimpera', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Synthesized Girl’s Heart', 'synthesizedgirlsheart', '4.0', '7.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Spell of ChaoS', 'spellofchaos', '-', '-', '-', '11.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Super Universe (Knighthood Remix)', 'SuperUniverse', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('驟雨の狭間', 'rainshower', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('雷切-RAIKIRI-', 'raikiri', '1.0', '1.0', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('EVERGREEN', 'evergreen', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Soreha， Tooi Natsu no Hi', 'natsu', '-', '-', '8.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Enjoy This Time feat. Yukacco', 'enjoythistime', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Distant Sky', 'sora', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('とあちゃんのおもちゃ箱', 'toybox', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('檄！帝国華撃団(改)', 'gekiteikokukagekidan', '-', '-', '7.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('J219', 'j219', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('テトリス', 'tetorisu', '-', '-', '8.0', '9.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('雑踏、僕らの街', 'gbcop', '-', '-', '-', '10.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('EX - RiS', 'exris', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Vapor Whirl', 'vw', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Mystic Light Quest (Full ver.)', 'mysticlightquestfull', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('彁', 'ge', '-', '-', '10.0', '12.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('A Clock', 'aclock', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('End Time', 'endtime', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('folern', 'folern', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('INTERNET YAMERO', 'internetyamero', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('LiftOff', 'liftoff', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('QuiQ', 'quiq', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('VSpook!', 'vspook', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('氷滅の135小節', 'hyakusanjyugosyousetsu', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('とびだせ！TO THE COSMIC!!', 'tothecosmic', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Idiotic Transaction', 'idiotictransaction', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('エータ・ベータ・イータ', 'etabetaita', '-', '-', '-', '11.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('ラグトレイン', 'lagtrain', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Calamity Fortune', 'calamity', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('The Daybreak Will Never Come Again.', 'daybreak', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Horizon Blue', 'horizonblue', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('TεμπεΣT', 'tempestla', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('焦がれるひととき', 'sweetmoment', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Above the Clouds', 'abovetheclouds', '-', '-', '8.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('金色のマーチ', 'matsuri', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Misty Memory (Night Version)', 'mistymemory', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Double Agent', 'DoubleAgent', '-', '-', '-', '-', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('冠菊', 'Kamurogiku', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Shawarma Legend', 'shawarma', '-', '-', '7.0', '14.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Theatore Creatore', 'theatorecreatore', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('滋味常', 'ziweichang', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('浸春芜', 'jinchunwu', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('First Crevasse on the Frozen Lake', 'firstcrevasseonthefrozenlake', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Wolves Standing Towards Ememies', 'Wolves Standing Towards Ememies', '7.0', '9.0', '12.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('opia', 'opia', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('MYTHOS', 'mythos', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('OUTERHEΛVEN', 'outerheaven', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('dB doll', 'dbdoll', '-', '-', '7.0', '8.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('A Lasting Promise', 'alastingpromise', '-', '-', '11.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Heaven’s Cage', 'HeavensCage', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Cryptarithm', 'cryptarithm', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('raputa', 'raputa', '-', '-', '11.0', '11.0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('amethyst', 'amethyst', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('vs.TREAMEЯ', 'vsTREAMER', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Gangnam Style', 'Gangnam Style', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Faded', 'faded', '-', '-', '-', '-', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Waht Song', 'song', '-', '-', '-', '-', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('你若三冬 (想吃广东菜DJ)', 'youlikethreewinter', '-', '-', '-', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Lightning', 'lightning', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Rainmaker', 'Rainmaker', '-', '-', '9.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Southern Cross', 'southerncross', '-', '-', '10.0', '0', '');
INSERT INTO allsongs (songname, songId, PST, PRS, FTR, BYD, ETR) VALUES ('Radial Raylights', 'rrays', '-', '-', '10.0', '0', '');
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

--COMMIT TRANSACTION