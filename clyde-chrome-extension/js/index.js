const COLOURS = [
    'rgb(73, 230, 141)',
    'rgb(3, 43, 173)',
    'rgb(69, 113, 255)',
    'rgb(246, 224, 94)',
    'rgb(246, 101, 101)',
    'rgb(245, 173, 85)',
    'rgb(79, 209, 197)',
    'rgb(11, 197, 234)',
    'rgb(159, 122, 234)',
    'rgb(37, 230, 141)',
    'rgb(3, 34, 137)',
    'rgb(95, 131, 255)',
    'rgb(264, 242, 49)',
    'rgb(246, 101, 110)',
    'rgb(254, 137, 58)',
    'rgb(97, 109, 187)',
    'rgb(19, 167, 224)',
    'rgb(155, 142, 224)'
];
let options = {
    maintainAspectRatio: false,
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 255, 255)'
        },
        position: 'left',
        align: 'start'
    }
};

const PRODUCTION = true;
const BASE_URL = PRODUCTION ? 'https://heroesquiz.tech' : 'http://localhost:5000';

const captureButton = document.querySelector('#captureScreenshot');
const insightsButton = document.querySelector('#pageInsights');
const popup = document.querySelector('.popup-content');
const interestsPopup = document.querySelector('.popup-interests');
const selectLanguage = document.getElementById('selectLang');
const resultpopup = document.querySelector('.popup-result');
const saveInterestsButton = document.querySelector('#saveInterests');
const startAgainButton = document.querySelector('#startAgain');
const wordCloud = document.querySelector('.wordcloud');
const tagInterests = document.querySelector('#tagInterests');
const summary = document.querySelector('#summary');
const summaryBox = document.querySelector('#summary-box');
const readMoreButton = document.getElementById('readMore');
const checkButton = document.querySelector('#check');
const addImageButton = document.querySelector('#addImage');
const mainText = document.querySelector('.main-text');
const screenshotListPreview = document.querySelector('.screenshot-list');
const languageToggleWrapper = document.getElementById('langToggleWrapper');
const languageToggle = document.querySelector('.lang-toggle');

const loader = document.querySelector('.loader');
const behavioralAnalysisChartElement = document
    .getElementById('behavioralAnalysisChart')
    .getContext('2d');
const emotionalAnalysisChartElement = document
    .getElementById('emotionalAnalysisChart')
    .getContext('2d');
const sentimentAnalysisChartElement = document
    .getElementById('sentimentAnalysisChart')
    .getContext('2d');
const IPTCAnalysisChartElement = document
    .getElementById('IPTCAnalysisChart')
    .getContext('2d');

let behavioralAnalysisChart;
let emotionalAnalysisChart;
let sentimentAnalysisChart;
let IPTCAnalysisChart;

let finalImage;
let ssList = [];
let userSelectedInterests = [];
let secondaryLang;
let choosenSecondaryLanguage;
let globalScreenshots = [];

let translatedSummary;
let englishSummary;

let translatedBase64Wordcloud;
let englishBase64Wordcloud;

let behavioralAnalysisChartMaker = () => {
    behavioralAnalysisChart = new Chart(behavioralAnalysisChartElement, {
        type: 'pie',
        data: {
            labels: ['No data'],
            datasets: [
                {
                    label: 'percentage',
                    data: [100],
                    backgroundColor: COLOURS
                }
            ]
        },
        options: options
    });
};
let emotionalAnalysisChartMaker = () => {
    emotionalAnalysisChart = new Chart(emotionalAnalysisChartElement, {
        type: 'pie',
        data: {
            labels: ['No data'],
            datasets: [
                {
                    label: 'percentage',
                    data: [100],
                    backgroundColor: COLOURS
                }
            ]
        },
        options: options
    });
};
let sentimentAnalysisChartMaker = () => {
    sentimentAnalysisChart = new Chart(sentimentAnalysisChartElement, {
        type: 'pie',
        data: {
            labels: ['No data'],
            datasets: [
                {
                    label: 'percentage',
                    data: [100],
                    backgroundColor: ['rgb(73, 230, 141)', 'rgb(220, 53, 69)']
                }
            ]
        },
        options: options
    });
};
let IPTCAnalysisChartMaker = () => {
    IPTCAnalysisChart = new Chart(IPTCAnalysisChartElement, {
        type: 'pie',
        data: {
            labels: ['No data'],
            datasets: [
                {
                    label: 'percentage',
                    data: [100],
                    backgroundColor: COLOURS
                }
            ]
        },
        options: options
    });
};

