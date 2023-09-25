import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import connectToDB from "./config/dbConn";
import urlRoutes from "./routes/url.route";

const PORT = parseInt(process.env.PORT || "5000", 10);

// Connect to MongoDB
await connectToDB();

// Main app
const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/swagger",
    }),
  )
  .get("/", () => "Hello Elysia")
  .group("/api/v1", (app) => app.use(urlRoutes))
  .listen(PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
