let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = {
            body: 'You successfully subscribed to our Notification service!',
            icon: '/src/images/icons/favicon-96x96.png',
            image: '/src/images/PandaTravelpinkblue.jpg',
            lang: 'de-DE',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/favicon-96x96.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Ok', icon: '/src/images/icons/favicon-96x96.png' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/favicon-96x96.png' },
            ]
        };

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }
}


function configurePushSubscription() {
    if(!('serviceWorker' in navigator)) {
        return
    }
    let swReg;
    navigator.serviceWorker.ready
        .then( sw => {
            swReg = sw;
            return sw.pushManager.getSubscription();
        })
        .then( sub => {
            if(sub === null) {
                let vapidPublicKey = 'BNeJM8v7Wcxz1mSJXBca9T3DdlMQ8cG1K4BUg86fmXkL343Zxw6Rlm-aAWF0KuSu69QfcHOJhxRmwoaiTMVzGZM';
                let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
                return swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey,
                });
            } else {

                sub.unsubscribe()
                .then( () => {
                    console.log('unsubscribed()', sub)
                })
    
            
            }
        })

        .then( newSub => {
            return fetch('http://localhost:3000/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
            .then( response => {
                if(response.ok) {
                    displayConfirmNotification();
                }
            })
        });
}



function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {

            //displayConfirmNotification();
            configurePushSubscription();
            
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}