import { pgEnum } from "drizzle-orm/pg-core";

export const localeEnum = pgEnum("locale", ["ar", "de", "fr", "en"]);

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "content_manager",
  "partner",
  "translator",
]);

export const translationStatusEnum = pgEnum("translation_status", [
  "draft",
  "pending_review",
  "published",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "new",
  "contacted",
  "closed",
]);

export const bookingRelatedTypeEnum = pgEnum("booking_related_type", [
  "training_session",
  "event",
  "general",
]);
