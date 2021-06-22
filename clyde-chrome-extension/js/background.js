chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.message === 'checkURL') {
        console.log(req.URL);
    }

    res({ message: 'checked' });
});
