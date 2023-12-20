const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) ) {
            throw new Error(
              "Password must contain at least one letter and one number"
            );
          }
          else if(value.length < 5) {
            throw new Error (
              "Minimum length is 5 characters"
            );
          }
        },
      },
    date: {
        type: Date,
        default: Date.now
    },
    verified:{
      type:Boolean,
      default:false,
      required:true
    }
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

UserSchema.methods.comparePassword= async function (password) {
  const result = await bcrypt.compareSync(password,this.password); //this.password is inside database
  return result;
}

const user = mongoose.model("User", UserSchema);
// u.createIndexes();
module.exports = user;