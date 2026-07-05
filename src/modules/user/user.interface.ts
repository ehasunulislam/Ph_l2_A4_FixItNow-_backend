export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED";
  profileImage?: string;
  address?: string;
}