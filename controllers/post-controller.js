const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const Joi = require('@hapi/joi')

const validateRegisterUser = (user) => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(4).max(40).required(),
        email: Joi.string().min(12).max(100).required().email(),
        password: Joi.string().min(6).max(100).required()
    })
    return JoiSchema.validate(user)
}

const validateLoginUser = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().min(12).max(100).required().email(),
        password: Joi.string().min(6).max(100).required()
    })
    return JoiSchema.validate(user)
}

const validatePost = (post) => {
    const JoiSchema = Joi.object({
        title: Joi.string().min(12).max(100).required(),
        description: Joi.string().min(20).max(1000).required(),
        author: Joi.string().min(4).max(40).required()
    })
    return JoiSchema.validate(post)
}

exports.registerPOST = async (req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) return res.json({ error: 'Please Fill all the Fields' })
    const { error } = validateRegisterUser(req.body)
    if(error) return res.json({ error: error.details[0].message })
    var user = await User.findOne({ email })
    if(user) return res.json({ error: 'User Already Exists' })
    user = await User.create({ username, email, password })
    res.redirect('/api/login')
}

exports.loginPOST = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.json({ error: 'Please Fill all the Fields' })
    const { error } = validateLoginUser(req.body)
    if(error) return res.json({ error: error.details[0].message })
    var user = await User.findOne({ email })
    if(!user) return res.json({ error: 'User not Found' })
    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({ error: 'Email or Password is Incorrect' })
    req.session.isAuth = true
    req.session.user = user
    res.redirect('/api/profile')
}

exports.logoutPOST = (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err
        else res.redirect('/api/login')
    })
}

exports.addPOST = async (req, res) => {
    const { title, description } = req.body
    if(!title || !description) return res.json({ error: 'Please Fill all the Fields' })
    const p = {
        title,
        description,
        author: req.session.user.email
    }
    const { error } = validatePost(p)
    if(error) return res.json({ error: error.details[0].message })
    const post = await Post.create(p)
    res.redirect('/api/show')
}