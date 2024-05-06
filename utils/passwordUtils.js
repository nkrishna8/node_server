const {compare, genSalt, hash} = require('bcrypt');

const generatePasswordHash = async(password)=>{
const salt = await genSalt();
// console.log("SALT====>>>>",{salt});
const pwdHash = await hash(password,salt);
console.log(pwdHash,"<<=== pwdHashpwdHash");
return pwdHash;
}



const verifyPassword = async(password,pwdHash) =>{
    // console.log("hgggg");
return compare(password, pwdHash);
} 

// const pwdHash="$2b$10$F8hkWMM7cR9l/8cildOw6eAH/pwbTpDeCfBZC5z8Jfkcd72JR9sBy";

// generatePasswordHash("kop852");

// verifyPassword("kop852",pwdHash).then(x => console.log(x,"valueee"));

module.exports={generatePasswordHash,verifyPassword}