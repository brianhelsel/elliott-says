// utils.js
export function calculateAge(birthDate, sayingDate) {
  const years = sayingDate.getFullYear() - birthDate.getFullYear();
  const months = sayingDate.getMonth() - birthDate.getMonth();
  const days = sayingDate.getDate() - birthDate.getDate();

  let totalMonths = years * 12 + months;

  // Adjust if the day hasn't occurred yet this month
  if (days < 0) {
    totalMonths--;
  }

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  if (displayYears === 0) {
    return `${displayMonths} month${displayMonths !== 1 ? "s" : ""}`;
  } else if (displayMonths === 0) {
    return `${displayYears} year${displayYears !== 1 ? "s" : ""}`;
  } else {
    return `${displayYears}y ${displayMonths}m`;
  }
}

export function getAgeInMonths(birthDate, sayingDate) {
  const years = sayingDate.getFullYear() - birthDate.getFullYear();
  const months = sayingDate.getMonth() - birthDate.getMonth();
  const days = sayingDate.getDate() - birthDate.getDate();

  let totalMonths = years * 12 + months;

  if (days < 0) {
    totalMonths--;
  }

  return totalMonths;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function categorizeContent(content) {
  if (!content) return undefined;

  // Handle array format (new structure)
  let textToAnalyze = "";
  if (Array.isArray(content)) {
    textToAnalyze = content
      .map((line) => line.text || "")
      .join(" ")
      .toLowerCase();
  } else {
    // Handle string format (old structure)
    textToAnalyze = content.toLowerCase();
  }

  // Simple keyword-based categorization
  const funnyWords = ["poop", "butt", "fart", "silly", "funny"];
  const sweetWords = ["love", "hug", "kiss", "miss", "heart"];
  const cleverWords = ["because", "why", "how", "what if", "maybe"];

  if (funnyWords.some((word) => textToAnalyze.includes(word))) {
    return "funny";
  }
  if (sweetWords.some((word) => textToAnalyze.includes(word))) {
    return "sweet";
  }
  if (cleverWords.some((word) => textToAnalyze.includes(word))) {
    return "clever";
  }

  return undefined;
}
