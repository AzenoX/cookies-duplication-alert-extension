const checked_disabled = document.querySelector('input[name="disabled"]');
const animation_types = document.querySelectorAll('input[name="gif_type"]');

const storageLocal = chrome.storage || storage || null;

const allowedTypes = [
    'cookie',
    'eggplant'
];

if (storageLocal) {
    // Init checkboxes state
    storageLocal.sync.get(['cookieDanceType', 'cookieDanceDisabled'], function(result) {
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

    checked_disabled.addEventListener('change', () => {
        if (checked_disabled.checked) {
            storageLocal.sync.set({cookieDanceDisabled: 'true'});
        }
        else {
            storageLocal.sync.set({cookieDanceDisabled: 'false'});
        }
    });
}