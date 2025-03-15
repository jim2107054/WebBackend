import express,{Router} from 'express';
import { signUp } from './../controllers/auth.controller.js';

const authRouter = express(Router()); //  Correct initialization
authRouter.post("/signup", signUp); //  Correct route definition

export default authRouter;
