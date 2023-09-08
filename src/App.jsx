import React from "react";
import Form from "./Components/Form";
import Categories from "./Components/Categories";
import { nanoid } from "nanoid";

export const categories2 = [
  { name: "Продукты", color: "food" },
  { name: "Одежда и обувь", color: "clothes" },
  { name: "Красота и здоровье", color: "beauty" },
  { name: "Развлечения и досуг", color: "leisure" },
  { name: "Коммунальные платежи и интернет", color: "internet" },
  { name: "Кредит", color: "credit" },
  { name: "Путешествия", color: "travel" },
  { name: "Техника", color: "technique" },
  { name: "Транспорт", color: "transport" },
];

function App() {
  const [addItem, setAddItem] = React.useState(false);
  const [itemsList, setItemsList] = React.useState([]);
  const [editedID, setEditedID] = React.useState("");
  // const [customCategory,setCustomCategory]=React.useState('')
  const [categories, setCategories] = React.useState(categories2);
  const [itemDetail, setItemDetail] = React.useState({
    title: "",
    category: categories2[0].name,
    customCategory: "",
    color: categories2[0].color,
    date: "",
    formattedDate: "",
    price: "",
    id: "",
  });

  const addItemFunction = (e) => {
    e.preventDefault();
    if (
      editedID &&
      itemDetail.category &&
      itemDetail.title &&
      itemDetail.price > 0 &&
      itemDetail.date
    ) {
      setItemsList(
        itemsList.map((item) => {
          return item.id === editedID
            ? {
                ...item,
                category: itemDetail.category,
                title: itemDetail.title,
                price: itemDetail.price,
                color: itemDetail.color,
                date: itemDetail.date,
                formattedDate: itemDetail.formattedDate,
              }
            : item;
        })
      );
      setEditedID(null);
      setItemDetail({
        ...itemDetail,
        // color: "",
        title: "",
        // category: "",
        price: "",
        id: "",
        category: categories2[0].name,
        color: categories2[0].color,
        date: "",
        formattedDate: "",
      });
      setAddItem(false);
    } else if (
      itemDetail.category &&
      itemDetail.title &&
      itemDetail.price > 0 &&
      itemDetail.date
    ) {
      const newItem = { ...itemDetail, id: nanoid() };
      setItemsList([...itemsList, newItem]);
      setItemDetail({
        ...itemDetail,
        title: "",
        price: "",
        id: "",
        category: categories2[0].name,
        color: categories2[0].color,
        date: "",
        formattedDate: "",
      });
      setAddItem(false);
    }
  };

  const editItemFunction = (id) => {
    const specificItem = itemsList.find((item) => item.id === id);
    setAddItem(true);
    setEditedID(id);
    setItemDetail({
      ...itemDetail,
      title: specificItem.title,
      category: specificItem.category,
      price: specificItem.price,
      color: specificItem.color,
    });
  };
  return (
    <>
      <section className="main">
        <h1>Анализ расходов</h1>
        {!addItem && (
          <button onClick={() => setAddItem(true)}>Добавить расходы</button>
        )}

        {addItem && (
          <Form
            itemDetail={itemDetail}
            setItemDetail={setItemDetail}
            addFunction={addItemFunction}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </section>
      <Categories
        categories={categories}
        setCategories={setCategories}
        editItem={editItemFunction}
        setAddItem={setAddItem}
        setItemsList={setItemsList}
        itemsList={itemsList}
      />
    </>
  );
}
export default App;
