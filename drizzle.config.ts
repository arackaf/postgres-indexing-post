import { defineConfig } from "drizzle-kit";
import { connectionString } from "./drizzle/connection_string";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  out: "./drizzle",
});
