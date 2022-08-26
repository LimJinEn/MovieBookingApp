const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function register(user){
  try{
    const result = await db.query(
      `INSERT INTO users 
      (name, password, email)
      VALUES 
      ("${user.name}", "${user.password}","${user.email}")`
    );
  
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
      message = result.insertId;
    }
  
    return message;
  }catch(err){
    return 'Error in creating user'
  }
}

async function login(user){
  console.log(user);
  try{
    const result = await db.query(
      `SELECT * FROM users WHERE email = "${user.email}" AND password = "${user.password}" LIMIT 1`
    );

    const found = result.length > 0? result[0].id: "Not Found";
  
    return found;
  }catch(err){
    return "Not Found"
  }
}

async function update(input, user){
  const result = await db.query(
    `UPDATE users 
    SET name="${input.name}", password="${input.password}", email="${input.email}"
    WHERE id = "${user.id}"` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}

async function getUser(user) {
  const rows = await db.query(
    `SELECT *
    FROM users WHERE id = ${user.id} LIMIT 1`
  );
  const data = helper.emptyOrRows(rows);

  return data[0];
}

module.exports = {
  register,
  login,
  update,
  getUser
}