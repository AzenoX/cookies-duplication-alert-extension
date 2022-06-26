const checked_disabled = document.querySelector('input[name="disabled"]');
const animation_types = document.querySelectorAll('input[name="gif_type"]');
const whitelist = document.querySelector('input[name="whitelist"]');

const storageLocal = chrome.storage || storage || null;
const runtimeBrowser = chrome.runtime || runtime || null;

const allowedTypes = [
    'cookie',
    'eggplant'
];

if (storageLocal) {
    // Init checkboxes state
    storageLocal.sync.get(['cookieDanceType', 'cookieDanceDisabled', 'cookieDanceWhitelist'], function(result) {
        if (result.cookieDanceDisabled === 'true') {
            checked_disabled.checked = true;
        }
        else {
            checked_disabled.checked = false;
        }

        if (allowedTypes.includes(result.cookieDanceType)) {
            switch (result.cookieDanceType) {
                case 'eggplant':
                    [...animation_types].filter(el => el.value === 'eggplant')[0].checked = true;
                    break;
                default:
                    [...animation_types].filter(el => el.value === 'cookie')[0].checked = true;
                    break;
            }
        }

        whitelist.value = result.cookieDanceWhitelist || '';
    });

    // Checkboxes events
    animation_types.forEach(el => {
        el.addEventListener('change', (e) => {
            const animation_type = document.querySelector('input[name="gif_type"]:checked').value;
            if (allowedTypes.includes(animation_type)) {
                storageLocal.sync.set({cookieDanceType: animation_type});
            }
        });
    });

    whitelist.addEventListener('keyup', (e) => {
        storageLocal.sync.set({cookieDanceWhitelist: e.target.value || ''});
    });

    checked_disabled.addEventListener('change', () => {
        if (checked_disabled.checked) {
            storageLocal.sync.set({cookieDanceDisabled: 'true'});
        }
        else {
            storageLocal.sync.set({cookieDanceDisabled: 'false'});
        }
    });
}


// Init app version placeholder
document.querySelector('#app_version').textContent = runtimeBrowser.getManifest().version;