// History Book Title Generator
// Generates large amounts of unique book titles through combinatorial arrays

// Title prefixes and formats (50 items)
const prefixes = [
  "The Complete History of",
  "A Biography of",
  "The Rise and Fall of",
  "Chronicles of",
  "The Secret History of",
  "Memoirs of",
  "The Life and Times of",
  "The Story of",
  "Legends of",
  "The Untold Story of",
  "The Making of",
  "The Decline of",
  "The Golden Age of",
  "The Last Days of",
  "The Birth of",
  "The Conquest of",
  "The Liberation of",
  "The Siege of",
  "The Battle for",
  "The War of",
  "The Revolution of",
  "The Empire of",
  "The Kingdom of",
  "The Republic of",
  "The Dynasty of",
  "Masters of",
  "Heroes of",
  "Villains of",
  "Pioneers of",
  "The Forgotten",
  "The Lost",
  "The Hidden",
  "The Great",
  "The Magnificent",
  "The Terrible",
  "The Brave",
  "The Wise",
  "The Mad",
  "The First",
  "The Last",
  "Blood and",
  "Fire and",
  "Steel and",
  "Crown and",
  "Sword and",
  "Faith and",
  "Honor and",
  "Power and",
  "Glory and",
  "Shadows of",
];

// Historical figures and notable people (100 items)
const historicalFigures = [
  "Alexander the Great",
  "Julius Caesar",
  "Cleopatra",
  "Napoleon Bonaparte",
  "George Washington",
  "Abraham Lincoln",
  "Winston Churchill",
  "Adolf Hitler",
  "Joseph Stalin",
  "Franklin D. Roosevelt",
  "Theodore Roosevelt",
  "Thomas Jefferson",
  "Benjamin Franklin",
  "Leonardo da Vinci",
  "Michelangelo",
  "Christopher Columbus",
  "Marco Polo",
  "Genghis Khan",
  "Attila the Hun",
  "Charlemagne",
  "King Arthur",
  "Joan of Arc",
  "Queen Elizabeth I",
  "Queen Victoria",
  "Catherine the Great",
  "Peter the Great",
  "Louis XIV",
  "Marie Antoinette",
  "Henry VIII",
  "Richard the Lionheart",
  "Saladin",
  "Hannibal",
  "Spartacus",
  "Constantine",
  "Augustus",
  "Nero",
  "Caligula",
  "Marcus Aurelius",
  "Socrates",
  "Plato",
  "Aristotle",
  "Confucius",
  "Sun Tzu",
  "Machiavelli",
  "Galileo",
  "Copernicus",
  "Isaac Newton",
  "Charles Darwin",
  "Sigmund Freud",
  "Karl Marx",
  "John F. Kennedy",
  "Martin Luther King Jr.",
  "Malcolm X",
  "Gandhi",
  "Nelson Mandela",
  "Mao Zedong",
  "Ho Chi Minh",
  "Fidel Castro",
  "Che Guevara",
  "Sitting Bull",
  "Pocahontas",
  "Sacagawea",
  "Harriet Tubman",
  "Frederick Douglass",
  "Booker T. Washington",
  "W.E.B. Du Bois",
  "Susan B. Anthony",
  "Elizabeth Cady Stanton",
  "Florence Nightingale",
  "Marie Curie",
  "Albert Einstein",
  "Nikola Tesla",
  "Thomas Edison",
  "Henry Ford",
  "John D. Rockefeller",
  "Andrew Carnegie",
  "J.P. Morgan",
  "Theodore Roosevelt",
  "Woodrow Wilson",
  "Harry Truman",
  "Dwight Eisenhower",
  "Douglas MacArthur",
  "George Patton",
  "Erwin Rommel",
  "Winston Churchill",
  "Charles de Gaulle",
  "Benito Mussolini",
  "Francisco Franco",
  "Hirohito",
  "Mao Zedong",
  "Chiang Kai-shek",
  "Sun Yat-sen",
  "Akbar the Great",
  "Ashoka",
  "Chandragupta",
  "Cyrus the Great",
  "Darius the Great",
  "Hammurabi",
  "Ramesses II",
  "Tutankhamun",
  "Nefertiti",
  "Hatshepsut",
];

