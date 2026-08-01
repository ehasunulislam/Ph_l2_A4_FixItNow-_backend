export interface IBookingPayload {
  serviceId: string;
  availabilityId: string;
  address: string;
  note?: string;
}

export interface ICreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}