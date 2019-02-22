const express = require("express");
const router = express.Router();
const Projects = require("../data/models/projectModel");

router.get("/", async (req, res) => {
  try {
    let projects = await Projects.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let project = await Projects.getProject(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        error: "Can't find the project."
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      error: "Please provide a name and description."
    });
    return;
  }

  try {
    let createdProject = await Projects.addProject(req.body);
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
