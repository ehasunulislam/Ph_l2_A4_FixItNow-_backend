import { BookingStatus } from "../../../prisma/generated/prisma/enums";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateReviewPayload } from "./reviews.interface";

const createReviewIntoDB = async (userId: string, payload: ICreateReviewPayload) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      review: true,
    },
  });

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.customerId !== userId) {
    throw new AppError(403, "Unauthorized");
  }

  if (booking.status !== BookingStatus.COMPLETED) {
    throw new AppError(
      400,
      "Review can only be submitted after job completion"
    );
  }

  if (booking.review) {
    throw new AppError(400, "Review already submitted");
  }

  const review = await prisma.review.create({
    data: {
      bookingId,
      customerId: userId,
      technicianProfileId: booking.technicianProfileId,
      rating,
      comment,
    },
  });

  return review;
};

export const reviewService = {
  createReviewIntoDB,
};