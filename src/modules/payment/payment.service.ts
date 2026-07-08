import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import { ICreatePaymentPayload } from "./payment.interface"
import { AppError } from "../../errors/AppError";
import { BookingStatus, PaymentProvider, PaymentStatus } from "../../../prisma/generated/prisma/enums";
import { stripe } from "../../lib/stripe";
import config from "../../config";


// payment create in stripe 
const createPaymentIntentIntoDB = async(userId: string, payload: ICreatePaymentPayload) => {
    const { bookingId } = payload;

    // find the boking id
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            service: true,
            payment: true
        }
    });

    if (!booking) {
        throw new AppError(404, "Booking not found");
    }

    if(booking.customerId !== userId) {
        throw new AppError( 403,"You are not authorized to make payment for this booking");
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
        throw new AppError( 400, "Payment can only be made for accepted bookings");
    }
    
    if (booking.payment) {
        throw new AppError(400, "Payment already exists for this booking");
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],

        line_items: [
            {
                price_data: {
                    currency: "bdt",

                    product_data: {
                        name: booking.service.title,
                        description: booking.service.description
                    },

                    unit_amount: Math.round(Number(booking.service.price) * 100)
                },

                quantity: 1
            }
        ],

        metadata: {
            bookingId,
            customerId: userId
        },

        success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.app_url}/payments?success=false`,
    });

    return {
       checkoutURL: session.url,
       sessionId: session.id
    }
}


// payment intsert into DB
const confirmPaymentService = async (userId: string, sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new AppError(404, "Checkout session not found");
  }

  if (session.payment_status !== "paid") {
    throw new AppError(400, "Payment has not been completed");
  }

  const bookingId = session.metadata?.bookingId;

  if (!bookingId) {
    throw new AppError(400, "Booking id not found");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      payment: true,
      service: true
    },
  });

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.customerId !== userId) {
    throw new AppError(403, "Unauthorized");
  }

  if (booking.payment) {
    throw new AppError(400, "Payment already confirmed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        bookingId,

        amount: booking.service.price, 

        provider: PaymentProvider.STRIPE,

        stripeSessionId: session.id,

        stripePaymentIntentId: session.payment_intent as string,

        transactionId: session.payment_intent as string,

        status: PaymentStatus.COMPLETED,

        paidAt: new Date(),
      },
    });

    await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: BookingStatus.PAID,
      },
    });

    return payment;
  });

  return result;
};


// get all payment 
const getMyPaymentsFromDB = async (userId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      booking: {
        customerId: userId,
      },
    },
    include: {
      booking: {
        include: {
          service: true,
          technicianProfile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};



// get payment by id
const getSinglePaymentFromDB = async (userId: string, role: string, paymentId: string) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      id: paymentId,
    },
    include: {
        booking: {
            include: {
            service: true,
            technicianProfile: {
                include: {
                user: {
                    select: {
                    name: true,
                    email: true,
                    },
                },
                },
            },
            },
        },
    },
  });

  if (role !== "ADMIN" && payment.booking.customerId !== userId) {
    throw new AppError(403, "Unauthorized");
  }

  return payment;
};



export const paymentService = {
    createPaymentIntentIntoDB,
    confirmPaymentService,
    getMyPaymentsFromDB,
    getSinglePaymentFromDB
}