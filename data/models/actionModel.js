const db = require("../db");

const getActions = async () => {
  let actions = await db("actions");
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].completed === 0) {
      actions[i].completed = false;
    } else {
      actions[i].completed = true;
    }
  }
  return actions;
};

const getAction = async id => {
  let action = await db
    .select(
      "actions.id as id",
      "projects.id as projectId",
      "projects.name as project",
      "actions.description as description",
      "actions.notes as notes",
      "actions.completed as completed"
    )
    .from("actions")
    .where({ "actions.id": id })
    .innerJoin("projects", "actions.projectId", "projects.id")
    .first();
  if (!action) {
    return null;
  }

  if (action.completed === 0) {
    action.completed = false;
  } else {
    action.completed = true;
  }

  return action;
};

const addAction = async action => {
  let newAction = {
    ...action,
    completed: false
  };
  let createdActionId = await db("actions").insert(newAction);
  let createdAction = await getAction(createdActionId[0]);
  return createdAction;
};

module.exports = {
  getActions,
  getAction,
  addAction
};
