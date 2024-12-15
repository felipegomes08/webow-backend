import {IUser} from "@interfaces/user";
import jwt from "jsonwebtoken";
import fs from "node:fs";

export const generateJwtToken = (user: IUser, expiresIn: string | number) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            accountType: user.accountType?.name,
            userType: user.userType?.name
        },
        fs.readFileSync('certs/private.key'),
        {
            algorithm: 'RS256',
            expiresIn
        }
    );
}