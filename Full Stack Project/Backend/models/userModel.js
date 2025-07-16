import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        trim: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    }
});

//hashing password before saving 
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try {
        //hashing a password here
        const hashPassword = await bcrypt.hash(this.password, 12);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;