const User = require('../models/user');
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
/*
-Encrypt Password with bcrypt
-Add Access Token functionality(optional)
 */

    async function logIn(req,res){
            const { email, password } = req.body;
            try {
                const user = await User.findOne({ email });
                if (!user) return res.status(404).json({ message: "User not found" });

                const isMatch = await bcrypt.compare(password, user.password);
                console.log(password);
                console.log(user.password);
                if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

                const token = generateToken(user._id);
                console.log(token); 
                res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        
    }
    
    
    async function signUp(req,res){
          const { name, email, password, role } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "Email already registered" });

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            });
            await newUser.save();

            const token = generateToken(newUser._id);
            console.log(token);
            res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email , role: newUser.role } });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    
    async function updateUser(req, res){
        try{
            const id = req.params.id;
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            
            if (!updatedUser) {
              return res.status(404).json({ message: "User not found" });
            }
            
            return res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            })
        }
        catch (e) {
          res.status(500).json({
            message: "Error updating user",
            error: e.message,
          });
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