// Major historical events and periods (80 items)
const historicalEvents = [
  "World War I",
  "World War II",
  "The Cold War",
  "The Civil War",
  "The Revolutionary War",
  "The Vietnam War",
  "The Korean War",
  "The Gulf War",
  "The Crusades",
  "The French Revolution",
  "The Russian Revolution",
  "The Industrial Revolution",
  "The Renaissance",
  "The Reformation",
  "The Enlightenment",
  "The Dark Ages",
  "The Middle Ages",
  "The Stone Age",
  "The Bronze Age",
  "The Iron Age",
  "The Great Depression",
  "The Black Death",
  "The Spanish Flu",
  "The Boston Tea Party",
  "The Boston Massacre",
  "The Salem Witch Trials",
  "The California Gold Rush",
  "The Oregon Trail",
  "The Trail of Tears",
  "The Underground Railroad",
  "Manifest Destiny",
  "The Alamo",
  "Pearl Harbor",
  "D-Day",
  "The Holocaust",
  "The Manhattan Project",
  "The Space Race",
  "The Moon Landing",
  "The Fall of Berlin Wall",
  "The Fall of Rome",
  "The Rise of Christianity",
  "The Mongol Invasions",
  "The Hundred Years War",
  "The War of the Roses",
  "The Thirty Years War",
  "The Seven Years War",
  "The Napoleonic Wars",
  "The Punic Wars",
  "The Peloponnesian War",
  "The Trojan War",
  "The Battle of Hastings",
  "The Battle of Waterloo",
  "The Battle of Gettysburg",
  "The Battle of Stalingrad",
  "The Siege of Constantinople",
  "The Conquest of Mexico",
  "The Conquest of Peru",
  "The Age of Exploration",
  "The Scientific Revolution",
  "The Agricultural Revolution",
  "The Neolithic Revolution",
  "The Protestant Reformation",
  "The Counter-Reformation",
  "The Great Schism",
  "The Inquisition",
  "The Reconquista",
  "The Ottoman Empire",
  "The Byzantine Empire",
  "The Holy Roman Empire",
  "The British Empire",
  "The Roman Empire",
  "The Persian Empire",
  "The Mongol Empire",
  "The Chinese Empire",
  "The Japanese Empire",
  "The Russian Empire",
  "The Spanish Empire",
  "The French Empire",
  "The Egyptian Empire",
  "The Babylonian Empire",
];

// Time periods and eras (60 items)
const timePeriods = [
  "Ancient Times",
  "Classical Antiquity",
  "The Medieval Era",
  "The Renaissance Period",
  "The Baroque Era",
  "The Age of Enlightenment",
  "The Victorian Era",
  "The Edwardian Era",
  "The Roaring Twenties",
  "The Great Depression Era",
  "The World War Era",
  "The Cold War Period",
  "The Modern Age",
  "The Digital Age",
  "The Stone Age",
  "The Bronze Age",
  "The Iron Age",
  "The Classical Period",
  "The Hellenistic Period",
  "The Roman Era",
  "The Byzantine Period",
  "The Early Middle Ages",
  "The High Middle Ages",
  "The Late Middle Ages",
  "The Early Renaissance",
  "The High Renaissance",
  "The Northern Renaissance",
  "The Age of Discovery",
  "The Colonial Period",
  "The Revolutionary Period",
  "The Napoleonic Era",
  "The Industrial Age",
  "The Gilded Age",
  "The Progressive Era",
  "The Jazz Age",
  "The Depression Years",
  "The War Years",
  "The Post-War Era",
  "The Space Age",
  "The Information Age",
  "The 15th Century",
  "The 16th Century",
  "The 17th Century",
  "The 18th Century",
  "The 19th Century",
  "The 20th Century",
  "The 21st Century",
  "Ancient Egypt",
  "Ancient Greece",
  "Ancient Rome",
  "Ancient China",
  "Ancient India",
  "Ancient Mesopotamia",
  "Ancient Persia",
  "Medieval Europe",
  "Medieval Asia",
  "Colonial America",
  "Imperial Russia",
  "Imperial Japan",
  "Feudal Japan",
];

