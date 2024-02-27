import express from "express";
import cors from "cors";

import "./utils/prisma";

import routes from "./routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.routes();
  }

  private routes() {
    this.app.use("/v1", routes);
  }
}
const app = new App();
export default app.app;
