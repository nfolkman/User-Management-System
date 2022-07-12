// require neccesary modules
const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')


//// ROUTES ////
// callbacks separated for future maintenance in '../services/render.js' file

/**
 * @description Root Route
 * @method GET /
 */
route.get('/',services.homeRoutes)


/**
 * @description Add User Route
 * @method GET /add_user
 */
route.get('/add_user', services.add_user)


/**
 * @description Update User Route
 * @method GET /update_user
 */
route.get('/update_user', services.update_user)



///////// API Routes ///////////

route.post('/api/users', controller.create)

route.get('/api/users', controller.find)

// when this method is called, must specify ID to complete request
route.put('/api/users/:id', controller.update)

// when this method is called, must specify ID to complete request
route.delete('/api/users/:id', controller.delete)




module.exports = route 