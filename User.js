const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minLength: 5,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        reg: 'User'
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
});

userSchema.methods.sayHi = function() {
    console.log(`Hi. My name is ${this.name}`);
}

userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, "i") });
}

userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, "i" )});
}

userSchema.virtual("namedEmail").get(function() {
    return `${this.name} <${this.email}>`;
});

//expressjs middleware style
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.post('save', function(doc, next) {
    doc.sayHi();
    next();
})

module.exports = mongoose.model("User", userSchema);