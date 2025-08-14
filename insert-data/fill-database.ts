import { InferSelectModel } from "drizzle-orm";

import { db } from "../drizzle/db";
import { publishers } from "../drizzle/schema";
import { BookInserter } from "./book-inserter";

import { generateAllHistoryTitles } from "./static-data/history-titles";
import { ClassicTitle, classicTitles, generateAllClassicAnalysisTitles } from "./static-data/classic-titles";
import { randomAuthor } from "./static-data/names";
import {
  historyPublishers as historyPublisherNames,
  techPublishers as techPublisherNames,
  cookingPublishers as cookingPublisherNames,
  miscPublishers as miscPublisherNames,
  classicsPublishers as classicPublisherNames,
} from "./static-data/publishers";
import { generateRandomISBN, generateRandomPages, generateRandomPublicationDate } from "./util";
import { generateAllMiscAnalysisTitles } from "./static-data/misc-titles";
import { generateAllCookingTitles } from "./static-data/cooking-titles";
import { generateAllTechTitles } from "./static-data/tech-titles";

type Publisher = InferSelectModel<typeof publishers>;

async function insertPublishers(publisherNames: string[]): Promise<Publisher[]> {
  const publisherValues = publisherNames.map((name) => ({ name }));

  return await db.insert(publishers).values(publisherValues).returning();
}

type BookTitleAuthor = {
  title: string;
  author: string;
  publisher: number;
};
function* bookCoreGenerator(titles: IterableIterator<string>, publishers: Publisher[]): IterableIterator<BookTitleAuthor> {
  for (const title of titles) {
    yield {
      title,
      publisher: publishers[Math.floor(Math.random() * publishers.length)].id,
      author: randomAuthor(),
    };
  }
}
function* classicBookGenerator(books: ClassicTitle[], publishers: Publisher[]): IterableIterator<BookTitleAuthor> {
  for (const book of books) {
    yield {
      title: book.title,
      publisher: publishers[Math.floor(Math.random() * publishers.length)].id,
      author: book.author,
    };
  }
}

export async function fillDatabase() {
  const historyPublishers = await insertPublishers(historyPublisherNames);
  const [timelessHistoryPublishing] = await insertPublishers(["Timeless History"]);
  const classicPublishers = await insertPublishers(classicPublisherNames);
  const techPublishers = await insertPublishers(techPublisherNames);
  const cookingPublishers = await insertPublishers(cookingPublisherNames);
  const [frontendMastersPublishing] = await insertPublishers(["FrontendMasters Publishing"]);
  const miscPublishers = await insertPublishers(miscPublisherNames);

  const bookInserter = new BookInserter();

  const classicBooks = classicBookGenerator(classicTitles, classicPublishers);
  const classicAnalysisTitles = bookCoreGenerator(generateAllClassicAnalysisTitles(), classicPublishers);
  const historyBooks = bookCoreGenerator(generateAllHistoryTitles(), historyPublishers);
  const miscTitles = bookCoreGenerator(generateAllMiscAnalysisTitles(), miscPublishers);
  const cookingTitles = bookCoreGenerator(generateAllCookingTitles(), cookingPublishers);
  const techTitles = bookCoreGenerator(generateAllTechTitles(), techPublishers);
  const timelessHistoryBooks = bookCoreGenerator(generateAllHistoryTitles(), [timelessHistoryPublishing]);
  const frontendMastersBooks = bookCoreGenerator(generateAllTechTitles(), [frontendMastersPublishing]);

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
