export interface IUserRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED";
  profileImage?: string;
  address?: string;
}

export interface ILoginUser  {
    email: string,
    password: string
}

