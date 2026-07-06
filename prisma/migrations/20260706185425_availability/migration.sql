-- CreateTable
CREATE TABLE "availabilities" (
    "id" TEXT NOT NULL,
    "technicianProfileId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" VARCHAR(10) NOT NULL,
    "endTime" VARCHAR(10) NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_technicianProfileId_fkey" FOREIGN KEY ("technicianProfileId") REFERENCES "technician_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
