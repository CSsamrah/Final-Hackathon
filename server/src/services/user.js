const User=require('../models/Registration')
const {createStudent}=require('../services/studentServices')
const {createTeacher}=require('../services/teacherService')

console.log('createStudent:', createStudent); // This should log the function definition
console.log('createTeacher:', createTeacher);


const createUser = async (data) => {
    try {    
        const user = new User(data);
        await user.save();

        // Create the corresponding student or teacher document based on the role
        if (data.role === 'student') {
            await createStudent(user._id, data.name, data.class);
        } else if (data.role === 'teacher') {
            await createTeacher(user._id, data.name, data.class, data.email);
        } else {
            throw new Error('Invalid role');
        }

        return user;
    } catch (error) {
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports={
    createUser,findUserByEmail
}