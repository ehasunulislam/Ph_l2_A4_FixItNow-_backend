export interface IBookingPayload {
  serviceId: string;
  availabilityId: string;
  bookingDate: Date;
  address: string;
  note?: string;
}