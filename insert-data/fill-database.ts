import { InferSelectModel } from "drizzle-orm";

import { db } from "../drizzle/db";
import { publishers } from "../drizzle/schema";
import { BookInserter } from "./book-inserter";

import { generateAllTitles } from "./static-data/history-titles";
import { newAuthor } from "./static-data/names";
import {
  historyPublishers as historyPublisherNames,
  techPublishers as techPublisherNames,
  cookingPublishers as cookingPublisherNames,
  miscPublishers as miscPublisherNames,
} from "./static-data/publishers";

type Publisher = InferSelectModel<typeof publishers>;

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

async function insertPublishers(publisherNames: string[]): Promise<Publisher[]> {
  const publisherValues = publisherNames.map((name) => ({ name }));

  return await db.insert(publishers).values(publisherValues).returning();
}

export async function fillDatabase() {
  const historyPublishers = await insertPublishers(historyPublisherNames);
  const [timelessHistory] = await insertPublishers(["Timeless History"]);
  const techPublishers = await insertPublishers(techPublisherNames);

  const bookInserter = new BookInserter();

  const titles = generateAllTitles();

  for (const title of titles) {
    await bookInserter.add({
      isbn: generateRandomISBN(),
      author: newAuthor(),
      title: title,
      publisher: 1,
      publicationDate: generateRandomPublicationDate(),
      pages: generateRandomPages(),
      hasActivePromotion: false,
      eligibleForPromotion: false,
    });
  }
  await bookInserter.flush();
}

fillDatabase();
