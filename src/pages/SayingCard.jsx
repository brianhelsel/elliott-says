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
      <div className={styles.sayingText}>
        {Array.isArray(saying.content) ? (
          saying.content.map((line, i) => (
            <p key={i} className={styles.dialogueLine}>
              <strong>{line.speaker}:</strong> {line.text}
            </p>
          ))
        ) : (
          <p>{saying.content}</p>
        )}
      </div>
      <div className={styles.sayingMeta}>
        <span className={styles.ageBadge}>Age {saying.age}</span>
        <span className={styles.dateStamp}>{formatDate(saying.time)}</span>
      </div>
    </div>
  );
}
