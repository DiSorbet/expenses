import React from "react";
import Form from "./Components/Form/Index";
import Categories from "./Components/Categories/Index";
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
export type itemDetailType = {
  title: string;
  category: string;
  customCategory: string;
  color: string;
  date: string;
  formattedDate: string;
  price: number;
  id: string;
};

const defaultDetailState = {
  title: "",
  category: "",
  customCategory: "",
  color: "",
  date: "",
  formattedDate: "",
  price: 0,
  id: "",
};

function App() {
  const [addItem, setAddItem] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [itemsList, setItemsList] = React.useState<itemDetailType[]>([]);
  const [editedID, setEditedID] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState(categories2);
  const [itemDetail, setItemDetail] = React.useState(defaultDetailState);

  React.useEffect(() => {
    if (itemsList.length > 0) {
      setTotalPrice(
        itemsList
          .map((item: itemDetailType) => Number(item.price))
          .reduce((a: number, b: number) => a + b)
      );
    }
  }, [itemsList]);

  const addItemFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                price: Number(itemDetail.price),
                color: itemDetail.color,
                date: itemDetail.date,
                formattedDate: itemDetail.formattedDate,
              }
            : item;
        })
      );
      setEditedID(null);
      setItemDetail(defaultDetailState);
      setAddItem(false);
    } else if (
      itemDetail.category &&
      itemDetail.title &&
      itemDetail.price > 0 &&
      itemDetail.date
    ) {
      const newItem = { ...itemDetail, id: nanoid() };
      setItemsList([...itemsList, newItem]);
      setItemDetail(defaultDetailState);
      setAddItem(false);
    }
  };

  const editItemFunction = (id: string) => {
    const specificItem = itemsList.find((item) => item.id === id);
    setAddItem(true);
    setEditedID(id);
    if (specificItem) {
      setItemDetail({
        ...itemDetail,
        title: specificItem.title,
        category: specificItem.category,
        price: specificItem.price,
        color: specificItem.color,
        date: specificItem.date,
        formattedDate: specificItem.formattedDate,
      });
    }
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
            setAddItem={setAddItem}
          />
        )}
      </section>
      <Categories
        categories={categories}
        editItem={editItemFunction}
        setItemsList={setItemsList}
        itemsList={itemsList}
      />
      {itemsList.length > 1 && totalPrice > 0 && (
        <h3>
          Итоговая сумма:{" "}
          {totalPrice.toLocaleString("ru-RU", { useGrouping: true })} рублей
        </h3>
      )}
    </>
  );
}
export default App;
