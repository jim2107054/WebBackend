import jwt from 'jsonwebtoken';

const generateToken = (id)=>{
    //In the .sign() method, the first argument is the payload, the second argument is the secret key, and the third argument is the options object. The payload is the data that you want to encode in the token. The secret key is the key that is used to encode the token. The options object is used to specify the expiration time of the token.
    let token = jwt.sign(id,process.env.JWT_SECRET,{
        expiresIn:"30d"
    });
    return token;
}
export default generateToken;
//when we provide the id to the generateToken function, it will generate a token with the id as the payload. The token will expire in 30 days.