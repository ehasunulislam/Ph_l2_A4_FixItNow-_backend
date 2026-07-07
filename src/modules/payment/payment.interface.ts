export interface ICreatePaymentPayload {
  bookingId: string;
}

export interface IConfirmPaymentPayload {
  bookingId: string;
  paymentIntentId: string;
  paymentMethod?: string;
}