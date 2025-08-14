import { relations } from "drizzle-orm/relations";
import { publishers, books, activePromotions } from "./schema";

export const booksRelations = relations(books, ({ one, many }) => ({
  publisher: one(publishers, {
    fields: [books.publisher],
    references: [publishers.id],
  }),
  activePromotions: many(activePromotions),
}));

export const publishersRelations = relations(publishers, ({ many }) => ({
  books: many(books),
}));

export const activePromotionsRelations = relations(activePromotions, ({ one }) => ({
  book: one(books, {
    fields: [activePromotions.book],
    references: [books.id],
  }),
}));
