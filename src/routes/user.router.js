const { getAll, create, loggin, getOne, update, remove } = require('../controllers/user.controllers');
const express = require('express');

const routerUser = express.Router();

routerUser.route('/')
	.get(getAll)
	.post(create)

routerUser.route('/login')
    .post(loggin)

routerUser.route('/:_id')
    .get(getOne)
	.put(update)
	.delete(remove)
module.exports = routerUser;