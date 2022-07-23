import { item } from "../interfaces";
import styles from "./Item.module.css";
import { setCookie } from "react-use-cookie";
import { useEffect } from "react";

interface props {
  i: number;
  items: item[];
  setItems: Function;
}

function Item({ i, items, setItems }: props) {
  useEffect(() => {
    setCookie("items", JSON.stringify(items));
    setCookie("date", JSON.stringify(new Date().getDate()));
  }, [items]);

  const switchCheckbox = (e: any) => {
    setItems(
      items.map((item) => {
        if (items[i].id === item.id) {
          const newCheckboxes = item.checkboxes.map((checkbox, j) => {
            if (Number(e.currentTarget.dataset.index) === j) {
              return !checkbox;
            }
            return checkbox;
          });
          return {
            ...item,
            checkboxes: newCheckboxes,
            complete: newCheckboxes.every((val) => val === true),
          };
        }
        return item;
      })
    );
  };
  return (
    <div className={styles["item-wrap"]}>
      <div
        className={`${styles.title} ${
          items[i].complete ? styles.complete : ""
        }`}
      >
        {items[i].title}
      </div>
      <div className={styles["checkbox-container"]}>
        {items[i].checkboxes.map((checked, j) => (
          <label key={j} className={styles["checkbox-wrap"]}>
            <input
              data-index={j}
              type="checkbox"
              onChange={switchCheckbox}
              checked={checked}
            />
            <span className={styles.checkmark}></span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Item;
