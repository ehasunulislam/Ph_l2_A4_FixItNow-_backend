import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalError.middlware";
import { notRouteFound } from "./middleware/notRouteFound.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { technicianRouter } from "./modules/technician/technician.routes";
import { categoryRouter } from "./modules/category/category.routes";
import { serviceRouter } from "./modules/service/service.routes";
import { availabilityRouter } from "./modules/availability/availability.routes";


const app: Application = express();

// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser());



// root
app.get("/", async (req: Request, res: Response) => {
  res.send("hello, world");
});


app.use("/api/auth", authRouter);

app.use("/api/technicians", technicianRouter);
app.use("/api/technicians", availabilityRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/services", serviceRouter);


// global error
app.use(globalErrorHandler);

// roter not found api
app.use(notRouteFound);

export default app;