import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const { DATABASE_CONNECTION_TYPE } = process.env;

if (!DATABASE_CONNECTION_TYPE) {
  throw new Error("DATABASE_CONNECTION_TYPE is not set");
}

const options = {
  local: { url: "file:local.sqlite" },
  remote: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  "local-replica": {
    url: "file:local.sqlite",
    syncUrl: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Record<typeof DATABASE_CONNECTION_TYPE, Config>;

export const client = createClient(options[DATABASE_CONNECTION_TYPE as keyof typeof options]);

if (process.env.DATABASE_CONNECTION_TYPE === "local-replica") {
  await client.sync();
}

export const db = drizzle(client, { schema, logger: true });
