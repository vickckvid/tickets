module.exports = {
    getUsers(req,res,next) {
        req.db.collection('users')
        .find({}, {sort: {_id: -1}})
        .toArray((error, users) => {
            if(error) return next(error);
            console.log('Sent!');
            res.send(users);
        })
    },

    getUserId(req,res,next) {
        req.db.collection('users')
        .find({_id: req.mongodb.ObjectID(req.params.id)}, {sort: {_id: -1}})
        .toArray((error, users) => {
            if(error) return next(error);
            var name1 = req.JSON.parse(users);
            console.log(name1.name);
            res.send(users);
        })
    },

    postUser(req, res, next) {
        let newUser = req.body;
        req.db.collection('users').insert(newUser, (req.error, results => {
            if (req.error) return next(error);
            res.send(results);
        }))
    },

    putUser(req, res, next) {
        req.db.collection('users')
        .update({_id: req.mongodb.ObjectID(req.params.id)}, 
        {$set: req.body},
        (error, results) => {
            if (req.error) return next(error);
            res.send(results);
        })
    },

    deleteUser(req, res, next) {
        req.db.collection('users')
            .remove({_id: req.mongodb.ObjectID(req.params.id)}, (error, results) => {
                if(error) return next(error);
                res.send(results);
            })
    }
}