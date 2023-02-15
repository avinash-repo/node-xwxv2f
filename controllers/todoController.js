const { todoAdd } = require("../services/todoService");
 
exports.todo_add = async (req, res, next) => {
  const { user_id, title } = req.body;

console.log("Line8");
  todoAdd({ user_id,title })
    .then((result) => {
        console.log("Line11");
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
