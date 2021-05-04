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
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String
 });

 UserSchema.virtual('password').set((password) => {
     this._password = password;
     this.salt = this.makeSalt();
     this.hashed_password = this.encryptPassword(password)
 }).get(() => this._password);

 UserSchema.methods = {
     authenticate: (plainText) => this.encryptPassword(plainText) === this.hashed_password,
     encryptPassword: (password) => {
         if (!password) return '';
         try {
             return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
         } catch(err) {
             return '';
         }
     },
     makeSalt: () => Math.round((new Date().valueOf() * Math.random())) + ''
 }

 UserSchema.path('hashed_password').validate(() => {
   if (this._password && this._password.length < 6) {
       this.invalidate('password', 'Password must be atleast 6 characters')
   }

   if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
   }
 }, null)
export default mongoose.model('User', UserSchema);