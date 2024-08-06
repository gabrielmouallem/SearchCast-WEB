import React from "react";
import styles from "./LinkCarousel.module.css";

interface LinkCarouselProps {
  children: React.ReactNode;
}

export const LinkCarousel = ({ children }: LinkCarouselProps) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.slides}
        style={{
          animationDuration: `${React.Children.count(children) * 10}s`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div className={styles.item} key={index}>
            {child}
          </div>
        ))}
      </div>
      <div
        className={styles.slides}
        style={{
          animationDuration: `${React.Children.count(children) * 10}s`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div className={styles.item} key={`duplicate-${index}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
