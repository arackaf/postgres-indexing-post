import { relations } from "drizzle-orm/relations";
import { publishers, books } from "./schema";

export const booksRelations = relations(books, ({ one }) => ({
  publisher: one(publishers, {
    fields: [books.publisher],
    references: [publishers.id],
  }),
}));

export const publishersRelations = relations(publishers, ({ many }) => ({
  books: many(books),
}));
