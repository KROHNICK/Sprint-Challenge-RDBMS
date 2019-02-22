const db = require("../db");

const getProjects = async () => {
  let projects = await db("projects");
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].completed === 0) {
      projects[i].completed = false;
    } else {
      projects[i].completed = true;
    }
  }
  return projects;
};

const getProject = async id => {
  let project = await db("projects")
    .where({ id })
    .first();
  if (!project) {
    return null;
  }
  let actions = await db("actions").where({ projectId: id });
  project.actions = actions;
  if (project.completed === 0) {
    project.completed = false;
  } else {
    project.completed = true;
  }
  return project;
};

const addProject = async project => {
  let newProject = {
    ...project,
    completed: false
  };
  let createdProjectId = await db("projects").insert(newProject);
  let createdProject = await get(createdProjectId[0]);
  return createdProject;
};

module.exports = {
  getProjects,
  getProject,
  addProject
};
