import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { bookingRelatedTypeEnum, bookingStatusEnum } from "./enums";

export const bookings = pgTable("bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  relatedType: bookingRelatedTypeEnum("related_type")
    .notNull()
    .default("general"),
  relatedId: text("related_id"),
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  message: text("message"),
  status: bookingStatusEnum("status").notNull().default("new"),
  // Unused until Stripe is enabled (Switzerland launch). Kept from day one
  // so the booking flow doesn't need a schema change to grow into payments.
  paymentStatus: text("payment_status"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
