import os
from pathlib import Path
import uuid

env_path = Path('.') / '.env'
from dotenv import load_dotenv
load_dotenv(dotenv_path=env_path)

from generate_word_cloud_in_other_language import generate_word_cloud_in_other_language

def translate_response_object(aws_translate_client, response_object, translation_language):
	translated_response_object = {}
	old_summary = response_object["summary"]
	result = aws_translate_client.translate_text(Text=old_summary,SourceLanguageCode="en", TargetLanguageCode=translation_language)
	summary = result.get('TranslatedText')
	base64_wordcloud =  generate_word_cloud_in_other_language(summary,translation_language,str(uuid.uuid1()))
	old_behaviour_traits = response_object["behaviourTraits"]
	behavioral_traits = {}
	for key in old_behaviour_traits:
		result = aws_translate_client.translate_text(Text=key,SourceLanguageCode="en", TargetLanguageCode=translation_language)
		new_key = result.get('TranslatedText')
		behavioral_traits[new_key] = old_behaviour_traits[key]

	old_emotional_traits = response_object["emotionalTraits"]
	emotional_traits = {}
	for key in old_emotional_traits:
		result = aws_translate_client.translate_text(Text=key,SourceLanguageCode="en", TargetLanguageCode=translation_language)
		new_key = result.get('TranslatedText')
		emotional_traits[new_key] = old_emotional_traits[key]

	old_iptc_traits = response_object["iptcTraits"]
	iptc_traits = {}
	for key in old_iptc_traits:
		result = aws_translate_client.translate_text(Text=key,SourceLanguageCode="en", TargetLanguageCode=translation_language)
		new_key = result.get('TranslatedText')
		iptc_traits[new_key] = old_iptc_traits[key]


	old_common_topics = response_object["commonTopics"]
	common_topics = []
	for topic in old_common_topics:
		result = aws_translate_client.translate_text(Text=topic,SourceLanguageCode="en", TargetLanguageCode=translation_language)
		common_topics.append(result.get('TranslatedText'))

	data = {
		'translatedSummary': summary,
		'translatedCommonTopics': common_topics,
		'translatedSentiments': response_object['sentiments'],
            	'translatedEmotionalTraits': emotional_traits,
        	'translatedBehaviourTraits': behavioral_traits,
            	'translatedIptcTraits': iptc_traits,
            	'translatedBase64Wordcloud': base64_wordcloud,
	}
	return data







