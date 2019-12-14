import { Schema, Document, model} from "mongoose";

const homeSchema: Schema = new Schema({
    domain: {
        type: String,
        required: true
    }
});

export interface HomeI extends Document {
    domain: string;
}

export interface NewHomePublicModel {
    domain: string;
}

export interface HomePublicModel extends NewHomePublicModel {
    id: string;
}

export default model<HomeI>('Home', homeSchema);
