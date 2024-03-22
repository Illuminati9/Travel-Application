require('dotenv').config()

const Admin = process.env.ADMIN_ROLE;
const User = process.env.USER_ROLE;
const Owner = process.env.OWNER_ROLE;
const Staff = process.env.STAFF_ROLE;

const Male = 'MALE';
const Female = 'FEMALE';
const Others  = 'OTHERS';

module.exports={Admin, User, Owner, Staff, Male, Female, Others}