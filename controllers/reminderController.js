const express = require('express');
const Reminder = require('../models/reminder');

// Create a new reminder
const addReminder = async (req, res) => {
    const { userId, plantId } = req.params;
    const { taskType, date, notes } = req.body;

    try {
        const reminder = new Reminder({
            userId,
            plantId,
            taskType,
            date,
            notes
        });
        await reminder.save();
        res.status(201).json({ message: 'Reminder created', data: reminder });
    } catch (err) {
        res.status(500).json({ message: 'Error creating reminder', error: err.message });
    }
}

// Get reminders for a user
const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.params.userId }).populate('plantId', null, 'Plants');
        res.json({ data: reminders });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reminders', error: err.message });
    }
}

// Mark a reminder as completed
const updateReminder =  async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndUpdate(req.params.id, { isCompleted: true }, { new: true });
        res.json({ message: 'Reminder marked as complete', data: reminder });
    } catch (err) {
        res.status(500).json({ message: 'Error updating reminder', error: err.message });
    }
}

// Delete a reminder
const deleteReminder =  async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reminder deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting reminder', error: err.message });
    }
}

module.exports = {
    addReminder,
    getReminders,
    updateReminder,
    deleteReminder
}