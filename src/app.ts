import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";

import flash from "express-flash";

// Controllers (route handlers)
import * as projectController from "./controllers/project.controller";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3003);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.post("/project/create", projectController.createPrj);
app.patch("/project/jobs/changestatus", projectController.changeJobStatus);
app.get("/project/jobs/filter", projectController.filterJobsByStatus);
app.get("/project/jobs/order", projectController.orderJobsByCriteria);

export default app;