// Geographic regions and places (70 items)
const regions = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "The Mediterranean",
  "The Middle East",
  "The Far East",
  "The New World",
  "The Old World",
  "The Western World",
  "The Eastern World",
  "Ancient Egypt",
  "Ancient Greece",
  "Ancient Rome",
  "The Roman Empire",
  "The British Isles",
  "England",
  "Scotland",
  "Ireland",
  "Wales",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Portugal",
  "Russia",
  "China",
  "Japan",
  "India",
  "Persia",
  "Arabia",
  "Mesopotamia",
  "Babylon",
  "Jerusalem",
  "Constantinople",
  "Vienna",
  "Paris",
  "London",
  "Rome",
  "Athens",
  "Sparta",
  "Troy",
  "Carthage",
  "Alexandria",
  "Damascus",
  "Baghdad",
  "Mecca",
  "Medina",
  "Tibet",
  "Mongolia",
  "Siberia",
  "The Balkans",
  "Scandinavia",
  "The Low Countries",
  "The Iberian Peninsula",
  "The Italian Peninsula",
  "The Crimea",
  "The Caucasus",
  "The Levant",
  "The Holy Land",
  "The Promised Land",
  "The New World",
  "The Americas",
  "The Caribbean",
  "The Pacific",
  "The Atlantic",
  "The Indian Ocean",
  "The Silk Road",
  "The Spice Route",
];

// Themes and subjects (50 items)
const themes = [
  "War and Peace",
  "Love and Betrayal",
  "Power and Corruption",
  "Faith and Doubt",
  "Honor and Shame",
  "Freedom and Slavery",
  "Civilization and Barbarism",
  "Order and Chaos",
  "Tradition and Progress",
  "East and West",
  "Rich and Poor",
  "King and Commoner",
  "Master and Servant",
  "Sacred and Profane",
  "Life and Death",
  "Hope and Despair",
  "Victory and Defeat",
  "Rise and Fall",
  "Creation and Destruction",
  "Unity and Division",
  "Politics",
  "Religion",
  "Culture",
  "Economics",
  "Military",
  "Diplomacy",
  "Trade",
  "Exploration",
  "Discovery",
  "Innovation",
  "Art",
  "Science",
  "Philosophy",
  "Literature",
  "Architecture",
  "Medicine",
  "Agriculture",
  "Technology",
  "Navigation",
  "Warfare",
  "Conquest",
  "Empire",
  "Revolution",
  "Reform",
  "Renaissance",
  "Enlightenment",
  "Colonization",
  "Immigration",
  "Slavery",
  "Abolition",
];

// Suffixes and endings (40 items)
const suffixes = [
  "A Historical Analysis",
  "Through the Ages",
  "And Its Legacy",
  "From Beginning to End",
  "A Complete Chronicle",
  "In Historical Perspective",
  "A Comprehensive Study",
  "An In-Depth Look",
  "The Definitive Account",
  "A Scholarly Examination",
  "The Untold Truth",
  "Behind the Scenes",
  "The Real Story",
  "Facts and Myths",
  "Truth and Legend",
  "History and Myth",
  "Past and Present",
  "Then and Now",
  "A New Perspective",
  "A Fresh Look",
  "Revisited",
  "Reconsidered",
  "Reexamined",
  "Revealed",
  "Uncovered",
  "Exposed",
  "Decoded",
  "Explained",
  "Analyzed",
  "Explored",
  "Investigated",
  "Documented",
  "Chronicled",
  "Recorded",
  "Remembered",
  "Forgotten",
  "Lost and Found",
  "Hidden Truths",
  "Secret Stories",
  "Untold Tales",
];

