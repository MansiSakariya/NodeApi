const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    fname:String,
    date:String,
    email:String,
    phone:String,
    school:String,
    grade:String,
});

module.exports = mongoose.model("App",AppSchema);