behavioralAnalysisChartMaker();
emotionalAnalysisChartMaker();
sentimentAnalysisChartMaker();
IPTCAnalysisChartMaker();

const updateSummary = async (summaryText) => {
    summaryBox.insertAdjacentHTML(
        'afterbegin',
        `<hr style="height:2px; color:white">
    <h6 class="summary-heading">Summary</h6>`
    );
    summary.innerHTML = `${summaryText.substr(0, 256)}${
        summaryText.length > 256 ? `<span id="dots">...</span>` : ''
    }<span id="more">${summaryText.slice(256)}<span/>`;
    summaryText.length > 256
        ? changeDisplay(readMoreButton, 'block')
        : changeDisplay(readMoreButton, 'none');

    readMoreButton.addEventListener('click', readMoreHandler);
};

const updateBehavioralTraits = async (behaviourTraits) => {
    let behavioralDataArray = [];
    for (let [key, value] of Object.entries(behaviourTraits)) {
        behavioralDataArray.push({ key, value });
    }
    behavioralAnalysisChart.data.labels.pop();
    behavioralAnalysisChart.data.datasets[0].data.pop();
    behavioralDataArray.forEach((trait) => {
        behavioralAnalysisChart.data.labels.push(trait.key);
        behavioralAnalysisChart.data.datasets[0].data.push(trait.value);
    });
    behavioralAnalysisChart.update();
};
const updateEmotionalTraits = async (emotionalTraits) => {
    let emotionalDataArray = [];
    for (let [key, value] of Object.entries(emotionalTraits)) {
        emotionalDataArray.push({ key, value });
    }
    emotionalAnalysisChart.data.labels.pop();
    emotionalAnalysisChart.data.datasets[0].data.pop();
    emotionalDataArray.forEach((trait) => {
        emotionalAnalysisChart.data.labels.push(trait.key);
        emotionalAnalysisChart.data.datasets[0].data.push(trait.value);
    });
    emotionalAnalysisChart.update();
};
const updateIPTCTraits = async (iptcTraits) => {
    let iptcDataArray = [];
    for (let [key, value] of Object.entries(iptcTraits)) {
        iptcDataArray.push({ key, value });
    }
    IPTCAnalysisChart.data.labels.pop();
    IPTCAnalysisChart.data.datasets[0].data.pop();
    iptcDataArray.forEach((trait) => {
        IPTCAnalysisChart.data.labels.push(trait.key);
        IPTCAnalysisChart.data.datasets[0].data.push(trait.value);
    });
    IPTCAnalysisChart.update();
};
const updateSentiments = async (sentiments) => {
    sentimentAnalysisChart.data.labels.pop();
    sentimentAnalysisChart.data.datasets[0].data.pop();
    sentimentAnalysisChart.data.labels.push('Positive');
    sentimentAnalysisChart.data.labels.push('Negative');
    var negative = Math.abs(sentiments[0]);
    var positive = sentiments[1];
    var total = negative + positive;
    var negativePercentage = ((negative / total) * 100).toFixed(2);
    var positivePercentage = ((positive / total) * 100).toFixed(2);
    sentimentAnalysisChart.data.datasets[0].data.push(positivePercentage);
    sentimentAnalysisChart.data.datasets[0].data.push(negativePercentage);
    sentimentAnalysisChart.update();
};

const updateCommonTopics = async (commonTopics) => {
    let base =
        '<hr style="height:2px; color:white"> <h6 class="summary-heading">Relevant Topics:</h6><div>';
    commonTopics.forEach((value) => {
        base += `<span class="matched-tag">${value.replace(
            value[0],
            value[0].toUpperCase()
        )}</span>`;
    });
    base += '</div>';
    tagInterests.insertAdjacentHTML('afterbegin', base);
};

let currentTabURL;
let isYT;
const ytRegex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;




//Toggle Language
let translateText = false;
languageToggle.addEventListener('change', () => {
    translateText = !translateText;
    let renderedSummary = translateText ?  translatedSummary: englishSummary;
    let renderedBase64String = translateText ? translatedBase64Wordcloud : englishBase64Wordcloud;

    wordCloud.src = `data:image/png;base64, ${renderedBase64String}`;
    summary.innerHTML = `${renderedSummary.substr(0, 256)}${
        renderedSummary.length > 256 ? `<span id="dots">...</span>` : ''
    }<span id="more">${renderedSummary.slice(256)}<span/>`;
    renderedSummary.length > 256
        ? changeDisplay(readMoreButton, 'block')
        : changeDisplay(readMoreButton, 'none');

    readMoreButton.addEventListener('click', readMoreHandler);


});


