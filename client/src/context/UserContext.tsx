import { createContext } from "react";
import { IUserContext } from "../@types/user";

const UserContext = createContext<IUserContext | null>(null);

export default UserContext;