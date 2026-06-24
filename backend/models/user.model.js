// // For making authentication we have to store the data of user. Therefore we are creating user model to store the data of user.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScheam = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match:/^([a-zA-Z][\w\.\-]+[a-zA-Z0-9])@([a-zA-Z0-9]{2,20})\.([a-zA-Z]{2,5})(\.[a-zA-Z]{2,5})?$/ // // We can validate here also but it is a last stage. We should validate from frontend process as far as possible.
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, 
{timestamps: true}
);


userScheam.methods.matchPassword = async function (password){  // // This password is plain text password and it is an argument. This is called static method.
return await bcrypt.compare(password, this.password);  // // this.password is hashed password from database as it is reflecting the user of database.
}

// Schema ma jun data aako xa to database ma save hunu bhanda aagadi password lie encrypt garna.
userScheam.pre("save", async function (next) {   // // This is callback function.
    if(!this.isModified("password")){  // // If the password is not modified it wil go as it is through next.
        next();
    };
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userScheam);
export default User; // // This cannot be used for multiple import. In other place we can import by any other name.
// // Similar to module.exports like: exports.a = a
