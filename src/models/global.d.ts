import { Connection } from "mongoose";

declare global {
  /**
   * Cached Mongoose connection to prevent multiple connections in development.
   */
  var mongooseConn: {
    conn: Connection | null,
    promise: Promise<Connection> | null,
  };
}

export {}