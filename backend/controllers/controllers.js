var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ status: "ok", message: "Signed up successfully" });
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
});
//Signin
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({
            status: true,
            message: "Loggedin successfully",
            logged: true,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});
export { signUp, signIn, };
