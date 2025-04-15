import pandas as pd
import re

csv_file = 'constantChart.csv'
xlsx_file = 'Arcaea II2.4.4 Page2定数详表更新.xlsx'
# 读取 CSV 文件，没有列名
csv_df = pd.read_csv(csv_file, header=None)
csv_df.columns = ['歌曲名', '歌曲ID', 'PST', 'PRE', 'FTR', 'BYD', 'ETR']
# 读取 Excel 文件，第一行是列名
xlsx_df = pd.read_excel(xlsx_file)
# 遍历需要更新的列
columns_to_update = ['PST', 'PRE', 'FTR', 'BYD', 'ETR']
for col in columns_to_update:
    # 找到 Excel 文件中包含该列名的列
    xlsx_col = next((c for c in xlsx_df.columns if col in c), None)
    if xlsx_col:
        # 根据歌曲名进行匹配更新
        for index, row in xlsx_df.iterrows():
            song_name = row['歌曲ID']
            value = row[xlsx_col]
            csv_index = csv_df[csv_df['歌曲ID'] == song_name].index
            if not csv_index.empty:
                if bool(re.match(r'^[-+]?(\d+(\.\d*)?|\.\d+)$', str(value))):
                    csv_df.at[csv_index[0], col] = float(value)
# 保存更新后的 CSV 文件
csv_df.to_csv(csv_file, header=False, index=False, encoding='utf-8-sig')
print('Done!')
