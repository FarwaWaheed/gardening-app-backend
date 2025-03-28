const User = require('../models/user');

    async function signIn(req,res){

    }
    async function signUp(req,res){
        try{
            const {email,name, password,role} = req.body;
            if(await User.findOne({email:email})) {
                res.status(409).json({
                    message:"User already exists with this email",
                });
            }
            const user = new User({
                email: email,
                name: name,
                password: password,
                role: role
            })
            //Saving the user in the database
            await user.save();

        }
        catch (e) {

        }
    }
    async function updateUser(req, res){

    }
module.exports = { signIn, signUp, updateUser };