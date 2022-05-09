/* ============================================================

Hello ;)
I made this little extension to help testers in my company.

But it can help you as well, so I make it public :P

The cookie's gif comes from
https://timeiseverlasting.tumblr.com/post/53348458183

Enjoy <3

============================================================ */

const gifPath = 'https://i.imgur.com/VFsCYF2.gif';

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

    const template = () => (`
    <div id="cookie-dance-wrapper" style="display: flex; position: fixed; top: 60vh; height: 30vh;">
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
            </div>
        </div>
    </div>
    `);

    const fragment = document.createDocumentFragment();
    const parser = new DOMParser();
    const cookieGif = parser.parseFromString(template(), 'text/html');
    const els = cookieGif.documentElement.querySelector('#cookie-dance-wrapper');
    fragment.appendChild(els);
    document.body.appendChild(fragment);
}