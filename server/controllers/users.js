const express = require('express')
//const router = express.Router()
const crypto = require('crypto')

const collectionUser = require('../models/User')
const {generateToken} = require('../utils/generateToken')
const collectionpasswords = require('../models/Passwords')
const sendMail = require('../utils/sentMail')

const userRegister = async (req, res) => {

    const { email, password, rpassword, fname, lname, phone, address } = req.body;

    try {

        if (password !== rpassword) {
            console.log('Password do not match')
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match. Please check again'
            });
        }

        const existingUser = await collectionUser.findOne({ email });
        if (existingUser) {
            console.log('Email already exists');
            return res.status(400).json({
                success: false,
                message: 'Email already exists. Please use a different email',
            });
        }   


        // const existingUsers = await collectionUser({email})


        // if(existingUsers){

        //     console.log('Email Already Exist')

        //     return res.status(401).json({
        //         success: false, message: 'Email Already Exist'
        //     })
        // }

        

        const users = {
            email, password, rpassword, fname, lname, phone, address
        }

        let user = await collectionUser.create(users)
        console.log(user)

        
    
        return res.json({ user: [] , success: true, message: 'SUCCESS'})

    }catch (error){

        console.error('Error adding Users:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
 }


 const userLogin = async (req, res) => {

    try {
    
    const {email, password} = req.body
    const getUser = await collectionUser.findOne({email})

    if(!getUser){

        console.log('User not found in Database')
        return res.status(400).json({success: false, message: 'User not found. Please register your account'})
    }

    if (getUser.password !== password) {
        console.log('Password is incorrect');
        return res.status(401).json({ success: false, message: 'Password is incorrect.'});
    }

    const token = generateToken(getUser)
    console.log('Token:', token)

    return res.status(200).json({ success: true, message: 'SUCCESS', token , user: { fname: getUser.fname, email: getUser.email } })

    }catch (error){

        console.log('Errors as shown', error)

        return res.status(500).json({
            success: false,
            message: 'An error Occurred'
        })
        
    }
 }


 const generatePasswords = async (req, res) => {


    const userID = req.userData.userId

    const passwordData = {
        
        user_id: userID,
        password: req.body.password,
        date: new Date()
    }
    
    try {

        const passDetails = await collectionpasswords.create(passwordData)

        console.log(passDetails)

        return res.status(200).json({
            success: true, message: 'Password Stored'
        })

    }catch (error){
        
        console.error(error)
        return res.status(500).json({
            success:'false', message:'An Error Occured'
        })
    }
 }


 const loadPassword = async (req , res) => {

    try {
        
        const userID = req.userData.userId
        const loadPass = await collectionpasswords.find({user_id: userID})

        console.log(loadPass)

        return res.status(200).json({
            success: 'true', message: 'The datas loaded', data: loadPass
        })


    }catch (error) {

        res.status(500).json({

            success: 'false', message:'Error Occured'
        })
    }

 }

    const passwordDelete = async (req, res) => {

        const passId  = req.params.id

        try {

            await collectionpasswords.findOneAndDelete({_id: passId})

            return res.status(200).json({
                success: 'true',
                message: 'Success'
            })
        }catch (error){

            res.status(500).json({
                success: 'false',
                message: 'Error Occured'
            })
        }
    }



const deleteUser = async (req, res) => {

    

    try{

        const userID = req.userData.userId

        await collectionUser.findByIdAndDelete(userID)

        return res.status(200).json({
            success: 'true', message: 'User Deleted'
        })

    }catch (error){
        
       
        res.status(500).json({
            success: 'false', message:'Error Ocuured'
        })
    }

}


    const resetPasswordRequest = async (req, res) => {


        try{ 

        const {email} = req.body

        const user = await collectionUser.findOne({email})

        if(!user) {

            res.status(400).json({
                sucess: 'false', message: 'Email not Found'
            })
        }

        const token = crypto.randomBytes(20).toString('hex')

        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000

        await user.save()
        console.log('User after saving token:', user);

        sendMail.sentMail(user.fname, email, token)

        return res.status(200).json({
            success: true, message:'SUCCESS'
        })


    }catch (error){
        
        console.error('Error occurred:', error);
        res.status(500).json({
            success: false , message: 'Error Occured'
        })
    }

    }


    // const updatePassword = async (req, res) => {

    //     try{

    //         const {token , newPassword} = req.body

    //         console.log('Received token:', token);
    //         console.log('Current timestamp:', Date.now());
    


    //         const user = await collectionUser.findOne({
    //             resetPasswordToken: token,
    //             resetPasswordExpires: { $gt: Date.now() } 
    //         });

    //         console.log('Found User:', user);

    //         if (!user) {
    //             return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    //         }


    //         user.password = newPassword
    //         user.resetPasswordToken =  undefined
    //         user.resetPasswordExpires = undefined;

    //         await user.save()
    //         console.log('User after updating password:', user);

    //         return res.status(200).json(
    //             { success: true, message: 'Password updated successfully' }
    //         )


    //     }catch (error) {

    //         console.error('Error occurred:', error);
    //         res.status(500).json({ success: false, message: 'Error occurred' });

    //     }
    // }

    const updatePassword = async (req, res) => {
        try {
            console.log('Request body:', req.body); 
    
            const { token, newPassword, rePassword } = req.body;
    
           
            console.log('Received token:', token);
            console.log('Current timestamp:', Date.now());
    
           
            const user = await collectionUser.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() } 
            });
    
            console.log('Found User:', user);
    
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid or expired token' });
            }
    
          
            user.password = newPassword;
            user.rpassword = rePassword
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
    
        
            await user.save();
            console.log('User after updating password:', user);
    
            return res.status(200).json({
                success: true, message: 'Password updated successfully'
            });
    
        } catch (error) {
            console.error('Error occurred during updatePassword:', error);
            return res.status(500).json({
                success: false, message: 'Error occurred during password update'
            });
        }
    };
    


 module.exports = { userLogin, userRegister, generatePasswords, loadPassword , passwordDelete, deleteUser, 
    resetPasswordRequest, updatePassword
  }
