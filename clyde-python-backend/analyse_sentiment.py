# Demonstrates the sentiment analysis capability of the expert.ai (Cloud based) Natural Language API performed by the 'sentiment' resource
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


from expertai.nlapi.cloud.client import ExpertAiClient

def analyse_sentiment(client, text):
	language= 'en'

	output = client.specific_resource_analysis(
    	body={"document": {"text": text}},
    	params={'language': language, 'resource': 'sentiment'
	})
	#	print("Output overall sentiment:")

	sentiment_array = [output.sentiment.negativity, output.sentiment.positivity,output.sentiment.overall]
	return sentiment_array;

def main():
	client = ExpertAiClient()
	text = "r/selfhelp . Posted by u/Saucysuee 11 hours ago 5 Emotional Whenever I feel overwhelmed by my own thoughts or feelings whether inn happy, sad or angry for myself or at times other people I cry. I think I'm very passionate about my emotions and I end up crying fairly easily. I don't know if that's a good thing or a bad thing. But I'd like to be able to express myself without crying. I'm so sensitive and I don't know why. Is this normal? M 2 Comments Award Share Save (2) Hide Report 100% Upvoted Comment as Doubt-Salt"
	array = analyse_sentiment(client, text)
	print(array[0]);
	print(array[1]);
	print(array[2]);

if __name__ =="__main__":
	main()




# Output overall sentiment

