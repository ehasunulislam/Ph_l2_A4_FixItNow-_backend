export interface ITechnicianProfilePayload {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string;
}

export interface IUpdateBookingStatus {
  status: "ACCEPTED" | "DECLINED";
}