const dataIfYT = () => {
    const ytIcon = `<img
        src="../../icons/youtube.svg"
        width="16px"
        height="16px"
        class="btnIcon"
    />`;
    insightsButton.innerHTML = `${ytIcon} Get Video Insights`;
    insightsButton.classList.remove('button-outline');
    changeDisplay(captureButton, 'none');
};

//@Func: Gets Global screenshots
const getGlobalScreenshots = () => {
    chrome.storage.local.get('globalScreenshots', (result) => {
        if (result.globalScreenshots?.length > 0) {
            globalScreenshots = result.globalScreenshots;
            ssList = result.globalScreenshots;

            changeDisplay(captureButton, 'none');
            changeDisplay(addImageButton, 'none');
            changeDisplay(insightsButton, 'none');
            closePreviewFn();
            addScreenshots();
        }
    });
    return;
};

// @Func: Checks if page is youtube or not
const checkIfYoutube = () => {
    isYT = currentTabURL.match(ytRegex);

    if (isYT) {
        dataIfYT();
    } else {
        getGlobalScreenshots();
    }
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentTabURL = tabs[0].url;
    checkIfYoutube();
});

//Video insights --- Get API results here
const getVideoInsights = async () => {
    const videoId = currentTabURL.match(ytRegex)[2];
    console.log(videoId);

    changeDisplay(popup, 'none');
    loading(true);

    try {
        const response = await fetch(`${BASE_URL}/analyse-youtube-video`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                videoId,
                userPreferences: userSelectedInterests
            })
        });

        const responseData = await response.json();
        const { data } = responseData;
        const {
            sentiments,
            emotionalTraits,
            behaviourTraits,
            iptcTraits,
            commonTopics,
            base64Wordcloud
        } = data;
        console.log(behaviourTraits);
        mainText.textContent = 'Sent!';
        loading(false);
        //Toggling Input and Result View
        changeDisplay(languageToggleWrapper, 'block');
        changeDisplay(popup, 'none');
        changeDisplay(resultpopup, 'block');
        if (base64Wordcloud) {
            englishBase64Wordcloud = base64Wordcloud;
            wordCloud.src = `data:image/png;base64, ${base64Wordcloud}`;
        }

        if (data && data.summary) {
            let summaryText = data.summary;
            englishSummary = summaryText;
            updateSummary(summaryText);
        }
        if (!isEmpty(behaviourTraits)) {
            updateBehavioralTraits(behaviourTraits);
        }
        if (!isEmpty(emotionalTraits)) {
            updateEmotionalTraits(emotionalTraits);
        }
        if (!isEmpty(iptcTraits)) {
            updateIPTCTraits(iptcTraits);
        }
        if (sentiments.length > 0) {
            updateSentiments(sentiments);
        }
        if (commonTopics.length > 0) {
            updateCommonTopics(commonTopics);
        }

        let translationLanguage = choosenSecondaryLanguage ? choosenSecondaryLanguage : "es";
        let translationResponse = await fetch(`${BASE_URL}/translate-response`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "translationLanguage": translationLanguage,
            "responseObject": { "data" : data }})
        })
        let translationResponseData = await translationResponse.json();
        console.log(translationResponseData)
        translatedBase64Wordcloud = translationResponseData.data.translatedBase64Wordcloud;
        translatedSummary = translationResponseData.data.translatedSummary;
    } catch (err) {
        loading(false);
        changeDisplay(popup, 'block');
        changeDisplay(resultpopup, 'none');
        changeDisplay(insightsButton, 'block');
        dataIfYT();
        mainText.textContent = 'Error!';
        console.log(err);
    }
};

