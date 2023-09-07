import React from "react";
import { categories2 } from "../App";

const Form = ({ itemDetail, setItemDetail, addFunction }) => {
  return (
    <form>
      <label htmlFor="name"> На что я потратил деньги сегодня:</label>
      <input
        value={itemDetail.title}
        onChange={(e) =>
          setItemDetail({ ...itemDetail, title: e.target.value })
        }
        id="name"
        htmlFor="name"
        placeholder="Название покупки"
      />
      <label htmlFor="category">Категория:</label>
      <select
        onChange={(e) => {
          const value = e.target.value.split(",");
          const category = value[0];
          const color = value[1];
          setItemDetail({
            ...itemDetail,
            category: category,
            color: color,
          });
        }}
        htmlFor="category"
      >
        {categories2.map((item, index) => {
          return (
            <option
              key={index}
              value={`${item.name},${item.color}`}
              htmlFor="category"
            >
              {item.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="price">Цена:</label>
      <input
        value={itemDetail.price}
        onChange={(e) =>
          setItemDetail({ ...itemDetail, price: e.target.value })
        }
        type="number"
        placeholder="Укажите цену"
      />
      <button onClick={addFunction}>Добавить</button>
    </form>
  );
};

export default Form;
