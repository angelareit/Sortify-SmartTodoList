const { Pool } = require("pg");
const categorizeTasks = require("../../public/scripts/categorizeTask.js");
//create a new pool for the database
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});

// Add new task to database
const addTasks = function (reqBody) {
  //check if the category id is given else call categorize
  const cat_id = reqBody.cat_id;
  if (!cat_id) {
    // categorize the task if cat_id is not provided
    cat_id = categorizeTasks(reqBody.title);
  }
  // Query the database
  const query = `
	INSERT INTO tasks (user_id, cat_id, priority,title, task_due,)
  	VALUES ($1, $2, $3, $4, $5)
  	RETURNING *;`;
  const values = [
    reqBody.user_id,
    reqBody.cat_id,
    reqBody.user_id,
    reqBody.priority,
    reqBody.title,
    reqBody.task_due,
  ];
  return pool
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

module.exports = addTasks;
