import { jwtVerify } from "jose";

export const getJwtSecretkey =()=>{
    const secret = process.env.JWT_SECRET 
    if (!secret || secret.length===0){
        throw new Error ('no secret key')
    }
    return secret
}


export const verifyAuth = async (token)=>{
    
    try {
        const verified = await jwtVerify(token,new TextEncoder().encode(getJwtSecretkey()))
        return verified.payload 
    } catch (error) {
        throw new Error ('you token has been expired.')
    }
}