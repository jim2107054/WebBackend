import express,{Router} from 'express';
import { deleteUser, Login, Logout, signUp } from './../controllers/auth.controller.js';

const authRouter = express(Router()); 
authRouter.post("/signup", signUp);
authRouter.post("/login", Login);
authRouter.get("/logout",Logout);
authRouter.post("/delete",deleteUser);

export default authRouter;
