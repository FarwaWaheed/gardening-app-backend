const User = require('../models/user');
/*
-Encrypt Password with bcrypt
-Add Access Token functionality(optional)
 */

    async function logIn(req,res){
        try{
            const{email, password} = req.body;
            const user = await User.findOne({email});
            if(user){
                console.log(user);
                if(user.password === password){
                    return res.status(200).json({
                        message: "User logged in successfully",
                        user : user,
                    })
                }
                else{
                    return res.status(200).json({
                        message: "The password is incorrect"
                    })
                }
            }
            else{
                return res.status(400).json({
                    message: "Please enter correct email"
                })
            }
        }
        catch(e){
            return res.json({
                message: e.message
            })
        }
    }
    async function signUp(req,res){
        try{
            const {email,name, password,role} = req.body;
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(409).json({
                    message:"User already exists with this email",
                });
            }
            const newUser = new User({
                email: email,
                name: name,
                password: password,
                role: role
            })
            //Saving the user in the database
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                user: newUser,
            })

        }
        catch (e) {
            return res.json({
                message: e.message
            });
        }
    }
    async function signOut(req,res){
        try{

        }
        catch(e){

        }
    }
    async function updateUser(req, res){
        try{
            const id = req.params.id;
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            return res.status(200).json({
                message: "User updated successfully"
            })
        }
        catch(e){
            res.json({
                message : e.message
            })
        }
    }

    async function getUserById(req, res) {
        const { id } = req.params;
        try {
          const user = await User.findById(id);
          if (!user) {
            return res.status(404).json({ message: "User not found." });
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: "Error fetching user", error: error.message });
        }
      };

      
      async function getAllUsers(req, res){
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: "Error fetching users", error: error.message });
        }
      };

      
      async function deleteUser(req, res){
        const { id } = req.params;
        try {
          const deletedUser = await User.findByIdAndDelete(id);
          if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
          }
          res.status(200).json({ message: "User deleted successfully." });
        } catch (error) {
          res.status(500).json({ message: "Error deleting user", error: error.message });
        }
      };
      
module.exports = { logIn, signUp, updateUser, getUserById, getAllUsers, deleteUser};