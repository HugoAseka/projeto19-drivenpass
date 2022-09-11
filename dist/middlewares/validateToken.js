import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function validateToken(req, res, next) {
    var getToken = req.headers["authorization"];
    var token = getToken === null || getToken === void 0 ? void 0 : getToken.replace("Bearer ", "");
    if (!token) {
        throw {
            code: "Unauthorized",
            message: "Um token é necessario para autenticação"
        };
    }
    try {
        res.locals.decodedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        next();
    }
    catch (err) {
        return res.status(401).send("Token inválido");
    }
}
export default validateToken;
