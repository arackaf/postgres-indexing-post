import { pgTable, integer, varchar, foreignKey, serial, date, boolean, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const publishers = pgTable("publishers", {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const books = pgTable(
  "books",
  {
    id: serial().primaryKey().notNull(),
    isbn: varchar({ length: 20 }).notNull(),
    title: varchar({ length: 500 }).notNull(),
    publisher: integer().notNull(),
    publicationDate: date("publication_date").notNull(),
    pages: integer().notNull(),
    hasActivePromotion: boolean("has_active_promotion").default(false).notNull(),
    eligibleForPromotion: boolean("eligible_for_promotion").default(true).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.publisher],
      foreignColumns: [publishers.id],
      name: "books_publisher_fkey",
    }),
  ]
);

export const activePromotions = pgTable(
  "active_promotions",
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    book: integer().notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.book],
      foreignColumns: [books.id],
      name: "active_promotions_book_fkey",
    }),
    check("valid_promotion_dates", sql`end_date >= start_date`),
  ]
);
