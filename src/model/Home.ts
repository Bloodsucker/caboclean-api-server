import { Schema, Document, model} from "mongoose";

const homeSchema: Schema = new Schema({
    domain: String
});

export interface HomeI extends Document {
    domain: string;
}

export default model<HomeI>('Home', homeSchema);
