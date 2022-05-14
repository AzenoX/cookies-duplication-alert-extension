const runtime = chrome.runtime || runtime || null;

if (runtime) {
    runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "deleteCookies") {
            const cookies = chrome.cookies || cookies;

            cookies.getAll({domain: request.options.domain}, function (arrayOfCookies) {
                for (let i in arrayOfCookies) {
                    const cookie = arrayOfCookies[i];
                    const domain = (cookie.domain[0] === '.' ? cookie.domain.substring(1) : cookie.domain);
                    const url = "http" + (cookie.secure ? "s" : "") + "://" + domain + cookie.path;

                    cookies.remove({"url": url, "name": cookie.name});
                }
            });
        }

        sendResponse();
    });
}