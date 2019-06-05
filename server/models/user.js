import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Username required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match:[/.+\@.+\..+/, 'Enter a valid email'],
        required: 'Email is required'
    },
    salt: {
        type: String
    }
});

userSchema
    .virtual('password')
    .set((password) => {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptedPassword(password);
    })
    .get(() => {
        return this._password;
    });

userSchema.methods = {
    authenticate: (plainText) => {
        return this.encryptedPassword(plainText) === this.hashedPassword;
    },
    encryptedPassword: (password) => {
        if(!password)
            return '';
        try{
            return crypto
                        .createHmac('sha1',this.salt)
                        .update(password)
                        .digest(hex);
        }catch(err){
            return '';
        }
    },
    makeSalt: () => {
        return Math.round(new Date().valueOf()* Math.random() + '');
    }
};
userSchema.path('hashedPassword').validate((v) => {
    if(this.hashedPassword && this._password.length < 6){
        this.invalidate('password','password must be at least 6 characters long');
    }
    if(this.isNew && !this._password){
        this.invalidate('password','Password is required');
    }
},null);

export default mongoose.model('User', userSchema);

