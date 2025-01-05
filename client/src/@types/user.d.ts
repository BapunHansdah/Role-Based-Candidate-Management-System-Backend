export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  resume: string;
  role:string
}

export interface IUserContext {
  getProfile: () => Promise<User>;
  updateProfile: (user: User) => Promise<void>;
  updateProfileImage: (file: FormData) => Promise<void>;
  updateResume: (file: FormData) => Promise<void>;
  updatePassword: (
    oldPassword: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}
