var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
//Hashes the password
function hashed(password, num) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashed_password = yield bcrypt.hash(password, num);
            return hashed_password;
        }
        catch (err) {
            console.log(err);
        }
    });
}
//Compares password with hashed password
function comparePassword(password, hashed) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(password, hashed);
    });
}
export { hashed, comparePassword };
