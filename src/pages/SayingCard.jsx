// SayingCard.jsx
import { formatDate } from "../components/utils";
import styles from "./SayingCard.module.css";

export function SayingCard({ saying, index }) {
  const cardClasses = [
    styles.sayingCard,
    saying.favorite ? styles.favorite : "",
    saying.type === "funny" ? styles.typeIconFunny : "",
    saying.type === "sweet" ? styles.typeIconSweet : "",
    saying.type === "clever" ? styles.typeIconClever : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} style={{ animationDelay: `${index * 0.1}s` }}>
      <p className={styles.sayingText}>{saying.content}</p>
      <div className={styles.sayingMeta}>
        <span className={styles.ageBadge}>Age {saying.age}</span>
        <span className={styles.dateStamp}>{formatDate(saying.time)}</span>
      </div>
    </div>
  );
}
