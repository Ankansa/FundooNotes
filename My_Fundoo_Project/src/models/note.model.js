import { boolean } from '@hapi/joi';
import { Schema, model } from 'mongoose';


//This schema is difined for notes.

const noteSchema = new Schema(
{
Title: {
    type: String,
    required: true,
},
Descreption: {
    type: String,
    required: true,
},
color: {
    type: String,
},

isArchived: {
    default : false,
    type: Boolean,
    
},
isDeleted: {
    default : false,
    type: Boolean,
},
UserID: {
    type: String,            //No need to mention in body. It will auto generate while user do login by the JWT
}                           //It Will be the same as mail id
},
{
    timestamps:true
}
);
export default model('Note', noteSchema);
