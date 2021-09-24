const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task')

const router = express.Router();

router.use(authMiddleware);

//Get All
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user');

    return res.send({ projects })
  } catch (err) {
    return res.status(400).send({ error: "error loading projects" });
  }
});

//Get By Id
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('user');

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: "error loading project" });
  }
})

//Post
router.post('/', async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.userId });

    return res.send({ project });

  } catch (err) {
    return res.status(400).send({ error: "error creating new project" })
  }

});

//Update
router.put('/:projectId', async (req, res) => {
  res.send({ user: req.userId });
});

//Delete
router.delete('/:projectId', async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send()
  } catch (err) {
    return res.status(400).send({ error: "error deleting project" });
  }
});

module.exports = app => app.use('/projects', router)