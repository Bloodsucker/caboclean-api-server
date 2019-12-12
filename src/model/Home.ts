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

export interface HomeModelPublic {
    domain: string;
}

export default model<HomeI>('Home', homeSchema);
