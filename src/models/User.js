const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    roles: {type: [String], default: ['user'], required: true},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        zipCode: {type: String, required: true, min: 3},
    }
})

const user = new mongoose.model("User", userSchema)

module.exports = user