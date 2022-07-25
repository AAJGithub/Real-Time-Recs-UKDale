# Generate recommendations using TRuleGrowth (Sequential Rule Mining) Algorithm

This folder contains required files to generate recommendations using the TRuleGrowth algorithm. 
The file `Recommendations_Sequential_Rule_Mining.ipnyb` contains the relevant execution for obtaining the recommendations. 

Before executing the TRuleGrowth algorithm, we require the data to be in form of sequences as an acceptable input to the TRuleGrowth algorithm. The execution of the algorithm is contained in the `script_trule_growth.py` file which then provides results that works as an input to the `Recommendations_Sequential_Rule_Mining.ipynb` file to generate relevant recommendations in `recommendations.csv`. We have also simplified the data to show the appliance names instead of the channels in the `recommendations_final.csv` file.

## Prerequisites
  Execute `/Utils/Resampling_and_Generating_Appliance_on_off_Data.ipynb` to generate Channel_On_Off data 

## Generate sequences
  - Execute `Sequence_Generation.ipynb`
  - The notebook generates sequences in the format acceptable for the TRuleGrowth algorithm
  - Generated files
    1. `apriori_input_data.txt`
    2. `sequnce_values_for_trulegrowth.txt`

## Execute TRuleGrowth algorithm
  We have used SPMF (https://www.philippe-fournier-viger.com/spmf/), an open-source data mining mining library written in Java to implement TRuleGrowth on our sequence data. `spmf.jar` is used in the `script_trule_growth.py` to generate rules using TRuleGrowth which takes the input sequences from `sequnce_values_for_trulegrowth.txt`. 
  - Generated files
    1. `trulegrowth_output.txt`
    2. `filtered_trulegrowth_rules.txt`
    
## Generate Recommendations
   - Execute `/Recommendations/Recommendations_Sequential_Rule_Mining.ipynb`
   - Generated files:
     1. `output_csv.csv`
     2. `refined_output.csv`
     3. `recommendations.csv` - Consists of the generated recommendations
