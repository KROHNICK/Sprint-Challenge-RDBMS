const db = require("../db");

const getProjects = () => {
  return db("projects");
};

const addProject = project => {
  return db("projects").insert(project);
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
  return project;
};

const updateProject = (id, project) => {
  return db("projects")
    .where({ id })
    .update(project);
};

const deleteProject = id => {
  return db("projects")
    .where({ id })
    .del();
};

module.exports = {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject
};
