import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import connectToDB from "./config/dbConn";
import urlRoutes from "./routes/url.route";
import cors from "@elysiajs/cors";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectToDB();

// Main app
const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get("/", () => "Hello Elysia")
  .group("/api/v1", (app) => app.use(urlRoutes))
  .listen(PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
