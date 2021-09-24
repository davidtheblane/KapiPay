const mongoose = require('../database');
const bcrypt = require("bcrypt")

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    require: true,
  },
  tasks: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Task",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;