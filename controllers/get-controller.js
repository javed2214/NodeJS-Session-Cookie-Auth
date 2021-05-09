const User = require('../models/UserModel')
const Post = require('../models/PostModel')

exports.registerGET = (req, res) => {
    res.render('register')
}

exports.loginGET = (req, res) => {
    res.render('login')
}

exports.profileGET = (req, res) => {
    var user = req.session.user.username
    user = user.charAt(0).toUpperCase() + user.slice(1)
    res.render('profile', { user: user })
}

exports.addGET = (req, res) => {
    res.render('add')
}

exports.showGET = async (req, res) => {
    const post = await Post.find()
    res.render('show', { post: post, author: req.session.user.email })
}

exports.deleteGET = async (req, res) => {
    const id = req.params.id
    const post = Post.findById(id)
    if(!post) return res.json({ error: 'Invalid Post' })
    const p = await Post.findByIdAndRemove(id)
    res.redirect('/api/show')
}