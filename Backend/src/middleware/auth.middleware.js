import config from "../config/config.js";
import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js";

export const UserAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        const decoded = jwt.verify(token, config.jwt_secret);

        console.log(decoded)

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "unauthorized",
            });
        }
        
        req.user = user;

        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "unauthorized"
        })
    }

}

    

export const sellerAuthenticate = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        const decoded = jwt.verify(token, config.jwt_secret);

        console.log(decoded)

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "unauthorized",
            });
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                message: "the user is forbidden"
            })
        }

        req.user = user;

        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message:"unauthorized"
        })
    }

} 