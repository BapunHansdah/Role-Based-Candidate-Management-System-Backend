import { createContext } from "react";
import { IAdminContext } from "../@types/admin";

const AdminContext = createContext<IAdminContext | null>(null);

export default AdminContext;
