import { item } from "../interfaces";
import styles from "./EditItem.module.css";

interface props {
  i: number;
  items: item[];
  setItems: Function;
}

function EditItem({ i, items, setItems }: props) {
  const changeTitle = (e: any) => {
    setItems(
      items.map((item) => {
        if (item.id === items[i].id) {
          return {
            ...item,
            title: e.currentTarget.value,
          };
        }
        return item;
      })
    );
  };
  const deleteItem = () => {
    setItems(
      items.filter((item) => {
        if (item.id === items[i].id) {
          return false;
        }
        return true;
      })
    );
  };
  const changeNumBoxes = (e: any) => {
    setItems(
      items.map((item) => {
        if (item.id === items[i].id) {
          const val = e.target.value;
          console.log(item.numCheckboxes);
          return {
            ...item,
            numCheckboxes: Number(val) || val,
            checkboxes:
              !val || val > 10 || val < 1
                ? item.checkboxes
                : val > item.checkboxes.length
                ? [
                    ...item.checkboxes,
                    ...Array(val - item.checkboxes.length).fill(false),
                  ]
                : item.checkboxes.slice(0, val),
          };
        }
        return item;
      })
    );
  };
  return (
    <div className={styles["edit-item-wrap"]}>
      <input type="text" value={items[i].title} onChange={changeTitle} />
      <input
        type="number"
        min="1"
        max="10"
        value={items[i].numCheckboxes}
        onChange={changeNumBoxes}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default EditItem;
