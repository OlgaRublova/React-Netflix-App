const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilePic: {type: String, default: ""},
        isAdmin: {type: Boolean, default: false},
    },
    //  to be able to add "created at" || "updated at"
    {timestamps: true}
);

//      export to be use
module.exports = mongoose.model("User", UserSchema);
