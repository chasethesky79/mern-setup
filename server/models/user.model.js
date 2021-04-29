import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
 });

 UserSchema.virtual('password').set((password) => {
     this._password = password;
     this.salt = this.makeSalt();
     this.hashed_password = this.encryptPassword(password)
 }).get(() => this._password);
 
export default mongoose.model('User', UserSchema);