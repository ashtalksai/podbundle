import { pgTable, uuid, text, varchar, decimal, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["free", "pro", "agency"]);
export const nicheEnum = pgEnum("niche", ["tech_saas", "business_finance", "health_wellness"]);
export const bundleStatusEnum = pgEnum("bundle_status", ["draft", "submitted", "active", "completed"]);
export const campaignStatusEnum = pgEnum("campaign_status", ["pending", "active", "paused", "completed"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: text("password_hash"),
  tier: tierEnum("tier").default("free").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const podcasts = pgTable("podcasts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  niche: nicheEnum("niche").notNull(),
  audienceSize: integer("audience_size").notNull(),
  cpm: decimal("cpm", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bundles = pgTable("bundles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: bundleStatusEnum("status").default("draft").notNull(),
  totalBudget: decimal("total_budget", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bundlePodcasts = pgTable("bundle_podcasts", {
  id: uuid("id").defaultRandom().primaryKey(),
  bundleId: uuid("bundle_id").references(() => bundles.id).notNull(),
  podcastId: uuid("podcast_id").references(() => podcasts.id).notNull(),
  allocation: decimal("allocation", { precision: 12, scale: 2 }).notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  bundleId: uuid("bundle_id").references(() => bundles.id).notNull(),
  status: campaignStatusEnum("status").default("pending").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  spend: decimal("spend", { precision: 12, scale: 2 }).default("0"),
});

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  date: timestamp("date").notNull(),
  impressions: integer("impressions").default(0).notNull(),
  downloads: integer("downloads").default(0).notNull(),
  spend: decimal("spend", { precision: 12, scale: 2 }).default("0").notNull(),
});

export type User = typeof users.$inferSelect;
export type Podcast = typeof podcasts.$inferSelect;
export type Bundle = typeof bundles.$inferSelect;
export type BundlePodcast = typeof bundlePodcasts.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Report = typeof reports.$inferSelect;
