import React from "react";
import {AiOutlineClose } from "react-icons/ai";


const Form = ({
  itemDetail,
  setItemDetail,
  addFunction,
  categories,
  setCategories,
}) => {
  const randomColor = [
    "food",
    "leisure",
    "beauty",
    "clothes",
    "transport",
    "credit",
  ];
  const [isCustomCategory, setIsCustomCategory]=React.useState(false)
  const handleDate = (e) => {
    const date = new Date(e.target.value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}.${month > 9 ? month : `0${month}`}.${year}`;
    setItemDetail({
      ...itemDetail,
      date: e.target.value,
      formattedDate: formattedDate,
    });
  };

  const handleCategory = (e) => {
    let selectedCategory = e.target.value;
    if (selectedCategory == "custom") {
      setIsCustomCategory(true)
      setItemDetail({ ...itemDetail, customCategory: selectedCategory });
    } else {
      const categoryArray = categories.filter(
        (item) => item.name == selectedCategory
      );
      setItemDetail({
        ...itemDetail,
        customCategory: "",
        category: selectedCategory,
        color: categoryArray[0].color,
      });
    }
  };

  const handleCustomCategory = (e) => {
    e.preventDefault();
    if (itemDetail.customCategory && itemDetail.customCategory !=='custom') {
      const newCategory = {
        name: itemDetail.customCategory,
        color: randomColor[Math.floor(Math.random() * randomColor.length)],
      };
      setCategories((prev) => [...prev, newCategory]);
      setItemDetail({ ...itemDetail, customCategory: "" });
      setIsCustomCategory(false)
    }
  };
  return (
    <form>
      <label> На что я потратил деньги сегодня:</label>
      <label htmlFor="date">Дата:</label>
      <input
        htmlFor="date"
        value={itemDetail.date}
        type="date"
        onChange={handleDate}
      />
      <label htmlFor="name">Название покупки:</label>
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
        name="Выбери Категорию"
        value={itemDetail.category}
        onChange={handleCategory}
        htmlFor="category"
      >
        {categories.map((item, index) => {
          return (
            <option key={index} value={item.name} htmlFor="category">
              {item.name}
            </option>
          );
        })}
        <option value="custom">Создать свою категорию</option>
      </select>
      {isCustomCategory && (
        <div className="custom-category">
           <AiOutlineClose className="close--icon" onClick={()=>setIsCustomCategory(false)}/>
          <label htmlFor="new--category"> Новая категория: </label>
          <input className="new--category"
            onChange={(e) =>
              setItemDetail({ ...itemDetail, customCategory: e.target.value })
            }
            placeholder="Название новой категории"
          />
          <button onClick={handleCustomCategory}>Подтвердить </button>
        </div>
      )}
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
