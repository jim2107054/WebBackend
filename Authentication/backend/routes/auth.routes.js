import express,{Router} from 'express';
import { signUp } from './../controllers/auth.controller.js';

const authRouter = express(Router()); //  Correct initialization
const app = express(); //  Correct initialization
app.use(express.json());  // ✅ This is necessary for parsing JSON requests

authRouter.post("/signup", signUp); //  Correct route definition

export default authRouter;
