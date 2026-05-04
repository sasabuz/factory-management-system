import { Request, Response } from "express";
import { signUp, login } from "./auth.service";
import { singupValidation } from "./aut.validation";
import dotenv from 'dotenv'

dotenv.config();

// signup
export const signUpController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    //validation
    const validate = singupValidation.safeParse(data);
    if(!validate.success){
        return res.status(400).json({
            success:false,
            message: validate.error.issues[0].message,
        })
    }

    // call for function
    const userData = await signUp(data);
    res.status(201).json({
      success: true,
      message: "Successfully created the account.",
      data: userData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    console.log("Error occured into auth controller!!!!!", err);
  }
};

// login
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await login({ email, password });
    
    // Set HttpOnly Cookie 
    res.cookie('authToken', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    // send response
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: {user:response.user},
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// find logged in user
export const checkAuth = async(req:Request, res:Response)=>{
  try{
    res.status(200).json({
      success:true,
      data: (req as any).user
    })
  }
  catch(err:any){
    res.status(400).json({
      success:false,
      message:"No logged in user found!"
    })
    console.log("No logged in user found!", err);
  }
}

// logout
export const logoutController = async (req: Request, res: Response) => {
  try {
    // Clear the authToken cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    console.log("Error occurred during logout", err);
  }
};
