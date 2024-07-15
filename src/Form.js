import React, { useRef, useState, useEffect } from "react";
import "./Form.css";
export default function Form() {
  const [items, setItems] = useState([]);
  const [model, setModel] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const next = useRef(0);
  const updatedId = useRef(0);
  function Add() {
    if (
      model.trim() !== "" &&
      vendor.trim() !== "" &&
      price.trim() !== "" &&
      imageUrl.trim() !== ""
    ) {
      next.current += 1;
      setItems([
        {
          id: next.current,
          model: model,
          vendor: vendor,
          price: price,
          imageUrl: imageUrl,
        },
        ...items,
      ]);
      setModel("");
      setVendor("");
      setPrice("");
      setImageUrl("");
    } else {
      alert("Please enter all data!");
    }
  }

  function handleElementClick(id) {
    let elementArr = items.filter((i) => i.id === id);
    updatedId.current = id;
    console.log(updatedId.current);
    setModel(elementArr[0].model);
    setVendor(elementArr[0].vendor);
    setPrice(elementArr[0].price);
    setImageUrl(elementArr[0].imageUrl);
  }
  const [shouldAdd, setShouldAdd] = useState(false);
  function Update() {
    console.log(updatedId.current);
    setItems((prevItems) => {
      const newItems = prevItems.filter((i) => i.id !== updatedId.current);
      return newItems;
    });
    setShouldAdd(true);
  }
  useEffect(() => {
    if (shouldAdd) {
      Add();
      setShouldAdd(false);
    }
  }, [shouldAdd]);

  function handleOrder(e) {
    let newItems = [...items];
    let n = newItems.length;
    let swapped;
    console.log(e.target.value);
    if (e.target.value === "a-z") {
      do {
        swapped = false;
        for (let i = 1; i < n; i++) {
          if (newItems[i - 1].price > newItems[i].price) {
            let temp = newItems[i - 1];
            newItems[i - 1] = newItems[i];
            newItems[i] = temp;
            swapped = true;
          }
        }
        n--;
      } while (swapped);
      setItems(newItems);
    }
    else if (e.target.value === "z-a") {
      do {
        swapped = false;
        for (let i = 1; i < n; i++) {
          if (newItems[i - 1].price < newItems[i].price) {
            let temp = newItems[i - 1];
            newItems[i - 1] = newItems[i];
            newItems[i] = temp;
            swapped = true;
          }
        }
        n--;
      } while (swapped);
      setItems([...newItems]);
    }
    console.log(newItems);
  }
  return (
    <section className="main-section">
      <section className="input-section">
        <h2>Model</h2>
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          name="model"
          placeholder="enter model"
        ></input>
        <h2>Vendor</h2>
        <input
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          name="vendor"
          placeholder="enter vendor"
        ></input>
        <h2>Price</h2>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          type="number"
        ></input>
        <h2>Image url</h2>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name="imageUrl"
          placeholder="enter image url"
        ></input>
        <div>
          <button onClick={Add}>Add</button>
          <button onClick={Update}>Update</button>
        </div>
      </section>
      <section className="output-section">
        <select
          onChange={(e) => handleOrder(e)}
          name="orders"
          id="orders"
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <ul>
          {Array.isArray(items) &&
            items.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  handleElementClick(item.id);
                }}
              >
                <img src={item.imageUrl} alt="img"></img>
                <section>
                  <h3>
                    Model : <span>{item.model}</span>
                  </h3>

                  <h3>
                    Vendor : <span>{item.vendor}</span>
                  </h3>

                  <h3>
                    Price : <span>{item.price}</span>
                  </h3>
                </section>
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
}
