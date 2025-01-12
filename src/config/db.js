const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://s29609:8Gnwn6smvITyvyOn@users.5fykp.mongodb.net/users?retryWrites=true&w=majority&appName=users')
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log('MongoDB Error', err);
    })
}

module.exports = connectDB;