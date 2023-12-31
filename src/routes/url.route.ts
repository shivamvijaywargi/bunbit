import Elysia, { t } from "elysia";
import { nanoid } from "nanoid";

import UrlModel from "../models/url.model";

// Create a user route group
const urlRoutes = (app: Elysia) =>
  app.group("urls", (app) =>
    app
      .get("/", async () => {
        const urls = await UrlModel.find({});

        return {
          success: true,
          message: "All URLs fetched successfully",
          data: {
            urls,
          },
        };
      })
      .get("/:id", async ({ params, set }) => {
        const url = await UrlModel.findOne({ shortUrlId: params.id });

        console.log(url);

        if (!url) {
          set.redirect = `${process.env.CLIENT_URL}not-found`;
        }

        set.redirect = url?.originalUrl;
      })
      .post(
        "/",
        async ({ body }) => {
          const url = await UrlModel.findOne({ originalUrl: body.url });

          if (url) {
            return {
              success: true,
              message: "Short URL",
              data: {
                url: url.shortUrl,
              },
            };
          }

          const shortUrlId = nanoid(6);

          const shortUrl = process.env.CLIENT_URL + shortUrlId;

          const newUrl = await UrlModel.create({
            originalUrl: body.url,
            shortUrl: shortUrl,
            shortUrlId,
          });

          return {
            success: true,
            message: "Short URL",
            data: {
              newUrl,
            },
          };
        },
        {
          body: t.Object({
            url: t.String(),
          }),
        },
      ),
  );

export default urlRoutes;
