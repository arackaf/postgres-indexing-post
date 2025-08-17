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

export const editions = [
  "1st edition",
  "2nd edition",
  "3rd edition",
  "4th edition",
  "5th edition",
  "6th edition",
  "7th edition",
  "8th edition",
  "9th edition",
  "10th edition",
];

export const bookTypes = ["Hardcover", "Paperback", "Kindle"];

// Extensive character array for book title prefixes
// prettier-ignore
export const diverseCharacters = [
  // English alphabet
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  
  // Accented characters - Romance languages
  "À", "Á", "Â", "Ã", "Ä", "Å", "à", "á", "â", "ã", "ä", "å",
  "È", "É", "Ê", "Ë", "è", "é", "ê", "ë",
  "Ì", "Í", "Î", "Ï", "ì", "í", "î", "ï",
  "Ò", "Ó", "Ô", "Õ", "Ö", "ò", "ó", "ô", "õ", "ö",
  "Ù", "Ú", "Û", "Ü", "ù", "ú", "û", "ü",
  "Ý", "ý", "ÿ", "Ñ", "ñ", "Ç", "ç",
  
  // Germanic/Scandinavian characters
  "Æ", "æ", "Ø", "ø", "Þ", "þ", "Ð", "ð",
  "Ö", "ö", "Ä", "ä", "Ü", "ü", "ß",
  
  // Slavic characters
  "Č", "č", "Š", "š", "Ž", "ž", "Ć", "ć", "Đ", "đ", "Ň", "ň",
  "Ř", "ř", "Ů", "ů", "Ě", "ě", "Ť", "ť", "Ď", "ď", "Ľ", "ľ",
  "Ź", "ź", "Ż", "ż", "Ł", "ł", "Ą", "ą", "Ę", "ę", "Ń", "ń",
  "Ś", "ś", "Ż", "ż", "Ź", "ź", "Ć", "ć",
  
  // Additional European characters
  "Ő", "ő", "Ű", "ű", "Ă", "ă", "Â", "â", "Î", "î", "Ș", "ș", "Ț", "ț",
  "Ğ", "ğ", "İ", "ı", "Ş", "ş", "Ü", "ü", "Ö", "ö", "Ç", "ç",
  
  // Greek letters  
  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ",
  "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω",
  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ",
  "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
  
  // Cyrillic characters
  "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М",
  "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ",
  "Ъ", "Ы", "Ь", "Э", "Ю", "Я",
  "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м",
  "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ",
  "ъ", "ы", "ь", "э", "ю", "я",
  
  // Hebrew characters
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ",
  "ן", "נ", "ס", "ע", "פ", "ץ", "צ", "ק", "ר", "ש", "ת",
  
  // Arabic characters (selection)
  "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش",
  "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن",
  "ه", "و", "ي",
  
  // Numbers
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  
  // Special symbols and punctuation
  "!", "@", "#", "$", "%", "&", "*", "+", "=", "?", "§", "¶", "†", "‡",
  "•", "◦", "‰", "′", "″", "‴", "‹", "›", "«", "»", "‚", "„", 
  "'", "'", "–", "—", "¡", "¿", "¢", "£", "¤", "¥", "¦", "©", "®", "°",
  "±", "²", "³", "¹", "¼", "½", "¾", "×", "÷", "∂", "∆", "∏", "∑",
  "√", "∞", "∫", "≈", "≠", "≤", "≥", "◊", "♠", "♣", "♥", "♦"
];

export function getRandomCharacter(): string {
  return diverseCharacters[Math.floor(Math.random() * diverseCharacters.length)];
}
