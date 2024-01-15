import { Schema, model, models, mongoose } from 'mongoose';

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     unique: [true, 'Email already exists!'],
//     required: [true, 'Email is required!'],
//   },
//   firstName: {
//     type: String,
//     required: [true, 'First name is required!'],
//   },
//     lastName: {
//         type: String,
//         required: [true, 'Last name is required!'],
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required!'],
//     },
//     phoneNumber: {
//         type: String,
//         required: [true, 'Phone is required!'],
//     },
// });

// const User = models.User || model("User", UserSchema);

// export default User;

const userSchema = new Schema({
    id: {type: String},
    firstName: {type: String, required: [true, 'no first name']},
    lastName: {type: String, required: [true, 'no last name']},
    email: {type: String, required: [true, 'no email']},
    phoneNumber: {type: String},
    emailReceiptOptIn: {type: Boolean},
    password: {type: String, required: [true, 'no password']},
    userType: {type: String},
})

const User = models.User || model("User", userSchema);

export default User;