//Page insights --- Get API results here
const getPageInsights = async () => {
    console.log(currentTabURL);

    changeDisplay(popup, 'none');
    loading(true);

    try {
        const response = await fetch(`${BASE_URL}/analyse-url`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: currentTabURL,
                userPreferences: userSelectedInterests
            })
        });

        const responseData = await response.json();
        const { data } = responseData;
        const {
            sentiments,
            emotionalTraits,
            behaviourTraits,
            iptcTraits,
            commonTopics,
            base64Wordcloud
        } = data;
        console.log(behaviourTraits);
        mainText.textContent = 'Sent!';
        loading(false);
        //Toggling Input and Result View
        changeDisplay(languageToggleWrapper, 'block');
        changeDisplay(popup, 'none');
        changeDisplay(resultpopup, 'block');
        if (base64Wordcloud) {
            wordCloud.src = `data:image/png;base64, ${base64Wordcloud}`;
        }

        if (data && data.summary) {
            let summaryText = data.summary;
            updateSummary(summaryText);
        }
        if (!isEmpty(behaviourTraits)) {
            updateBehavioralTraits(behaviourTraits);
        }
        if (!isEmpty(emotionalTraits)) {
            updateEmotionalTraits(emotionalTraits);
        }
        if (!isEmpty(iptcTraits)) {
            updateIPTCTraits(iptcTraits);
        }
        if (sentiments.length > 0) {
            updateSentiments(sentiments);
        }
        if (commonTopics.length > 0) {
            updateCommonTopics(commonTopics);
        }
        let translationLanguage = choosenSecondaryLanguage ? choosenSecondaryLanguage : "es";
        let translationResponse = await fetch(`${BASE_URL}/translate-response`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "translationLanguage": translationLanguage,
            "responseObject": { "data" : data }})
        })
        let translationResponseData = await translationResponse.json();
        console.log(translationResponseData)
        translatedBase64Wordcloud = translationResponseData.data.translatedBase64Wordcloud;
        translatedSummary = translationResponseData.data.translatedSummary;

    } catch (err) {
        loading(false);
        changeDisplay(popup, 'block');
        changeDisplay(resultpopup, 'none');
        mainText.textContent = 'Error!';
        console.log(err);
    }
};

