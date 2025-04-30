const express = require("express");
const router = express.Router();
const {
    addReminder,
    getReminders,
    updateReminder,
    deleteReminder
} = require('../controllers/reminderController')

router.post('/:userId/:plantId', addReminder);
router.get('/:userId', getReminders);
router.put('/complete/:id',updateReminder);
router.delete('/:id', deleteReminder);

module.exports = router;
