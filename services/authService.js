const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  const { email, password } = params;
  const hashedPassword = md5(password.toString());
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", {
      replacements: [email, hashedPassword],
      type: db.QueryTypes.SELECT,
    }).then((result) => {  
      if (result.length > 0) {
        //resolve(result); 
       console.log("line21 success ",result.length);
       const token = jwt.sign({ data: result }, "secret");
          resolve({
            message: "Logged in successfully",
            data: result,
            token,
          });
      }else{
        reject(result); 
        console.log("line24 fail ",result.length);
      }
    })
  });
};

exports.registerUser = async (params) => {
  const { error } = registerValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, email, password } = params;
  const hashedPassword = md5(password.toString());

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email FROM users WHERE email = ?`,
      {
        replacements: [email],
        type: db.QueryTypes.SELECT,
      }).then((result) => {   
        console.log("line50 fifty ",result);
        if (result.length > 0) {
          reject({
            message: "Email address is in use, please try a different one",
            statusCode: 400,
          });
        } else if (result.length === 0) {
          console.log("line57 ",result);
          db.query("INSERT INTO users (full_name, email, password) VALUES (?,?,?)",
            {
              replacements: [fullName, email, hashedPassword],
              type: db.QueryTypes.INSERT,
            }).then((result) => {    
              console.log("line63 ",result);       
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
            }
          );
        }
      }
    );
  });
};