//Page insights --- Get API results here
const getInsights = () => {
    if (isYT) {
        getVideoInsights();
    } else {
        getPageInsights();
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const readMoreHandler = () => {
    const dots = document.getElementById('dots');
    const moreText = document.getElementById('more');

    if (dots.style.display === 'none') {
        changeDisplay(dots, 'inline');
        readMoreButton.innerHTML = 'Read more';
        changeDisplay(moreText, 'none');
    } else {
        changeDisplay(dots, 'none');
        readMoreButton.innerHTML = 'Read less';
        changeDisplay(moreText, 'inline');
    }
};

const addImageBtn = `<li><img
src="../../icons/add-plus.svg"
class="add-image"
width="32px"
height="32px"
title="Add Screenshot"
/>
<li/>
`;

const magnifyingGlass = `<img
src="../../icons/magnifying-glass.svg"
width="16px"
height="16px"
class="btnIcon"
/>`;

const captureScreenshot = () => {
    changeDisplay(insightsButton, 'none');
    chrome.tabs.captureVisibleTab((ssUrl) => {
        const html = `
  <p class="crop-text">Crop and select the desired area. </p>
  <div class="preview-wrapper">
    <img src=${ssUrl} class="screenshot-preview" />
    <img
        src="../../icons/close-button.svg"
          width="24px"
          height="24px"
          class="close-preview"
          title="close"
    />
    <img
          src="../../icons/crop-tool.svg"
          width="28px"
        height="28px"
        class="crop-icon"
        title="crop"
    />
  </div>`;

        finalImage = ssUrl;

        //Show Preview
        changeDisplay(captureButton);
        changeDisplay(addImageButton, 'block');
        addImageButton.disabled = true;

        ssList.length + 1 > 1
            ? (checkButton.innerHTML = ` ${magnifyingGlass} Analyse Screenshots`)
            : (checkButton.innerHTML = ` ${magnifyingGlass} Analyse Screenshot`);

        popup.removeChild(mainText);

        popup.insertAdjacentHTML('afterbegin', html);
        const cropButton = document.querySelector('.crop-icon');

        //Crop Image
        cropButton.addEventListener('click', () => {
            const previewImage = document.querySelector('.screenshot-preview');
            const cropper = new Cropper(previewImage, {
                autoCropArea: 0.5,
                zoomOnWheel: false
            });

            cropButton.src = '../../icons/check-mark.svg';
            cropButton.title = 'Confirm Crop';

            cropButton.addEventListener('click', () => {
                finalImage = cropper
                    .getCroppedCanvas()
                    .toDataURL('image/png', 1);
                previewImage.src = finalImage;

                addImageButton.disabled = false;
                // changeDisplay(addImageButton);
                cropButton.src = '../../icons/crop-tool.svg';

                cropper.destroy();
            });
        });

        //Close Preview
        const closePreviewBtn = document.querySelector('.close-preview');
        closePreviewBtn.addEventListener('click', () => {
            closePreviewFn();
            if (ssList.length > 0) {
                addScreenshots();
            }
        });
    });
};

//Danger: Clear Chrome extension's storage
 //chrome.storage.local.remove(['userInterests', 'languages'], function () {
  //  const error = chrome.runtime.lastError;
   //  if (error) {
    //    console.error(error);
     //}
 //});

chrome.storage.local.get(['userInterests', 'languages'], (result) => {
    console.log(result);
    if (!result.userInterests || result.userInterests.length === 0) {
        getUserInterests();

        changeDisplay(popup, 'none');
        changeDisplay(interestsPopup, 'block');
        return;
    }
    userSelectedInterests = result.userInterests;
    choosenSecondaryLanguage = result.languages[1];

    console.log(result.languages);
});

selectLanguage.addEventListener('change', () => {
    secondaryLang = selectLanguage.value;
});

const getUserInterests = () => {
    const topics = [
        'advertising',
        'art',
        'banking',
        'business',
        'computer science',
        'crime',
        'education',
        'engineering',
        'entertainment',
        'fashion',
        'finance',
        'food',
        'footwear',
        'journalism',
        'music',
        'news',
        'philosophy',
        'photography',
        'science',
        'politics',
        'sports',
        'technology',
        'tourism'
    ];

    topics.forEach((value) => {
        const noSpaceVal = value.replace(' ', '');

        const interestChip = `
        <input
        class="interest-chip"
        type="checkbox"
        id=${noSpaceVal}
        value="${value}"
        />

        <label for=${noSpaceVal}>${value}</label>`;
        interestsPopup.insertAdjacentHTML('afterbegin', interestChip);
        const chip = document.querySelector(`#${noSpaceVal}`);
        chip.addEventListener('change', () => {
            if (userSelectedInterests.includes(chip.value)) {
                userSelectedInterests.splice(
                    userSelectedInterests.indexOf(chip.value),
                    1
                );
            } else {
                userSelectedInterests.push(chip.value);
            }
        });
    });
    interestsPopup.insertAdjacentHTML(
        'afterbegin',
        ' <p class="interest-heading">Select your interests</p>'
    );

    saveInterestsButton.addEventListener('click', () => {
        chrome.storage.local.set(
            { userInterests: userSelectedInterests },
            () => {
                console.log(userSelectedInterests);
            }
        );
        chrome.storage.local.set(
            { languages: ['English', secondaryLang] },
            () => {
                console.log(secondaryLang);
            }
        );

        changeDisplay(popup, 'block');
        changeDisplay(interestsPopup, 'none');
    });
};

captureButton.addEventListener('click', captureScreenshot);
insightsButton.addEventListener('click', getInsights);

//Send Image/s to backend
checkButton.addEventListener('click', () => {
    const finalExists = ssList.find((ss) => ss === finalImage);
    if (!finalExists) ssList.push(finalImage);
    analysePhotos(ssList);
});

//Send Request to Backend
const analysePhotos = async (images) => {
    screenshotListPreview.innerHTML = '';
    mainText.textContent = '';
    loading(true);

    try {
        const response = await fetch(`${BASE_URL}/analyse-photos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ images })
        });
        let responseData = await response.json();
        let { data } = responseData;
        let {
            sentiments,
            emotionalTraits,
            behaviourTraits,
            iptcTraits,
            base64Wordcloud
        } = data;
        console.log(behaviourTraits);
        mainText.textContent = 'Sent!';
        loading(false);
        //Toggling Input and Result View
        changeDisplay(languageToggleWrapper, 'none');
        changeDisplay(popup, 'none');
        changeDisplay(resultpopup, 'block');
        deleteAllScreenshots();
        if (base64Wordcloud) {
            wordCloud.src = `data:image/png;base64, ${base64Wordcloud}`;
        }

        if (!isEmpty(behaviourTraits)) {
            updateBehavioralTraits(behaviourTraits);
        }
        if (!isEmpty(emotionalTraits)) {
            updateEmotionalTraits(emotionalTraits);
        }
        if (!isEmpty(iptcTraits)) {
            updateIPTCTraits(iptcTraits);
        }
        if (sentiments.length > 0) {
            updateSentiments(sentiments);
        }

    } catch (err) {
        loading(false);
        changeDisplay(popup, 'block');
        changeDisplay(resultpopup, 'none');
        mainText.textContent = 'Error!';
        deleteAllScreenshots();
        console.log(err);
    }
};


//Close Preview
const closePreviewFn = () => {
    const previewWrapper = document.querySelector('.preview-wrapper');
    const cropText = document.querySelector('.crop-text');

    changeDisplay(addImageButton, 'none');
    if (previewWrapper && cropText) {
        popup.removeChild(previewWrapper);
        popup.removeChild(cropText);
    }

    if (ssList.length < 1) {
        backToInitialScreen();
    }

    popup.insertAdjacentElement('afterbegin', mainText);
};

//To Capture Image Screen
const captureButtonScreen = () => {
    screenshotListPreview.innerHTML = '';
    checkButton.style.display = 'none';
    mainText.textContent = 'Go to the desired area & capture screenshot';
    changeDisplay(captureButton);
};

//Back to Initial Screen
const backToInitialScreen = () => {
    screenshotListPreview.innerHTML = '';
    changeDisplay(checkButton, 'none');
    mainText.textContent = 'Select a way to get insights';
    changeDisplay(captureButton);
    changeDisplay(languageToggleWrapper, 'none');
    changeDisplay(insightsButton);
    changeDisplay(popup, 'block');
    changeDisplay(resultpopup, 'none');
};

const deleteAllScreenshots = () => {
    ssList.length = 0;
    globalScreenshots.length = 0;
    chrome.storage.local.remove('globalScreenshots', function () {
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
            return;
        }
    });
};

// Add more screenshots
const addScreenshots = () => {
    changeDisplay(checkButton);

    const deleteBtnHTML = `<img src="../../icons/trash-bin.svg" width="18px" height="18px" id="deleteScreenshots" title="Delete all screenshots"/>`;

    mainText.innerHTML = `Captured Screenshots ${deleteBtnHTML}`;

    const deleteAllScreenshotsButton =
        document.getElementById('deleteScreenshots');
    deleteAllScreenshotsButton.addEventListener('click', () => {
        deleteAllScreenshots();
        backToInitialScreen();
    });

    screenshotListPreview.innerHTML = '';
    ssList.forEach((ss, key) => {
        const listItem = document.createElement('li');
        listItem.className = `image-${key}`;
        listItem.innerHTML = `<img src=${ss} width="52px" height="52px"/>`;
        screenshotListPreview.appendChild(listItem);
    });

    ssList.length < 8 &&
        screenshotListPreview.insertAdjacentHTML('beforeend', addImageBtn);
    const addScreenshot = document.querySelector('.add-image');

    addScreenshot.addEventListener('click', captureButtonScreen);
};

// Add Image Button - Gives list of images with plus and Analyse Button
addImageButton.addEventListener('click', () => {
    ssList.push(finalImage);
    globalScreenshots = ssList;
    chrome.storage.local.set({ globalScreenshots }, () => {
        console.log(
            'Screenshot set for analysis of content on different websites.'
        );
    });

    changeDisplay(addImageButton, 'none');
    closePreviewFn();
    addScreenshots();
});

// @Func: Change display property of element
export const changeDisplay = (element, type) => {
    if (type) {
        element.style.display = type;
        return;
    }
    element.style.display =
        element.style.display === 'none'
            ? 'block'
            : element.style.display === 'block'
            ? 'none'
            : 'none';
    return;
};

startAgainButton.addEventListener('click', backToInitialScreen);

// Loading Function

export const loading = (status) => {
    if (status) {
        changeDisplay(loader, 'block');
        changeDisplay(checkButton);
        return;
    }

    changeDisplay(loader, 'none');
    closePreviewFn();
    return;
};

//if(!isEmpty(behaviourTraits)){
//    let behavioralDataArray = [];
//    for (let [key, value] of Object.entries(jsonResult.behaviourTraits)) {
//        console.log(`${key}: ${value}`);
//        behavioralDataArray.push({key, value})
//    }
//    console.log(JSON.stringify(behavioralDataArray,null,4));
//}
//console
