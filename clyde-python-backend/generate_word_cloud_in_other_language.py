import os
from os import path
import base64
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
from stop_words import get_stop_words


def generate_word_cloud_in_other_language(text, language, file_name):
    file_name += '.png'
    file_path = os.path.join(os.getcwd(), 'downloads', file_name)
    if language == 'es':
        stopwords = get_stop_words('spanish')
    elif language == 'fr':
        stopwords = get_stop_words('french')
    elif language == 'de':
        stopwords = get_stop_words('german')
    elif language == 'it':
        stopwords = get_stop_words('italian')

    wordcloud = WordCloud(stopwords=stopwords, background_color='white'
                          ).generate(text)
    wordcloud.to_file(file_path)
    with open(file_path, 'rb') as image_file:
        data = base64.b64encode(image_file.read())
    return data.decode('utf-8')


def main():
    file_name = '2'
    text = """"""


    # generate_word_cloud_in_other_language()

if __name__ == '__main__':
    main()