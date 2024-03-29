/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import React, { useLayoutEffect, useRef } from "react";
import styles from "./styles.module.css";

const Scroll = (props: {
  children: React.ReactNode;
  gap: string;
  className?: string;
  ["data-test"]?: string;
}): React.ReactNode => {
  const scrollerRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller != null) {
      scroller.style.setProperty("--block-gap", props.gap);
      const allBlocks: NodeListOf<HTMLElement> = scroller?.querySelectorAll(
        `.${styles.blocks}`,
      );
      Array.from(allBlocks).forEach((blocks) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const header = blocks.querySelector(`.${styles.header}`)!;
        const headerHeight = header.getBoundingClientRect().height;
        blocks.style.setProperty("--top-padding", headerHeight + "px");
      });
    }
  }, [props.gap]);

  const onScroll = (): void => {
    const scroller = scrollerRef.current;
    if (scroller == null) return;
    const allBlocks = scroller.querySelectorAll(
      `.${styles.blocks}`,
    ) as NodeListOf<HTMLDivElement>;
    let blockRightOffset = 0;
    let blockLefttOffset = 0;
    Array.from(allBlocks).forEach((blocks, index, array) => {
      const scrollOffset = scroller.scrollLeft;
      const gap = parseInt(props.gap.split("px")[0]);
      blockRightOffset +=
        index === array.length - 1
          ? blocks.getBoundingClientRect().width
          : blocks.getBoundingClientRect().width + gap;
      blockLefttOffset +=
        index === 0
          ? 0
          : allBlocks[index - 1].getBoundingClientRect().width + gap;
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const header = blocks.querySelector(
        `.${styles.header}`,
      ) as HTMLDivElement;
      const headerWidth = header.getBoundingClientRect().width;
      const blockWidth =
        index === array.length - 1
          ? blocks.getBoundingClientRect().width
          : blocks.getBoundingClientRect().width + gap;
      const scrollerLeftOffset = scroller.getBoundingClientRect().left;

      // Left aligned
      if (scrollOffset <= blockLefttOffset) {
        header.classList.remove(styles["header--right"]);
        header.classList.remove(styles["header--fixed"]);
        return;
      }
      // Right aligned
      if (blockRightOffset - scrollOffset - gap < headerWidth) {
        header.style.setProperty(
          "--left-offset",
          scrollOffset + blockWidth - headerWidth + "px",
        );
        header.classList.remove(styles["header--fixed"]);
        header.classList.add(styles["header--right"]);
        return;
      }
      // Fixed & Left aligned
      header.classList.add(styles["header--fixed"]);
      header.classList.remove(styles["header--right"]);
      header.style.setProperty("--left-offset", scrollerLeftOffset + "px");
    });
  };
  return (
    <div
      onScroll={onScroll}
      className={`${styles.scroller} ${props.className ?? ""}`}
      ref={scrollerRef as React.LegacyRef<HTMLDivElement>}
      data-test={props["data-test"]}
    >
      {props.children}
    </div>
  );
};

const Group = (props: {
  children: React.ReactNode;
  "data-test"?: string;
}): React.ReactNode => {
  return (
    <div className={styles.blocks} data-test={props["data-test"]}>
      {props.children}
    </div>
  );
};

const Title = (props: {
  children: React.ReactNode;
  ["data-test"]?: string;
}): React.ReactNode => {
  return (
    <div className={styles.header} data-test={props["data-test"]}>
      {props.children}
    </div>
  );
};

const Item = (props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactNode => {
  return <div className={`${props.className}`}>{props.children}</div>;
};

Scroll.Group = Group;

Scroll.Title = Title;

Scroll.Item = Item;

Scroll.defaultProps = {
  gap: "10px",
};

export default Scroll;
