import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import datetime
from datetime import timedelta, date
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

def equipment_loader(file_path,equipments):
      
    equip_dict = {}
    for equipment in equipments:
#         print( file_path+equipment)
        equip_data = np.load(file_path+equipment)
        equipment = equipment[:-4]
        equip_data = list(equip_data)
        equip_data = [ x for x in equip_data if x!= '0']
        equip_dict[equipment] = list(equip_data)
    return equip_dict

def DateString():
    date = input("Enter Date : ")
    month = input("Enter Month : ")
    year = input("Enter Year : ")
    Date= [date,month,year]
    Date ='-'.join(Date) 
    return Date

def DayDataExtraction(Data,equipment_list,Date):
    day_data = {}
    for equipment in equipment_list:
        equipment = equipment[:-4]
        e_data = list(Data[equipment])
        e_data = [ x for x in e_data if Date in x]
        day_data[equipment] = e_data
    cleaned_day_data = {}    
    for equipment in day_data.keys():
        if len(day_data[equipment])==0:
            continue
        else:
            cleaned_day_data[equipment] = day_data[equipment]
    no_of_equipment_w = len(cleaned_day_data.keys()) 
#     print("No of equipment working on {%s} are :"%(Date),end = " ")
#     print(no_of_equipment_w)       
    return cleaned_day_data    

def HourDataExtraction(Data,Date,HourTime,equipment_list):
    day_ = DayDataExtraction(Data,equipment_list,Date)
    #print(day_)
    temp_list = [Date,HourTime[:2]]
    temp_time = ' '.join(temp_list)
    hourwise_data = {}
    for equip in day_.keys():
        temp_data = list(Data[equip])
        temp_data = [ x for x in temp_data if temp_time in x]
        if len(temp_data)==0:
            continue
        else:
            hourwise_data[equip] = temp_data
#     print("No of equipments working at %s %s are :"%(Date,HourTime),end =" ")
#     print(len(hourwise_data.keys()))       
    return hourwise_data       

def TimeDataExtraction(day_,Data,Date,Time,equipment_list):
    day_ = day_
    #day_ = DayDataExtraction(Data,equipment_list,Date)
    #print(day_)
    temp_list = [Date,Time]
    temp_time = ' '.join(temp_list)
    _data = {}
    _data[Time] = []
    for equip in day_.keys():
        temp_data = list(Data[equip])
        temp_data = [ x for x in temp_data if temp_time in x]
        if len(temp_data)==0:
            continue
        else:
            _data[equip] = temp_data
#     print("No of equipments working at %s %s are :"%(Date,Time),end =" ")
#     print(len(_data.keys()))       
    return list(_data.keys())


def DayTimeGenerator():
    hour = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    minute = ['00','30']
    second = '00'
    Time = []
    for hr in hour:
        for min in minute:
            temp = [hr,min,second]
            temp = ':'.join(temp)
            Time.append(temp)
    return Time

def MonthDateGenerator(year ,month,days_in_the_month):
    year = year
    month = month 
    days = days_in_the_month
    day = ['01','02','03','04','05','06','07','08','09']
    for i in range(10,days+1):
        day.append(str(i))
    Dates = []
    for d in day:
        temp = [year,month,d]
        temp = '-'.join(temp)
        Dates.append(temp)
    return Dates        

def DataExtractor(equipment_list,equipments_data,Dates,Time):
    transactions = []
    no_of_eq = len(equipment_list)
    for date in Dates:
        day_ = DayDataExtraction(equipments_data,equipment_list,date)
        for time in Time:
            temp_list = TimeDataExtraction(day_,equipments_data,date,time,equipment_list)           
            if len(temp_list)==0:
                continue
            #if len(temp_list)<no_of_eq:
             #   diff = no_of_eq-len(temp_list)
              #  for i in range(1,diff+1):
               #     temp_list.append('nan')
            else:
                transactions.append(temp_list)
    return transactions                

def get_min_max_dates(path_to_resampled_channel_data, number_of_channels):
    min_date = datetime.datetime.max.date()
    max_date = datetime.datetime.min.date()

    for i in reversed(range(2,number_of_channels)):
        cd = np.load(path_to_resampled_channel_data + "channel_"+str(i)+".npy")
        for item in cd:
            if(item != '0'):
                datetime_obj = datetime.datetime.strptime(item, "%Y-%m-%d %H:%M:%S")
                temp_date = datetime_obj.date()
                if(temp_date < min_date):
                    min_date = temp_date
                break;

        for item in reversed(cd):
            if(item != '0'):
                datetime_obj = datetime.datetime.strptime(item, "%Y-%m-%d %H:%M:%S")
                temp_date = datetime_obj.date()
                if(temp_date > max_date):
                    max_date = temp_date
                break;
    return min_date, max_date

def get_equipment_list(path):
    equipment_list = []
    for item in os.listdir(path):
        if 'channel_' in item and item != "channel_1.dat":
            equipment_list.append(item)
    return equipment_list

