import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalError.middlware";
import { userRoutes } from "./modules/user/user.routes";
import { notRouteFound } from "./middleware/notRouteFound.middleware";
import { authRouter } from "./modules/auth/auth.route";
import { technicianRouter } from "./modules/technician/technician.routes";
import { categoryRouter } from "./modules/category/category.routes";


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


// user route
app.use("/api/users", userRoutes);

app.use("/api/auth", authRouter);

app.use("/api/technician", technicianRouter);

app.use("/api/categories", categoryRouter);


// global error
app.use(globalErrorHandler);

// roter not found api
app.use(notRouteFound);

export default app;