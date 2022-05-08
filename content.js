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
    // Create main div element
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'top';
    div.style.position = 'fixed';
    div.style.top = '60vh';
    div.style.height = '10vh;';

    // Create image tag
    const img = document.createElement('img');
    img.src = gifPath;
    div.append(img);

    // Create the bubble dialogue element
    const bubbleClipPath = '8% 0%, 100% 0%, 100% 100%, 8% 100%, 8% 75%, 0% 70%, 8% 65%';
    const color = '#1E38A0';
    const paragraph_wrapper = document.createElement('div');
    paragraph_wrapper.style.padding = '0.2em';
    paragraph_wrapper.style.background = color;
    paragraph_wrapper.style.height = 'fit-content';
    paragraph_wrapper.style.clipPath = 'polygon(' + bubbleClipPath + ')';
    const paragraph = document.createElement('p');
    paragraph.style.padding = '1em 3em';
    paragraph.style.height = '100%';
    paragraph.style.width = '100%';
    paragraph.style.margin = '0';
    paragraph.style.background = '#ffffff';
    paragraph.style.color = color;
    paragraph.style.clipPath = 'polygon(' + bubbleClipPath + ')';
    paragraph.innerHTML = '<strong>Cookies are weird :/</strong><br/><br/>List of duplicated cookies:<br/>';
    duplicates.forEach(el => {
        paragraph.innerHTML += '● ' + el + '<br/>';
    });
    paragraph_wrapper.append(paragraph);
    div.append(paragraph_wrapper);

    // Then append cookie element to body
    document.body.append(div);
}