import { InferInsertModel } from "drizzle-orm";

import { generateAllTitles } from "./history-titles";

import { newAuthor } from "./names";
import { db } from "../drizzle/db";
import { books, publishers } from "../drizzle/schema";

function generateRandomISBN(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let isbn = "";
  for (let i = 0; i < 10; i++) {
    isbn += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return isbn;
}

function generateRandomPages(): number {
  return Math.floor(Math.random() * (700 - 100 + 1)) + 100; // between 100 and 700
}

function generateRandomPublicationDate(): string {
  const now = new Date();
  const thirtyYearsAgo = new Date(now.getFullYear() - 30, now.getMonth(), now.getDate());
  const oneYearFuture = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  const randomTime = thirtyYearsAgo.getTime() + Math.random() * (oneYearFuture.getTime() - thirtyYearsAgo.getTime());

  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}

export async function fillDatabase() {
  await db.insert(publishers).values({
    id: 1,
    name: "Large History Publisher",
  });

  let totalBooksInserted = 0;
  const booksToInsert: InferInsertModel<typeof books>[] = [];

  const titles = generateAllTitles();

  async function flushBooks() {
    await db.insert(books).values(booksToInsert);
    totalBooksInserted += booksToInsert.length;

    console.log(`Total books inserted: ${totalBooksInserted.toLocaleString()}`);
    booksToInsert.length = 0;
  }

  for (const title of titles) {
    booksToInsert.push({
      isbn: generateRandomISBN(),
      author: newAuthor(),
      title: title,
      publisher: 1,
      publicationDate: generateRandomPublicationDate(),
      pages: generateRandomPages(),
      hasActivePromotion: false,
      eligibleForPromotion: false,
    });

    if (booksToInsert.length === 50) {
      await flushBooks();
    }
  }
  if (booksToInsert.length) {
    await flushBooks();
  }
}

fillDatabase();
