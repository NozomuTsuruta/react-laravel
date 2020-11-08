import { IUser } from "../../Types";

export const set_user = (user: IUser)=>{
  return {
    type: 'SET_USER',
    user: user
  }
}