module.exports = {
    getTickets(req,res,next) { 
        req.db.collection('tickets')
        .aggregate([
            {$sort:{_id: -1}},
            {$skip: ((parseInt(req.query.page)-1) * parseInt(req.query.elements))},
            {$limit : parseInt(req.query.elements) },
            {$lookup: {from: "users", localField: "created_by", foreignField: "_id", as: "creator"}}, 
            {$lookup: {from: "users", localField: "checked_by", foreignField: "_id", as: "checker"}}, 
            {$project: {_id: "$incidence_number", title:1, date_created:1, message:1, creator:"$creator.name", checker: "$checker.name" }}
        ])
        .toArray((error, ticket) => {
            if(error) return next(error);
            res.send(ticket);
        });
    },

    getTicketId(req,res,next) {
        req.db.collection('tickets')
        .aggregate([
            {$match: {_id: req.mongodb.ObjectID(req.params.id)}},
            {$lookup: {from: "users", localField: "created_by", foreignField: "_id", as: "creator"}}, 
            {$lookup: {from: "users", localField: "checked_by", foreignField: "_id", as: "checker"}}, 
            {$project: {_id: "$incidence_number", title:1, date_created:1, message:1, creator:"$creator.name", checker: "$checker.name" }}
        ])
        .toArray((error, ticket) => {
            if(error) return next(error);
            res.send(ticket);
        });
    },

    postTicket(req, res, next) {
        let newTicket = req.body;
        req.db.collection('tickets').insert(newTicket, (req.error, results => {
            if (req.error) return next(error);
            res.send(results);
        }))
    },

    putTicket(req, res, next) {
        req.db.collection('tickets')
        .update({_id: req.mongodb.ObjectID(req.params.id)}, 
        {$set: req.body},
        (error, results) => {
            if (req.error) return next(error);
            res.send(results);
        })
    },

    deleteTicket(req, res, next) {
        req.db.collection('tickets')
            .remove({_id: req.mongodb.ObjectID(req.params.id)}, (error, results) => {
                if(error) return next(error);
                res.send(results);
            })
    }
}


