const express = require("express");
const router = express.Router();
const {
    addReminder,
    getReminders,
    updateReminder,
    deleteReminder
} = require('../controllers/reminderController')

router.post('/addReminder/:userId/:plantId', addReminder);
router.get('/getReminders/:userId', getReminders);
router.put('/updateReminder/:id',updateReminder);
router.delete('/deleteReminder/:id', deleteReminder);

module.exports = router;
