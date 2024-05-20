const User = require('../models/User')
const catchError = require('../utils/catchError')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAll = catchError(async(req, res) => {
	const user = await User.find()
	return res.json(user)
});

const create = catchError(async(req, res) => {
	const {Password, ...rest} = req.body;
	const hashPassword = await bcrypt.hash(Password, 10);
	const addUser = await User.create({...rest, Password: hashPassword})
	const mensage = `El usuario ${addUser.Names} se ha creado exitosamente`
	return res.status(201).json({
		message: mensage,
		user: addUser
	});
});


const loggin = catchError(async(req, res) => {
	const {Email, Password} = req.body;
	const user = await User.findOne({Email});
	if(!user) return res.status(401).json({message: "El usuario no existe"});
	const isValiPassword = await bcrypt.compare(Password, user.Password);
    if(!isValiPassword) return res.status(401).json({message: "La contraseña es incorrecta"});
	const token = jwt.sign(
		{user},
		process.env.TOKEN_SECRET,
		{expiresIn:"1d"}
	)
    return res.json({user, token})
})


const getOne = catchError(async(req, res) => {
	const {_id} = req.params;
	const user = await User.findById(_id);
	return res.json(user)
})

const update = catchError(async(req, res) => {
	const {Password, ...rest} = req.body;
	const {_id} = req.params;
	if(Password) {
		const hashPassword = await bcrypt.hash(Password, 10);
		rest.Password = hashPassword;
	}
	const updateUser = await User.findByIdAndUpdate(_id, rest, {new: true, runValidation: true})
	if(!updateUser) return res.status(404).json({message: "Usuario no encontrado"})
	return res.json(updateUser)
})


const remove = catchError(async(req, res) => {
	const {_id} = req.params;
	const removeUser = await User.findByIdAndDelete(_id);
	if(removeUser) return res.status(404).json({message: "El usuario no existe"});
	return res.json({message: "El usuario se ha eliminado con exito"})
})


module.exports = {
	getAll,
	create,
	loggin,
	getOne,
	update,
	remove
}