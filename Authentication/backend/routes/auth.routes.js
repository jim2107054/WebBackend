import express, { Router } from 'express';
import { signUp } from '../controllers/auth.controller';

const authRouter = express(Router());

authRouter.post("/signup",(req,signUp)); // we are using the signUp function from the auth.controller.js file

export default authRouter;