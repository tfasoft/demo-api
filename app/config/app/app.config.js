import env from "$app/env/index.js";

export default {
  environment: env.APP_ENVIRONMENT,
  port: env.APP_PORT,
  production: env.APP_ENVIRONMENT === "production",
  secret: env.APP_SECRET,
};
