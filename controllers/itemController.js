const model = require('../models/item');

exports.index = (req, res, next)=>{
    let categories = [];
    model.distinct("category", function(error, results){
        categories = results;
    });
    model.find()
    .then(items=>res.render('./item/index', {items, categories}))
    .catch(err=>next(err));
    
};

exports.new = (req, res) => {
    res.render('./item/new');
};

exports.create = (req, res, next)=>{
    let item = new model(req.body);
    item.author = req.session.user;
    item.save()
    .then(item=>res.redirect('/items'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);
            res.redirect('back');
        } else{
            next(err);
        }
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    
    model.findById(id).populate('author', 'firstName lastName')
    .then(item=>{
        if(item) {
            return res.render('./item/show', {item});
        } else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    
    model.findById(id)
    .then(item=>{
        if(item) {
            return res.render('./item/edit', {item});
        } else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let item = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
    .then(item=>{
        if(item) {
            res.redirect('/items/'+id);
        } else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('back');
        }else{
            next(err);
        }
    });
};


exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(item=>{
        if(item) {
            res.redirect('/items');
        } else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};