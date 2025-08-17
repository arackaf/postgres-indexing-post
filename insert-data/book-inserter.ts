import { InferInsertModel } from "drizzle-orm";
import { db } from "../drizzle/db";
import { books } from "../drizzle/schema";

export class BookInserter {
  private batchSize: number = 500;
  private buffer: InferInsertModel<typeof books>[] = [];
  private totalInserted: number = 0;

  async add(book: InferInsertModel<typeof books>) {
    this.buffer.push(book);

    if (this.buffer.length === this.batchSize) {
      await this.flush();
    }
  }

  async flush() {
    if (!this.buffer.length) {
      return;
    }

    await db.insert(books).values(this.buffer);
    this.totalInserted += this.buffer.length;

    console.log(`Total books inserted: ${this.totalInserted.toLocaleString()}`);

    this.buffer.length = 0;
  }
}
