/**
 * Model for Admin (Sleep Scientist)
 */

import { model, Schema, Document } from "mongoose";

/**
 * Interface representing an Admin Document in MongoDB
 */
export interface AdminDocument extends Document{
    name: string,
    email: string,
    password: string,
    photo: string,
    location: string,
    bio: string,
    company: string,
    secondaryEmail: string,
    role: string,
    deleted: Boolean,
}

/**
 * Admin Schema corresponding to an Admin Document
 */
const AdminSchema = new Schema<AdminDocument>({
    name: {
        type: String,
        required: [true, 'Name Required!']
    },
    email: {
        type: String,
        required: [true, 'Email Required!'],
        unique: true
    },
    password: {
        type: String,
        minLength: [8, 'Password Too Short, Enter Atleast 8 Characters']
    },
    location: String,
    bio: String,
    company: String,
    role: String,
    photo: {
        type: String
    },
    secondaryEmail: String,
    deleted: Boolean
});

/**
 * Admin Model
 */
const Admin = model<AdminDocument>('Admin', AdminSchema);

export default Admin;