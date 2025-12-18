const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed',
      });
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing!',
      data: subscriber,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};