def get_equipment_data(path, equipment_list):
    equipments_data = equipment_loader(path, equipment_list)
    return equipments_data

def get_dates_list(min_date, max_date):
    Dates = []
    start_dt = min_date
    end_dt = max_date
    for dt in daterange(start_dt, end_dt):
        Dates.append(dt.strftime("%Y-%m-%d"))
    return Dates

def daterange(date1, date2):
    for n in range(int ((date2 - date1).days)+1):
        yield date1 + timedelta(n)

def get_all_time_of_day():
    Time = DayTimeGenerator()
    return Time

def get_apriori_input_data(equipment_list,equipments_data,Dates,Time):
    apriori_data = DataExtractor(equipment_list,equipments_data,Dates,Time)
    return apriori_data

def get_support_and_itemsets(apriori_data, minimum_support):
    te = TransactionEncoder()
    data = te.fit(apriori_data).transform(apriori_data)
    data = pd.DataFrame(data, columns = te.columns_)
    return apriori(data, min_support = minimum_support, use_colnames = True)

def get_channels_from_frequent_itemsets(frequent_itemsets_df):
    channels = set()
    for item in frequent_itemsets_df.itemsets:
        for entry in list(item):
            channels.add(entry)
    return channels

def get_channels_from_rules(rules_df):
    channels = set()
    for item in rules_df.consequents:
        for entry in list(item):
            channels.add(entry)
    return channels

# ### House 2 patterns -> 30 min resampled

path = "./Channel_On_Off_data/House_2/"

# Get equipment list and data from channel files
equipment_list = get_equipment_list(path)
equipments_data = get_equipment_data(path, equipment_list)

number_of_channels = len(equipment_list)

# Get max and min date in the equipments data
min_date, max_date = get_min_max_dates(path, number_of_channels)

# Generate date and time list 
Dates = get_dates_list(min_date, max_date)
Time = get_all_time_of_day()

# ### Generate Apriori input data

apriori_data = get_apriori_input_data(equipment_list, equipments_data,Dates,Time)

np.save("./Channel_On_Off_data/House_2/new_apriori_data.npy",apriori_data)

### Create a time-sequence dictionary

time_sequence_dict = dict()
for timestamp in Time:
    sequence_list = []
    for data in apriori_data:
        if timestamp in data:
            sequence_list.append(data)
    time_sequence_dict[timestamp] = sequence_list


# time_sequence_dict['09:30:00']

# ## Generate rules for all the timestamps

# get_ipython().run_cell_magic('time', '', '\nh2_frequent_itemset_dict = dict()\nh2_time_channels_from_frequent_itemsets_dict = dict()\nh2_time_channels_from_rules_dict = dict()\nh2_time_rules_dict = dict()\n\nfor timestamp in time_sequence_dict:\n    # Generate frequent itemsets\n    h2_frequent_itemset_dict[timestamp] = get_support_and_itemsets(time_sequence_dict[timestamp], 0.4)\n    # Generate rules\n    h2_time_rules_dict[timestamp] = association_rules(h2_frequent_itemset_dict[timestamp], metric="confidence", min_threshold=0.8)\n    # Filter rules\n    h2_time_rules_dict[timestamp] = h2_time_rules_dict[timestamp][h2_time_rules_dict[timestamp][\'antecedents\'] == frozenset({timestamp})]\n    # Get channels from frequent itemsets\n    h2_time_channels_from_frequent_itemsets_dict[timestamp] = get_channels_from_frequent_itemsets(h2_frequent_itemset_dict[timestamp])\n    # Get channels from rules\n    h2_time_channels_from_rules_dict[timestamp] = get_channels_from_rules(h2_time_rules_dict[timestamp])')

h2_frequent_itemset_dict = dict()
h2_time_channels_from_frequent_itemsets_dict = dict()
h2_time_channels_from_rules_dict = dict()
h2_time_rules_dict = dict()

for timestamp in time_sequence_dict:
    # Generate frequent itemsets
    h2_frequent_itemset_dict[timestamp] = get_support_and_itemsets(time_sequence_dict[timestamp], 0.4)
    # Generate rules
    h2_time_rules_dict[timestamp] = association_rules(h2_frequent_itemset_dict[timestamp], metric="confidence", min_threshold=0.4)
    # Filter rules
    h2_time_rules_dict[timestamp] = h2_time_rules_dict[timestamp][h2_time_rules_dict[timestamp]['antecedents'] == frozenset({timestamp})]
    # Get channels from frequent itemsets
    h2_time_channels_from_frequent_itemsets_dict[timestamp] = get_channels_from_frequent_itemsets(h2_frequent_itemset_dict[timestamp])
    # Get channels from rules
    h2_time_channels_from_rules_dict[timestamp] = get_channels_from_rules(h2_time_rules_dict[timestamp])


for timestamp, df in h2_time_rules_dict.items():
    df.to_csv("./Rule_Files/" + timestamp + ".csv", header=True, index=False)


