const item = require('../models/item');

exports.isGuest = (req, res, next)=>{
    if (!req.session.user) {
        return next();
      } else {
        req.flash("error", "You are already logged in");
        return res.redirect("/users/profile");
      }
};

exports.isLoggedin = (req, res, next)=>{
    if (req.session.user) {
        return next();
      } else {
        req.flash("error", "You need to login first");
        return res.redirect("/users/login");
      }
};

exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    item.findById(id)
    .then(story=>{
        if(story) {
            if(story.author == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};