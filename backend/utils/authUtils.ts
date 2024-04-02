import bcrypt from "bcrypt";

//Hashes the password
async function hashed(password:any, num:any) {
  try {
    const hashed_password = await bcrypt.hash(password, num);
    return hashed_password;
  } catch (err) {
    console.log(err);
  }
}
//Compares password with hashed password
async function comparePassword(password:any, hashed:any) {
  return bcrypt.compare(password, hashed);
}

export { hashed, comparePassword };
