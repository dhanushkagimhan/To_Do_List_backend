import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { config } from "./config/cofig";
import router from "./routes";

mongoose
    .connect(config.mongo_url)
    .then(() => {
        console.log("Conected database");
        startServer();
    })
    .catch((error) => {
        console.log("Database connection issue : ", error);
    });

const startServer = (): void => {
    const app: Application = express();
    const PORT: string | number = process.env.PORT ?? 9090;

    const corOptions = {
        origin: "*",
        methods: "GET,PATCH,POST,DELETE",
    };

    app.use(cors(corOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Hello from API Services!" });
    });

    app.use("/v1", router);

    try {
        app.listen(PORT, () => {
            console.log(`Server is listening PORT: ${PORT}`);
        });
    } catch (error: any) {
        console.log(`Error occurred when server starting: ${error.message}`);
    }
};