// Function to generate a single random title
function generateRandomTitle(): string {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Randomly choose between different combination patterns
  const patterns = [
    () => {
      // Pattern 1: Prefix + Historical Figure + Time Period
      const figure = historicalFigures[Math.floor(Math.random() * historicalFigures.length)];
      const period = timePeriods[Math.floor(Math.random() * timePeriods.length)];
      return `${prefix} ${figure} in ${period}`;
    },
    () => {
      // Pattern 2: Prefix + Historical Event + Region
      const event = historicalEvents[Math.floor(Math.random() * historicalEvents.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      return `${prefix} ${event} in ${region}`;
    },
    () => {
      // Pattern 3: Prefix + Theme + Suffix
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return `${prefix} ${theme}: ${suffix}`;
    },
    () => {
      // Pattern 4: Prefix + Region + Time Period
      const region = regions[Math.floor(Math.random() * regions.length)];
      const period = timePeriods[Math.floor(Math.random() * timePeriods.length)];
      return `${prefix} ${region} During ${period}`;
    },
    () => {
      // Pattern 5: Simple combination
      const figure = historicalFigures[Math.floor(Math.random() * historicalFigures.length)];
      return `${prefix} ${figure}`;
    },
  ];

  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
}

// Function to generate multiple unique titles
function generateUniqueHistoryTitles(count: number): string[] {
  const titles = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops

  while (titles.size < count && attempts < maxAttempts) {
    const title = generateRandomTitle();
    titles.add(title);
    attempts++;
  }

  return Array.from(titles);
}

// Function to generate all possible combinations (warning: this could be millions of titles)
function generateAllCombinations(): string[] {
  const allTitles: string[] = [];

  // Generate all combinations of Pattern 1: Prefix + Figure + Time Period
  for (const prefix of prefixes) {
    for (const figure of historicalFigures) {
      for (const period of timePeriods) {
        allTitles.push(`${prefix} ${figure} in ${period}`);
      }
    }
  }

  return allTitles;
}

// Calculate maximum possible unique combinations
function calculateMaxCombinations(): number {
  // Pattern 1: prefixes × figures × periods = 50 × 100 × 60 = 300,000
  // Pattern 2: prefixes × events × regions = 50 × 80 × 70 = 280,000
  // Pattern 3: prefixes × themes × suffixes = 50 × 50 × 40 = 100,000
  // Pattern 4: prefixes × regions × periods = 50 × 70 × 60 = 210,000
  // Pattern 5: prefixes × figures = 50 × 100 = 5,000
  // Total theoretical max: 895,000+ unique combinations

  const pattern1 = prefixes.length * historicalFigures.length * timePeriods.length;
  const pattern2 = prefixes.length * historicalEvents.length * regions.length;
  const pattern3 = prefixes.length * themes.length * suffixes.length;
  const pattern4 = prefixes.length * regions.length * timePeriods.length;
  const pattern5 = prefixes.length * historicalFigures.length;

  return pattern1 + pattern2 + pattern3 + pattern4 + pattern5;
}

// Example usage:
console.log(`Maximum possible combinations: ${calculateMaxCombinations().toLocaleString()}`);
console.log("\nGenerating 10 sample titles:");
const sampleTitles = generateUniqueHistoryTitles(10);
sampleTitles.forEach((title, index) => {
  console.log(`${index + 1}. ${title}`);
});

console.log("\nGenerating 100 titles to show variety:");
const hundredTitles = generateUniqueHistoryTitles(100);
console.log(`Generated ${hundredTitles.length} unique titles`);
console.log("First 20:");
hundredTitles.slice(0, 20).forEach((title, index) => {
  console.log(`${index + 1}. ${title}`);
});

// Comment out the export for now to run as a script
/*
export {
  prefixes,
  historicalFigures,
  historicalEvents,
  timePeriods,
  regions,
  themes,
  suffixes,
  generateRandomTitle,
  generateUniqueHistoryTitles,
  generateAllCombinations,
  calculateMaxCombinations,
};
*/
