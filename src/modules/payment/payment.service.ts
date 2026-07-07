import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import { ICreatePaymentPayload } from "./payment.interface"
import { AppError } from "../../errors/AppError";
import { BookingStatus } from "../../../prisma/generated/prisma/enums";
import { stripe } from "../../lib/stripe";
import config from "../../config";

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

        success_url: `${config.app_url}/premimum?success=true`,
        cancel_url: `${config.app_url}/payments?success=false`,
    });

    return session.url
}

export const paymentService = {
    createPaymentIntentIntoDB
}