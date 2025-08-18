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
  const publisherValues = publisherNames.map(name => ({ name }));

  return await db.insert(publishers).values(publisherValues).returning();
}

type BookTitleAuthor = {
  title: string;
  author: string;
  publisher: number;
};
function* bookCoreGenerator(
  titles: IterableIterator<string>,
  publishers: Publisher[],
  limit?: number
): IterableIterator<BookTitleAuthor> {
  let numberRemainingToInsert = typeof limit === "number" ? limit : Infinity;
  for (const title of titles) {
    yield {
      title,
      publisher: publishers[Math.floor(Math.random() * publishers.length)].id,
      author: randomAuthor(),
    };

    if (--numberRemainingToInsert <= 0) {
      return;
    }
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
  const timelessHistoryBooks = bookCoreGenerator(generateAllHistoryTitles(), [timelessHistoryPublishing], 1_521_486);
  const frontendMastersBooks = bookCoreGenerator(generateAllTechTitles(), [frontendMastersPublishing], 2_081_190);

  const allBookGenerators = [
    classicBooks,
    classicAnalysisTitles,
    historyBooks,
    miscTitles,
    cookingTitles,
    techTitles,
    timelessHistoryBooks,
    frontendMastersBooks,
  ];

  while (allBookGenerators.length) {
    for (let i = allBookGenerators.length - 1; i >= 0; i--) {
      const generator = allBookGenerators[i];
      const randomCount = Math.floor(Math.random() * 10) + 1; // Random number from 1-10 inclusive

      let generatorEmpty = false;

      for (let j = 0; j < randomCount; j++) {
        const result = generator.next();
        if (result.done) {
          generatorEmpty = true;
          break;
        }

        const book = result.value;

        // 10% of the time, randomly apply one of two promotion settings
        const shouldApplyPromotion = Math.random() < 0.1;
        let hasActivePromotion = false;
        let eligibleForPromotion = false;

        if (shouldApplyPromotion) {
          if (Math.random() < 0.5) {
            hasActivePromotion = true;
          } else {
            eligibleForPromotion = true;
          }
        }

        await bookInserter.add({
          isbn: generateRandomISBN(),
          author: book.author,
          title: book.title,
          publisher: book.publisher,
          publicationDate: generateRandomPublicationDate(),
          pages: generateRandomPages(),
          hasActivePromotion,
          eligibleForPromotion,
        });
      }

      if (generatorEmpty) {
        allBookGenerators.splice(i, 1);
      }
    }
  }

  await bookInserter.flush();
}

fillDatabase();
