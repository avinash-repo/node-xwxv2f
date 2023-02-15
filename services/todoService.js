// const { updateUserValidation } = require("../middleware/validation");
const db = require("../database/db");
const date = require("date-and-time");
// const md5 = require("md5");
console.log("Line4 services");
exports.todoAdd = async (params) => {
  //   const { error } = updateUserValidation(params);
  //   if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { user_id, title } = params;
  //var dt = new Date();
  //const edate =  dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

  const now = new Date();
  const edate = date.format(now, "YYYY-MM-DD HH:mm:ss");

  // const edate = new Date("2022-03-25");
  //   const hashedPassword = md5(password.toString());
  console.log("Line11");
  return new Promise((resolve, reject) => {
    console.log("Line13");
    db.query("INSERT INTO todo (date,user_id,title) VALUES (?,?,?)", {
      replacements: [edate, user_id, title],
      type: db.QueryTypes.INSERT,
    }).then((result) => {
      console.log("line63 ", result);
      if (result) {
        reject({
          message: "Something went wrong, please try again",
          statusCode: 400,
          data: result,
        });
      } else {
        const token = jwt.sign({ data: result }, "secret");
        resolve({
          data: result,
          message: "You have successfully registered.",
          token: token,
          statusCode: 200,
        });
      }
    });
  });
};
