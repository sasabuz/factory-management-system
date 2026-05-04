import User from './auth.model';
import bcrypt from 'bcrypt';
import { IUserCreate } from './auth.types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (data: IUserCreate) => {
  try {
    //check duplicate email
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error('Email already exists');

    //hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    //create user object
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'employee',
      image:data.image || '',
      salary: data.salary || 0,
    });

    // save user to DB
    const savedUser = await user.save();

    // return saved user without password
    const { password, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;

  } catch (err) {
    throw err;
  }
};

export const login = async({email,password}:{email:string, password:string})=>{
  try{
    //check if email doesnot exists
    const existingUser = await User.findOne({
      email
    })
    if(!existingUser) throw new Error("Email does not exists! Please sign up first.");

    //check the password
    const passwordOk = await bcrypt.compare(password, existingUser.password);
    if(!passwordOk) throw new Error("Incorrect Email or password! please try again");

    //json token creation
    const token = jwt.sign({id:existingUser.id, email:existingUser.email}, process.env.SECRET_KEY || "", {expiresIn:'1d'});

    return {
      success:true,
      token,
      user:{
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      }
    }
  }
  catch(err:any){
    throw err;
  }
}
