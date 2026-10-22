import { validationResult, body } from "express-validator"

const validateProduct = async (req, res, next) => {
    const errors =  validationResult(req);

    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export const validationProduct = [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("priceAmount").isNumeric().withMessage("priceAmount should be numeric"),
    
    validateProduct
] 