export interface User {
  name: string;
  email: string;
  phone: string;
}



export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IAdminContext {
  registerUser: (user: User) => Promise<void>;
  fetchUsers: () => Promise<IUser[]>;
  deleteUser: (userId: string) => Promise<void>;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
