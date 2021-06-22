import requests
from bs4 import BeautifulSoup
import nltk.data

def get_text_from_url(url):
	res = requests.get(url)
	html_page = res.content
	soup = BeautifulSoup(html_page, 'html.parser')
	text = soup.find_all(text=True)

	output = ''
	blacklist = ['[document]','noscript','header','html','meta','head','input','script', "style"]
    	# there may be more elements you don't want, such as "style", etc.


	for t in text:
    		if t.parent.name not in blacklist:
        		output += '{} '.format(t)

	#print(output)
	# Loading PunktSentenceTokenizer using English pickle file
	tokenizer = nltk.data.load('tokenizers/punkt/PY3/english.pickle')
	#cleaned_sentences = []
	#print(tokenizer.tokenize(output))
	tokenized_sent_after_remove_n = [x.replace('\n','') for x in tokenizer.tokenize(output)]

	#print(tokenized_sent_after_remove_n)
	text = ""
	for sentence in tokenized_sent_after_remove_n:
		text += sentence
	return text
def main():
	url = 'https://www.nytimes.com/interactive/2021/05/25/world/asia/india-covid-death-estimates.html'
	print(get_text_from_url(url))


if __name__ == "__main__":
	main()