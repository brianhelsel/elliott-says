// HomePage.jsx
import { useState, useEffect } from "react";
import {
  calculateAge,
  getAgeInMonths,
  categorizeContent,
} from "../components/utils";
import { SayingCard } from "./SayingCard";
import styles from "./HomePage.module.css";
import sayingsData from "../data/ElliottSays.json";

// Elliott's birthday - UPDATE THIS!
const ELLIOTT_BIRTHDAY = new Date("2019-12-27"); // Format: YYYY-MM-DD

export function HomePage() {
  const [sayings, setSayings] = useState([]);
  const [displayedSayings, setDisplayedSayings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [ageFilter, setAgeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("all");
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    loadSayings();
  }, []);

  useEffect(() => {
    filterAndSortSayings();
  }, [sayings, ageFilter, sortOrder]);

  async function loadSayings() {
    try {
      const data = sayingsData;

      // Process sayings with age calculation
      const processedSayings = data.map((saying) => {
        // Parse the timestamp format "2025-03-01 13:54:00"
        const sayingDate = new Date(saying.time.replace(" ", "T"));
        const age = calculateAge(ELLIOTT_BIRTHDAY, sayingDate);
        const ageInMonths = getAgeInMonths(ELLIOTT_BIRTHDAY, sayingDate);
        const type = categorizeContent(saying.content);

        return {
          ...saying,
          age,
          ageInMonths,
          type,
          favorite: false, // You can manually set favorites in the JSON
        };
      });

      setSayings(processedSayings);
      setLoading(false);
    } catch (err) {
      console.error("Error loading sayings:", err);
      setError(
        "Could not load sayings. Make sure sayings.json exists in the public folder!"
      );
      setLoading(false);
    }
  }

  function filterAndSortSayings() {
    let filtered = [...sayings];

    // Apply age filter
    if (ageFilter !== "all") {
      filtered = filtered.filter((s) => {
        const years = Math.floor(s.ageInMonths / 12);
        switch (ageFilter) {
          case "0-2":
            return years < 2;
          case "2-3":
            return years === 2;
          case "3+":
            return years >= 3;
          default:
            return true;
        }
      });
    }

    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.time.replace(" ", "T")).getTime();
      const dateB = new Date(b.time.replace(" ", "T")).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setDisplayedSayings(filtered);
  }

  function getRandomQuote() {
    if (displayedSayings.length === 0) return;

    const randomIndex = Math.floor(Math.random() * displayedSayings.length);
    setRandomQuote(displayedSayings[randomIndex]);
    setViewMode("random");
  }

  function showAllQuotes() {
    setViewMode("all");
    setRandomQuote(null);
  }

  function toggleSort() {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  }

  if (loading) {
    return (
      <div className={styles.elliottSaysApp}>
        <main className={styles.main}>
          <h1 className={styles.appTitle}>Elliott Says!</h1>
          <div className={styles.loading}>Loading sayings... ✨</div>
        </main>
      </div>
    );
  }

  if (error && sayings.length === 0) {
    return (
      <div className={styles.elliottSaysApp}>
        <main className={styles.main}>
          <h1 className={styles.appTitle}>Elliott Says!</h1>
          <div className={styles.error}>
            <p>{error}</p>
            <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
              Create a file called <code>sayings.json</code> in your{" "}
              <code>/data/</code> folder with this format:
            </p>
            <pre
              style={{
                textAlign: "left",
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "0.8rem",
                overflow: "auto",
              }}
            >
              {`[
  {
    "sender": "Mom",
    "time": "2025-03-01 13:54:00",
    "content": "Your saying here!"
  }
]`}
            </pre>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.elliottSaysApp}>
      <main className={styles.main}>
        <h1 className={styles.appTitle}>Elliott Says!</h1>

        <div className={styles.controls}>
          <button
            className={`${styles.randomButton} ${
              viewMode === "random" ? styles.active : ""
            }`}
            onClick={getRandomQuote}
          >
            🎲 Random Quote
          </button>
          <button
            className={`${styles.filterButton} ${
              viewMode === "all" ? styles.active : ""
            }`}
            onClick={showAllQuotes}
          >
            📚 Show All ({displayedSayings.length})
          </button>

          <div className={styles.divider}></div>

          <button
            className={`${styles.filterButton} ${
              ageFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setAgeFilter("all")}
          >
            All Ages
          </button>
          <button
            className={`${styles.filterButton} ${
              ageFilter === "0-2" ? styles.active : ""
            }`}
            onClick={() => setAgeFilter("0-2")}
          >
            0-2 years
          </button>
          <button
            className={`${styles.filterButton} ${
              ageFilter === "2-3" ? styles.active : ""
            }`}
            onClick={() => setAgeFilter("2-3")}
          >
            2-3 years
          </button>
          <button
            className={`${styles.filterButton} ${
              ageFilter === "3+" ? styles.active : ""
            }`}
            onClick={() => setAgeFilter("3+")}
          >
            3+ years
          </button>

          <div className={styles.divider}></div>

          <button className={styles.sortButton} onClick={toggleSort}>
            {sortOrder === "newest" ? "↓ Newest First" : "↑ Oldest First"}
          </button>
        </div>

        {viewMode === "random" && randomQuote ? (
          <div className={styles.sayingsContainer}>
            <SayingCard saying={randomQuote} index={0} />
          </div>
        ) : displayedSayings.length === 0 ? (
          <div className={styles.emptyState}>
            No sayings found for this filter! 🤔
          </div>
        ) : (
          <div className={styles.sayingsContainer}>
            {displayedSayings.map((saying, index) => (
              <SayingCard
                key={`${saying.time}-${index}`}
                saying={saying}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
