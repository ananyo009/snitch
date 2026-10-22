import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("CLIENT ID is not defined in the environment variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("CLIENT SECRET is not defined in the environment variables");
}
if (!process.env.IMAGE_KIT_KEY) {
    throw new Error("IMAGE KIT KEY is not defined in the environment variables")
}

const config = {
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    image_kit: process.env.IMAGE_KIT_KEY
}

export default config;