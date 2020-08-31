
let Ticket = mongoose.model('Ticket', {
    title: String,
    created_by: mongoose.Schema.Types.ObjectId,
    checked_by: mongoose.Schema.Types.ObjectId,
    date_created: Date,
    incidence_number: Number,
    message: String
});


let ticket1 = new Ticket({
    title: 'Otro',
    created_by: '5f3cd635b7391766ac2dd4c4',
    checked_by: null,
    incidence_number: 11, 
    message: 'No se que pasa'
})

ticket1.save((err, res) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('Saved: ', res);
    }
})
