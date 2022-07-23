import { useEffect, useState } from "react";
import { setCookie, getCookie } from "react-use-cookie";
import "./App.css";
import EditItem from "./components/EditItem";
import Item from "./components/Item";
import { item } from "./interfaces";

function App() {
  const [items, setItems] = useState<item[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      const cookieItems = JSON.parse(getCookie("items"));
      const cookieDate = Number(getCookie("date"));
      const today = new Date();
      if (cookieDate !== today.getDate()) {
        const resetCookieItems = cookieItems.map((item: any) => {
          return {
            ...item,
            checkboxes: item.checkboxes.map(() => false),
            complete: false,
          };
        });
        setItems(resetCookieItems);
      } else {
        setItems(cookieItems);
      }
    } catch (error) {
      setItems([]);
    }
  }, []);

  const initLinesNum = Math.max(
    Math.trunc((window.innerHeight - 200) / 80),
    items.length
  );
  const linesNum = editing ? initLinesNum : initLinesNum + 1;
  const linesArray = Array(linesNum).fill(0);

  const changeEditing = () => {
    setEditing(!editing);
    setCookie("items", JSON.stringify(items));
    setCookie("date", JSON.stringify(new Date().getDate()));
  };
  const addItem = (e: any) => {
    setItems([
      ...items,
      {
        id: Math.floor(Math.random() * 100000000),
        title: "New Item",
        numCheckboxes: 1,
        checkboxes: [false],
        complete: false,
      },
    ]);
    setCookie("items", JSON.stringify(items));
    setCookie("date", JSON.stringify(new Date().getDate()));
  };

  return (
    <div className="app">
      <div className="grid-area top-left"></div>
      <div className="grid-area top-right">
        <h1 className="h1">To-Do List</h1>
        <div className="btn-wrap">
          {editing ? (
            <button className="btn create" onClick={addItem}>
              Create Item
            </button>
          ) : (
            ""
          )}
          <button className="btn edit" onClick={changeEditing}>
            {editing ? "Quit Editing" : "Edit Items"}
          </button>
        </div>
      </div>
      <div className="grid-area bottom-left">
        {linesArray.map((_, i) => (
          <div key={i} className="line"></div>
        ))}
      </div>
      <div className="grid-area bottom-right">
        {editing ? (
          <div className="line">
            <div className="edit-headers">
              <div className="title">Title</div>
              <div className="qty">Quantity</div>
              <div></div>
            </div>
          </div>
        ) : (
          ""
        )}
        {linesArray.map((_, i) => (
          <div key={i} className="line">
            {items[i] ? (
              editing ? (
                <EditItem i={i} items={items} setItems={setItems} />
              ) : (
                <Item i={i} items={items} setItems={setItems} />
              )
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
