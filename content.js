/* ============================================================

Hello ;)
I made this little extension to help testers in my company.
But it can help you as well, so I make it public :P

Cookie gif source:
https://timeiseverlasting.tumblr.com/post/53348458183

Eggplant gif source:
https://gfycat.com/fr/disguisedsparklingheterodontosaurus

Enjoy <3

Imgur urls:
Cookie: https://i.imgur.com/VFsCYF2.gif
Eggplant: https://i.imgur.com/wyHCUcC.gif

============================================================ */

const storageLocal = chrome.storage || storage || null;
const allowedTypes = [
    'cookie',
    'eggplant'
];

// Refresh animation when changing option
storageLocal.onChanged.addListener(function (changes) {
    if (changes.cookieDanceType) {
        printAnimation(changes.cookieDanceType.newValue || 'cookie');
    }

    if (changes.cookieDanceDisabled) {
        if (changes.cookieDanceDisabled?.newValue === 'true') {
            removeAnimation();
        }
        else {
            storageLocal.sync.get(['cookieDanceType'], function(result) {
                printAnimation(result.cookieDanceType || 'cookie');
            });
        }
    }

})

storageLocal.sync.get(['cookieDanceType', 'cookieDanceDisabled', 'cookieDanceWhitelist'], function(result) {
    const whitelist = result.cookieDanceWhitelist.split(',').map(e => e.trim()); // Array of whitelisted websites
    const isWhitelisted =
        whitelist.length === 0 || // If no whitelist has been set, then allow it everywhere
        whitelist.filter(e => {
            const regex = new RegExp('.*' + e + '$');
            return regex.test(location.host);
        }).length > 0;

    if (isWhitelisted && result.cookieDanceDisabled !== 'true') {
        printAnimation(result.cookieDanceType || 'cookie');
    }
});


function removeAnimation() {
    const cookieElement = document.querySelector('#cookie-dance-wrapper');
    if (cookieElement !== null) {
        cookieElement.remove();
    }
}

function printAnimation(animationType) {
    if (!allowedTypes.includes(animationType)) {
        return;
    }

    removeAnimation();

    // Variables definition
    let gifPath = 'https://i.imgur.com/VFsCYF2.gif'; // Cookie by default
    if (animationType === 'eggplant') {
        gifPath = "https://i.imgur.com/wyHCUcC.gif";
    }
    const cookies = [];
    const duplicates = [];

    // Fetch all cookies and check for duplicates
    document.cookie.replace(/\s/g, "").split(';').forEach(cookie => {
        const name = cookie.split('=')[0];
        cookies.includes(name) ? duplicates.push(name) : cookies.push(name);
    });

    // If there is duplicates, then show el cookie dance
    if (duplicates.length > 0) {
        const bubbleClipPath = 'polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 8% 75%, 0% 70%, 8% 65%)';
        const color = '#1E38A0';

        const template = `
        <div id="cookie-dance-wrapper" style="display: flex; position: fixed; top: 60vh; height: 30vh; z-index: 9999999;">
            <img src="${gifPath}" alt="cookie gif">
            <div style="padding: 0.2em; background: ${color}; height: fit-content; clip-path: ${bubbleClipPath}">
                <div style="background: #ffffff; padding: 1em 3em; margin: 0; height: 100%; width: 100%; color: ${color}; clip-path: ${bubbleClipPath};">
                    <p style="font-weight: bold;">
                        Cookies are buggy :/
                    </p>
                    <div style="padding: 0.2em;">
                        <span>List of duplicated cookies:</span>
                        <ul>
                            ${duplicates.map(function (el) {
            return "<li>" + el + "</li>"
        }).join("")}
                        </ul>
                    </div>
                    <button id="cookie-dance-wrapper--delete-cookies" class="btn btn-primary btn-large">Delete all cookies</button>
                </div>
            </div>
        </div>
        `;

        const fragment = document.createDocumentFragment();
        const parser = new DOMParser();
        const cookieGif = parser.parseFromString(template, 'text/html');
        const els = cookieGif.documentElement.querySelector('#cookie-dance-wrapper');
        fragment.appendChild(els);
        document.body.appendChild(fragment);

        // Add event if clicked on delete cookies button
        document.querySelector('#cookie-dance-wrapper--delete-cookies').addEventListener('click', () => {
            deleteCookies();
        });
    }
}

function deleteCookies() {
    const runtime = chrome.runtime || runtime || null;
    let domain = window.location.host.split('.').reverse();
    domain = '.' + domain[1] + '.' + domain[0];

    runtime.sendMessage({action: "deleteCookies", options: {
        domain: domain
    }}, function () {
        window.location.reload();
    });
}