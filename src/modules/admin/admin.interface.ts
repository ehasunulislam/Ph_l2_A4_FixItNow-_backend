export interface IUserUpdatePayload {
  name: string;
  password: string;
  phone?: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED";
  profileImage?: string;
  address?: string;
}