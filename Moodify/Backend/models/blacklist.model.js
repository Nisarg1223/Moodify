const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'token is required for blacklisting'],
      unique: [true, 'token must be unique']
    }
  },
  {
    timestamps: true
  }
);

const blacklistModel = mongoose.model('blacklist',blacklistSchema);

module.exports = blacklistModel;