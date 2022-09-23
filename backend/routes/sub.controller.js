sendNotification: () => {
    webpush.setVapidDetails('mailto:Neslihan.Kilic@Student.HTW-Berlin.de', publicVapidKey, privateVapidKey);
    const payload = JSON.stringify({
        title: 'New Push Notification',
        content: 'New data in database!',
        openUrl: '/help',
        openUrl: '/archiv'
    });
    webpush.sendNotification(pushSubscription,payload)
        .catch(err => console.error(err));
    console.log('push notification sent');
}