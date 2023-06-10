const { serialize } = require("cookie")

const logout =(req,res)=>{
    const {cookies}=req
    const token =cookies.token

    if (token){
        const serialised =serialize('token',null,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        })
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({ message: "Successfuly logged out!" });
    }
}


export default logout