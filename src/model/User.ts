import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
	content: string;
	createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	verifyCode: string;
	verifyCodeExpiry: Date;
    isVerified: boolean;
	createdAt: Date;
	isAcceptingMessage: boolean;
	messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: [true, 'Username already exists'],
        trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email already exists'],
        match: [ // This operator from the Mongoose package...
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	verifyCode: {
		type: String,
		required: [true, 'Verify code is required'],
	},
	verifyCodeExpiry: {
		type: Date,
		required: [true, 'Verify code expiry is required'],
	},
    isVerified: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	isAcceptingMessage: {
		type: Boolean,
		default: true,
	},
	messages: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;