const express = require("express");
const router = express.Router();
const Actions = require("../data/models/actionModel");
const Projects = require("../data/models/projectModel");

router.get("/", async (req, res) => {
  try {
    let actions = await Actions.getActions();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let action = await Actions.getAction(req.params.id);
    if (!action) {
      res.status(404).json({
        error: "Can't find an action."
      });
      return;
    }
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.description || !req.body.notes || !req.body.projectId) {
    res.status(400).json({
      error: "Please provide description, notes, and projectId."
    });
    return;
  }

  let project = await Projects.getProject(req.body.projectId);
  if (!project) {
    res.status(404).json({
      error: "Please provide a valid project ID."
    });
    return;
  }

  try {
    let createdAction = await Actions.addAction(req.body);
    res.status(201).json(createdAction);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
