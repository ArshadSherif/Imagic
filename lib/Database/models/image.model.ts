
import {Document, model, models, Schema } from "mongoose";

// Define the IImage interface based on the schema
export interface IImage extends Document {
    title: string;
    transformationType: string; // Fixed the typo from "transforamtions"
    publicId: string;
    secureURL: string; // URL is represented as a string
    width?: number;
    height?: number;
    config?: object; // Object can be more specific, but `Record<string, unknown>` works for generic objects
    transformationURL?: string; // URL represented as string
    aspectRatio?: string; // Fixed the typo from "aspectRation"
    color?: string;
    prompt?: string;
    author: {
        _id:string;
        firstName:string;
        lastName:string;
    }; // Mongoose's ObjectId type
    createdAt?: Date;
    updatedAt?: Date;
}



const ImageSchema = new Schema({
    title:{type:String,required:true},
    transformationType:{type:String,required:true},
    publicId:{type:String,required:true},
    secureURL:{type:String,required:true},
    width:{type:Number},
    height:{type:Number},
    config:{type:Object},
    transformationURL:{type:String},
    aspectRatio:{type:String},
    color:{type:String},
    prompt:{type:String},
    author:{type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const Image= models?.Image || model("Image",ImageSchema)

export default Image;