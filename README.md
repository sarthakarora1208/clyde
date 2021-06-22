<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sarthakarora1208/clyde-chrome-extension">
    <img src="./clyde-chrome-extension/icons/Clyde.png" alt="Logo">
  </a>

  <h3 align="center">Clyde</h3>

  <p align="center">
    <a href="https://github.com/sarthakarora1208/clyde"><strong>Explore the docs »</strong></a>
    <br />
    Mine opinions and analyse sentiments anywhere on the internet.
    <br />
    <a href="https://youtu.be/EVARioLl__s">View Demo</a>
    ·
    <a href="https://github.com/sarthakarora1208/clyde/issues">Report Bug</a>
    ·
    <a href="https://github.com/sarthakarora1208/clyde/issues">Request Feature</a>
  </p>
</p>

---

Video Link: [https://youtu.be/EVARioLl__s](https://youtu.be/EVARioLl__s)


Clyde is a chrome extension that uses multiple NLP techniques to analyze sentiments, behavioral traits, emotional traits &  IPTC traits for anything on the internet. You can investigate Youtube videos, news articles, tweets, or even subreddits in real-time & get meaningful insights. People often freely express their views and opinions on social media, providing a wealth of information about their thoughts and feelings.  Clyde offers a simple way to mine these opinions and monitor reactions on social media by just keeping the relevant parts. The emotions and behavioral traits help us determine whether the people are angry, satisfied, or confused when reacting to a news item.  Leveraging Expert.ai's sentiment analysis capabilities, we can establish whether the news item's perception is positive or negative. Using the snipping tool you can screenshot & select specific parts of the web pages across multiple websites to get a detailed report on the topic in question. For example, we want to examine the public sentiment on Bitcoin after China's recent crackdown of the cryptocurrency across Reddit, Twitter, Youtube & news articles. With Clyde, doing this is a piece of cake.

## Table of Contents

- [Clyde Chrome Extension](#Clyde-Chrome-Extension)
- [Features](#Features)
  - [Opinion Mining & Web Content Analysis](#Opinion-Mining-&-Web-Content-Analysis)
  - [Youtube Video  & News Report Analysis](#Youtube-Video-&-News-Report-Analysis)
  - [Language Translation](#Language-Translation)
- [Basic Installation Instructions](#Basic-Installation-Instructions)
  - [Python Backend](#Python-Backend)
  - [Chrome Extension](#Chrome-Extension)

## Features


#### Opinion Mining & Web Content Analysis

Just select the text areas you want to monitor using the snipping tool & click the 'Analyze Images' button. You can take upto 8 screenshots across different websites to get a detailed analysis. You'll get the results back as piecharts & word clouds.
Using this feature you can tap into customer insights for your product to make better business. For example you can screenshot their product reviews to get a detailed analysis.


#### Youtube Video  & News Report Analysis
Did you know that the average youtube video length is about 11.7 minutes? And we all know news reports can be pretty long and monotonous. Your time is precious. How do you use it wisely? Clyde helps you manage your time well by summarising news articles & youtube videos. Tag-based interest matching assists users in filtering out content that doesn't match their preferences. Additionally, for news articles, all the IPTC media topics are listed for your convenience.

#### Language Translation
For bilingual speakers, you can get the summary & the word cloud in Spanish, French, German, or Italian upon clicking the toggle button on the top right.

## How we built it
We built the chrome extension using HTML, CSS & Javascript. The charts have been added using the chart.js library. The backend of the application is written in Python. The REST API is built using Flask. We use AWS texract to get a text from the screenshots using Optical Character Recognition. News articles are scrapped using Beautiful Soup & Regex. Youtube's transcript API is used to get the transcribe for the video. Once the text is extracted in any of three ways, it now analyzed using the following Expert.ai's NLP APIs.

<ol>
	<li>Document Analysis</li>
		<ul>
			<li>Keyphrase Extraction</li>
			<li>Sentiment Analysis</li>
		</ul>
	<li>Document Classification</li>
	<ul>
		<li>IPTC</li>
		<li>Emotional Traits</li>
		<li>Behavioral Traits</li>
	</ul>
</ol>
All the relevant key phrases & topics are extracted from the youtube subtitles or news articles and compared with the user's preferences, to find out everything in common. These common topics are shared as chips on the extension dashboard.

The key phrases are used to make Word Clouds. Word Cloud is a data visualization technique used for representing text data in which the size of each word indicates its frequency or importance. This gives the user an overview of what the author is trying to say.

IPTC traits, Emotional traits & Behavioral traits are shown as piecharts made using the chart.js library.

## Basic Installation Instructions

### Python Backend

To get the Python backend running locally follow the instructions at [clyde-python-backend/README.md](https://raw.githubusercontent.com/sarthakarora1208/clyde/main/clyde-python-backend/README.md)

### Chrome Extension

To get the Clyde Chrome Extension running locally follow the instructions at [clyde-chrome-extension/README.md](https://raw.githubusercontent.com/sarthakarora1208/clyde/main/clyde-chrome-extension/README.md)

