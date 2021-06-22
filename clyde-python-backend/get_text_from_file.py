import os
import boto3
from transformers import pipeline
from pathlib import Path
from dotenv import load_dotenv
import textract
from nltk.tokenize import sent_tokenize
from transformers import GPT2Tokenizer

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

def get_text_from_file(textract_client,file_name):
    file_path = os.path.join(os.getcwd(), 'downloads',file_name)
    file_name, file_extension = os.path.splitext(file_path)

    text = ""
    text_array = []

    if file_extension == '.pdf':
        file_bytes = textract.process(file_path, method='pdfminer')
        text = file_bytes.decode("utf-8")
    else:
        with open(file_path, 'rb') as document:
            imageBytes = bytearray(document.read())
        response = textract_client.detect_document_text(
            Document={'Bytes': imageBytes})
        for item in response["Blocks"]:
            if item["BlockType"] == "LINE":
                text = text + " " + item["Text"]
    #print(text)
    return text




def main():
    # Creating an AWS Textract client
    textract_client = boto3.client('textract', aws_access_key_id=str(os.environ.get('AWS_ACCESS_KEY_ID')),
                               aws_secret_access_key=str(os.environ.get('AWS_SECRET_ACCESS_KEY')))

    get_text_from_file(textract_client=textract_client,file_name='1.png')


if __name__ == "__main__":
    main()
