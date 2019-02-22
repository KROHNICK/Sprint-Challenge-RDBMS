const db = require("../db");

const getActions = () => {
  return db
    .select(
      "actions.id as ActionId",
      "actions.name as Action",
      "projects.id as ProjectId",
      "projects.name as Project"
    )
    .from("actions")
    .innerJoin("projects", "projects.id", "actions.projectId");
};

const getAction = id => {
  return db("actions")
    .where({ id })
    .first();
};

const addAction = action => {
  return db("actions").insert(action);
};

const updateAction = (id, action) => {
  return db("actions")
    .where({ id })
    .update(action);
};

const deleteAction = id => {
  return db("actions")
    .where({ id })
    .del();
};

module.exports = {
  getActions,
  getAction,
  addAction,
  updateAction,
  deleteAction
};
