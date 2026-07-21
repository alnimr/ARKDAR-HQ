import { integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { localeEnum, translationStatusEnum } from "./enums";

export const trainingSessions = pgTable("training_sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  location: text("location"),
  capacity: integer("capacity"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const trainingSessionTranslations = pgTable(
  "training_session_translations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    trainingSessionId: text("training_session_id")
      .notNull()
      .references(() => trainingSessions.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    translationStatus: translationStatusEnum("translation_status")
      .notNull()
      .default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("training_session_translations_session_locale_unique").on(
      table.trainingSessionId,
      table.locale,
    ),
  ],
);
