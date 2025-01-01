from datetime import datetime

def mark_attendance(name):
    with open('sa.csv', 'r+') as f:
        data = f.readlines()
        name_list = [line.split(',')[0] for line in data]
        if name not in name_list:
            now = datetime.now()
            dt_string = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dt_string}')
