export interface IBookingPayload {
  serviceId: string;
  availabilityId: string;
  address: string;
  note?: string;
}