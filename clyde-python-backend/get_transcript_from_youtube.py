from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter

def get_transcript_from_youtube(videoId):
	transcript = YouTubeTranscriptApi.get_transcript(videoId)
	formatter = TextFormatter()
	text_formatted = formatter.format_transcript(transcript)
	return text_formatted

def main():
	videoId = "2YuFNymq_M0"
	get_transcript_from_youtube(videoId)

if __name__ == "__main__":
	main()

