# UK-Dale Dataset Energy Disaggregation  
We followed following Energy Disaggregation Algorithms:
* Combinatorial Optimization [notebook](https://github.com/Akshay-Jaiswal/UK-Dale-Dataset-Analysis-and-Prediction/blob/master/Disaggregation/CO_and_FHMM_Disaggregation_for_UKDALE.ipynb)
* Factorial Hidden Markov Model [notebook](https://github.com/Akshay-Jaiswal/UK-Dale-Dataset-Analysis-and-Prediction/blob/master/Disaggregation/CO_and_FHMM_Disaggregation_for_UKDALE.ipynb)
* Recuurent Neural Network Disaggregation [notebook](https://github.com/Akshay-Jaiswal/UK-Dale-Dataset-Analysis-and-Prediction/blob/master/Disaggregation/RNN_Disaggregation_for_UKDALE.ipynb)
* Personal Implementation of energy disaggregation using Classification [notebook](https://github.com/Akshay-Jaiswal/UK-Dale-Dataset-Analysis-and-Prediction/blob/master/Disaggregation/Energy-Disaggregation-Personal-algorithm.ipynb)

## NILMTK Algorithms: 
Before using NILMTK library for energy disaggregation, we need to convert ukdale dataset HDF5 file.

### Combinatorial Optimization 
 	-  Set building number and the timeframe for train and test data 
 	-  Train the NILMTK CO algorithm using submeter data with resampling period
 	-  Predict using Test data
 	-  Convert the disaggregated appliance level data to operating states data using k-means
 	-  Compare various evaluation metrics[Accuracy, Precision, Recall, F1, RMSE]

### Factorial Hidden Markov Model 
 	-  Set building number and the timeframe for train and test data 
 	-  Create batches of appliances [FHMM generally gives memory issues when trained on large dataset]
 	-  Train the NILMTK FHMM algorithm using batches of submeter data with resampling period
 	-  Predicted using Test data
 	-  Convert the disaggregated appliance level data to operating states data using k-means
 	-  Compare various evaluation metrics[Accuracy, Precision, Recall, F1, RMSE]

### Recurring Neural Network Model 
 	-  Set building number and the timeframe for train and test data 
 	-  Create batches of appliances [FHMM generally gives memory issues when trained on large dataset]
 	-  Train the NILMTK RNN algorithm using batches of submeter data with resampling period
 	-  Predicted using Test data
 	-  Compare various evaluation metrics[Accuracy, Precision, Recall, F1, RMSE]

## Other Disaggregation Algorithms: 

### Disaggregation using classification: 
	- Convert appliance's data to on/off data 
	- Generate target variables using on/off data for classification
	- Train the classifier using mains power with target value as previously generate data on 50% data
	- Predict the data using trained model
	- Disintegrate the target values to appliance level data.  

### How to run

#### Installing NILMTK

We recommend using [Anaconda](https://store.continuum.io/cshop/anaconda/), which bundles together most of the required packages. We recommend using [Anaconda](https://www.anaconda.com/distribution/), which bundles togther most of the required packages. NILMTK requires Python 3.6+ due to the module it depends upon.

After Anaconda has been installed, open up the terminal (Unix) or Anaconda prompt (Windows):

1.  NILMTK should work fine in the base environment, but we recommend creating a new environment where NILMTK and related dependecies are installed.

	```bash
	conda create --name nilmtk-env 
	```

2. Add conda-forge to list of channels to be searched for packages.
	```bash
	conda config --add channels conda-forge
	```

3. Activate the new *nilmtk-env* environment.

	```bash
	conda activate nilmtk-env
	```

4. Install the NILMTK package

	```bash
	conda install -c nilmtk nilmtk
	```

#### Running algorithms based on NILMTK

1. Set the building number.
2. Change variables as needed  
2. Execute jupyter notebook 

#### Running algorithms based on classification
1. Install XGBoostClassifier
2. Provide the initial values for dataset directory values, output_dir, etc. 
3. Execute jupyter notebook