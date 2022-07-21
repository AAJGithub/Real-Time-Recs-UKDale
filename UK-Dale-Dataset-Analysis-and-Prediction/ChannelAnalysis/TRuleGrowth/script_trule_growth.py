import os
jar_file_path = './spmf.jar'
input_file_path = './sequnce_values_for_trulegrowth.txt'
trulegrowth_output_path = './trulegrowth_output.txt'
filtered_trulegrowth_rules = './filtered_trulegrowth_rules.txt'

# Execute library jar to get rules using TRuleGrowth algorithm
os.system("java -jar " + jar_file_path + " run TRuleGrowth " + input_file_path + " " + trulegrowth_output_path + " 1% 1% 48 1 1")
print("\nTRuleGrowth Output Rules generated!")

# Filter generated rules to get the ON appliances status
with open(trulegrowth_output_path, "r") as a_file:
	result = ""
	for line in a_file:
		if(line.startswith("0 ==>")):
		  stripped_line = line.strip()
		  result += stripped_line + '\n'

f = open(filtered_trulegrowth_rules, "a")
f.write(result)
f.close()

print("\nSuccessfully filtered TRuleGrowth rules!\n")
