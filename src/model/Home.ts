import { Schema, Document, model} from "mongoose";

const homeSchema: Schema = new Schema({
    domain: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: (doc: HomeInternalDocument, ret: HomeInternalObject): void => {
            ret.id = doc.id;

            delete ret._id;
            delete ret.__v;
        }
    }
});

export interface NewHomePublicDocument {
    domain: string;
}

export interface HomePublicDocument extends NewHomePublicDocument {
    id: string;
}

interface HomeInternalObject extends HomePublicDocument {
    _id: string;
    __v: number;
}

export interface HomeInternalDocument extends Document, NewHomePublicDocument {
}

export const HomeModel = model<HomeInternalDocument>('Home', homeSchema);
