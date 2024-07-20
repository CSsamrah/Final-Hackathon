const User=require('../models/Registration')


const createUser = async (data) => {
    try {
        const user = new User(data);
        await user.save();
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