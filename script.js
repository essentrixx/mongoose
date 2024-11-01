const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb');

async function run() {
    try {
        const user = await User.findOne({ name: "Kyle", email: "test@test.com" });
        console.log(user);  // user object
        await user.save();
        console.log(user);  // Hi My name is Kyle
        // if (!user) { console.log ("user not found"); }
    } catch (e) {
        console.log(e.message);
    }
}
run();