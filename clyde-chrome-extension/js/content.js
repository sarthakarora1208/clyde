// const getTabURL = () => {
//     chrome.runtime.sendMessage(
//         {
//             message: 'checkURL',
//             url: URL
//         },
//         (res) => {
//             console.log(res);
//         }
//     );
// };

const URL = window.location.toString();

chrome.runtime.sendMessage(
    {
        message: 'checkURL',
        URL
    },
    (res) => {
        console.log('coolio');
        console.log(res);
    }
);

chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log(req);
});
