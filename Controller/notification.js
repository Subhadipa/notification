const admin = require('firebase-admin');

const serviceAccount = require('../notification-buildbeta-6ec4284e42ec.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (req, res) => {
    const { fcmToken, title, body } = req.body;
    try {
        const message = {
            token: fcmToken,
            notification: {
                title: title || 'Default Title',
                body: body || 'Default Body',
            },
        };

        const notificationResponse = await admin.messaging().send(message);
        if (notificationResponse) {
            return res.status(200).send({ status: true, message: "Notification sent successfully!", data: notificationResponse });
        } else {
            return res.status(400).send({ status: false, message: "Can't send notification!" })
        }
    } catch (error) {
        //console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }


}

module.exports = { sendNotification }