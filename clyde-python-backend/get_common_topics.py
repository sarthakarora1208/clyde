

def get_common_topics(user_preferences, topics):

	user_preferences_as_set = set(user_preferences)
	common_topics = user_preferences_as_set.intersection(topics)
	response_text = ""

	return len(common_topics), list(common_topics)