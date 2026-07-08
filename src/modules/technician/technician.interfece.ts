import type { BookingStatus as PrismaBookingStatus } from "../../../prisma/generated/prisma/enums";

export interface ITechnicianProfilePayload {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string;
}

export interface IUpdateBookingStatus {
  status: PrismaBookingStatus;
}