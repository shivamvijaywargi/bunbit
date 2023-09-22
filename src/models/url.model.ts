import mongoose, { Schema } from "mongoose";

export interface IUrl {
  originalUrl: string;
  shortUrl: string;
  shortUrlId: string;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: [true, "URL is required"] },
  shortUrl: {
    type: String,
    required: [true, "Short URL is required"],
    unique: true,
  },
  shortUrlId: {
    type: String,
    required: [true, "Short URL ID is required"],
    unique: true,
  },
});

const UrlModel = mongoose.model<IUrl>("Url", urlSchema);

export default UrlModel;
