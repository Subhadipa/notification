let express = require("express");
let router = express.Router();

const notificationController = require("../../Controller/notification")
router.post("/send-notification", notificationController.sendNotification)
module.exports = router;