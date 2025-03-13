import express, { Router } from 'express';
import { signUp } from '../controllers/auth.controller.js';

const authRouter = express(Router()); // fixed the Router initialization

authRouter.post("/signup", signUp); // fixed the signUp function usage

export default authRouter;