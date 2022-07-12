
const { request } = require('express')
var Userdb = require('../model/model')





/// create and save New User ///

exports.create = (req,res) => {

   // validate request
   if(!req.body){
      res.status(400).send({message: 'Content cannot be empty.'})
      return
   }

   // new user
   const user = new Userdb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status
   })


   // save user in database
   user
      .save(user)
      .then(data=> {
         // res.send(data)
         res.redirect('/add_user')
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || 'An error occurred while processing create operation.'
         })
      })
}





/// Retrieve and return all users / retrieve and return a single user ///

exports.find = (req,res) => {

   if(req.query.id){
      const id = req.query.id

      Userdb.findById(id)
         .then(data =>{
            if(!data){
               res.status(404).send({message: `User with ID ${id} not found.`})
            }else{
               res.send(data)
            }
         })
         .catch(err => {
            res.status(500).send({message: `Error occured while retrieving User with ID ${id}.`})
         })

   }else{
      Userdb.find()
      .then(user => {
         res.send(user)
      })
      .catch(err => {
         res.status(500).send({message:err.message || 'Error occured while retrieving user client Information.'})
      })
   }
}





/// Update a new identified user by user ID ///

exports.update = (req,res) => {
   if(!req.body){
      return res
         .status(400)
         .send({message: 'Update information cannot be empty.'})
   }

   const id = req.params.id
   Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then(data => {
         if(!data){
            res.status(404).send({message:`Cannot update user with ${id}: User not found.`})
         } else {
            res.send(data)
         }
      }) 
      .catch(err => {
         res.status(500).send({message: 'Error: Update user information.'})
      })
}




/// Delete a user with specified user ID in the request///

exports.delete = (req,res) => {
   const id = req.params.id

   Userdb.findByIdAndDelete(id)
      .then(data => {
         if(!data){
            res.status(404).send({message: `Cannot delete with ID: ${id}. Information likely invalid.`})
         } else{
            res.send({message: 'User successfully deleted.'})
         }
      })
      .catch(err => {
         res.status(500).send({message: `Unable to delete User with ID: ${id}.`})
      })
}