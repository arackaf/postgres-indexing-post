import { InferInsertModel } from "drizzle-orm";
import { gte, lte } from "drizzle-orm";
import { db } from "../drizzle/db";
import { books, activePromotions } from "../drizzle/schema";

// Array of creative promotion names
const promotionNames = [
  "Summer Reading Bonanza",
  "Flash Fiction Friday",
  "Bestseller Blitz",
  "Weekend Page Turner",
  "Holiday Reading Special",
  "Back-to-School Savings",
  "Mystery Monday Deal",
  "Romance Reader's Delight",
  "Thriller Thursday Sale",
  "Classic Collection Discount",
  "New Release Rush",
  "Author Spotlight Special",
  "Genre Explorer Deal",
  "Limited Time Literary Treat",
  "Book Club Favorite Sale",
  "Epic Adventure Discount",
  "Cozy Corner Special",
  "Midnight Reading Deal",
  "Page Turner Paradise",
  "Literary Escape Sale",
  "Knowledge Seeker Special",
  "Wisdom Wednesday Deal",
  "Inspiration Station Discount",
  "Mind-Bender Sale",
  "Heart-Warmer Special",
  "Brain Food Bonanza",
  "Story Time Savings",
  "Chapter Champion Deal",
  "Verse and Prose Sale",
  "Narrative Nirvana Special",
  "Plot Twist Promotion",
  "Character Development Deal",
  "Setting the Scene Sale",
  "Climax Collection Discount",
  "Resolution Reading Rush",
  "Literary Legacy Special",
  "Prose Poetry Promotion",
  "Fiction Fantasy Deal",
  "Non-Fiction Knowledge Sale",
  "Biography Bonanza Special",
];

function getRandomPromotionName(): string {
  return promotionNames[Math.floor(Math.random() * promotionNames.length)];
}

function generateRandomStartDate(): string {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());

  const randomTime = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  const randomDate = new Date(randomTime);

  return randomDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}

function generateRandomEndDate(): string {
  const now = new Date();
  const threeMonthsFuture = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());

  const randomTime = now.getTime() + Math.random() * (threeMonthsFuture.getTime() - now.getTime());
  const randomDate = new Date(randomTime);

  return randomDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}

class PromotionInserter {
  private batchSize: number = 500;
  private buffer: InferInsertModel<typeof activePromotions>[] = [];
  private totalInserted: number = 0;

  async add(promotion: InferInsertModel<typeof activePromotions>) {
    this.buffer.push(promotion);

    if (this.buffer.length === this.batchSize) {
      await this.flush();
    }
  }

  async flush() {
    if (!this.buffer.length) {
      return;
    }

    await db.insert(activePromotions).values(this.buffer);
    this.totalInserted += this.buffer.length;

    console.log(`Total active promotions inserted: ${this.totalInserted.toLocaleString()}`);

    this.buffer.length = 0;
  }
}

export async function fillActivePromotions() {
  const chunkSize = 1000;
  let lastId = 0;
  let hasMoreBooks = true;
  let totalBooksProcessed = 0;
  let totalPromotionsCreated = 0;

  const promotionInserter = new PromotionInserter();

  console.log("Starting to fill active promotions...");

  while (hasMoreBooks) {
    // Read next chunk of books
    const bookChunk = await db.select().from(books).where(gte(books.id, lastId)).orderBy(books.id).limit(chunkSize);

    if (bookChunk.length === 0) {
      hasMoreBooks = false;
      break;
    }

    console.log(`Processing ${bookChunk.length} books starting from ID ${lastId}...`);

    // Process each book in the chunk
    for (const book of bookChunk) {
      totalBooksProcessed++;

      // 10% chance to create a promotion for this book
      if (Math.random() < 0.1) {
        const startDate = generateRandomStartDate();
        const endDate = generateRandomEndDate();

        await promotionInserter.add({
          name: getRandomPromotionName(),
          book: book.id,
          startDate,
          endDate,
        });

        totalPromotionsCreated++;
      }

      lastId = book.id;
    }

    // Update lastId to continue from the next book
    lastId = bookChunk[bookChunk.length - 1].id + 1;

    // Log progress
    if (totalBooksProcessed % 10000 === 0) {
      console.log(
        `Processed ${totalBooksProcessed.toLocaleString()} books, created ${totalPromotionsCreated.toLocaleString()} promotions so far...`
      );
    }
  }

  // Flush any remaining promotions
  await promotionInserter.flush();

  console.log(
    `\nFinished! Processed ${totalBooksProcessed.toLocaleString()} books and created ${totalPromotionsCreated.toLocaleString()} active promotions.`
  );
  console.log(`Promotion creation rate: ${((totalPromotionsCreated / totalBooksProcessed) * 100).toFixed(1)}%`);
}

fillActivePromotions();
