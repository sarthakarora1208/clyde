### Clyde Python Backend

### Requirements

- [Python 3.6+](#Python-3.6+)
- [AWS Account](#AWS-Account)
- [Expert.ai Account](#Expert.ai-Account)


### Python 3.6+

To test the integration you need to have python installed on your computer. You can get a suitable release from [here](https://www.python.org/downloads/). You can check your python version by the following command.
<br>

We recommend using a virtual environment for development. [Read about it here](https://pypi.org/project/virtualenv/).

Follow the following steps to create a virtual environment, clone the repository and install all the packages.



```bash
git clone https://github.com/sarthakarora1208/cylde.git
cd clyde/clyde-python-backend
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

Open the python interpreter and type in the following commands
```bash
python3
```

```bash
>> import nltk
>> nltk.download('stopwords')
```
### AWS Account


You can get your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users) and copy the following lines in the [.env](./.env) file.


```bash

AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"

```

### Expert.ai Account
You need to add your Expert.ai credentials in the [.env](./.env) file.

```bash
EAI_USERNAME=
EAI_PASSWORD=
````

To run the flask app:-
```bash
python3 app.py
```