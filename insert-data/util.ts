export function generateRandomISBN(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let isbn = "";
  for (let i = 0; i < 10; i++) {
    isbn += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return isbn;
}

export function generateRandomPages(): number {
  return Math.floor(Math.random() * (700 - 100 + 1)) + 100; // between 100 and 700
}

export function generateRandomPublicationDate(): string {
  const now = new Date();
  const thirtyYearsAgo = new Date(now.getFullYear() - 30, now.getMonth(), now.getDate());
  const oneYearFuture = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  const randomTime = thirtyYearsAgo.getTime() + Math.random() * (oneYearFuture.getTime() - thirtyYearsAgo.getTime());

  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split("T")[0]; // Return YYYY-MM-DD format
}
