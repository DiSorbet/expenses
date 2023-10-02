import React from "react";
import styles from "./Categories.module.scss";
import { AiFillDelete, AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { itemDetailType } from "../../App.types";
import { CountPrice } from "../../utils/CountPrice";

type categoriesProps = {
  itemsList: itemDetailType[];
  setItemsList: React.Dispatch<React.SetStateAction<itemDetailType[]>>;
  categories: { name: string; color: string }[];
  editItem: (id: string) => void;
};

const Categories = ({
  itemsList,
  setItemsList,
  categories,
  editItem,
}: categoriesProps) => {
  const [itemsInCategory, setItemsInCategory] = React.useState<
    itemDetailType[][]
  >([]);

  React.useEffect(() => {
    const filteredItems = categories.map((category, index) => {
      return itemsList.filter((item) => item.category === category.name);
    });
    const filteredItemsWithLength = filteredItems.filter(
      (items) => items.length > 0
    );
    setItemsInCategory(filteredItemsWithLength);
  }, [itemsList]);

  const deleteItem = (id: string) => {
    setItemsList(itemsList.filter((item) => item.id !== id));
  };
  return (
    <div className={styles.root}>
      {itemsInCategory.map((items, index) => {
        return (
          <div
            key={index}
            className={`${styles.category} ${
              styles[`color--${items[0].color}`]
            }  `}
          >
            <h3>Категория: {items[0].category}</h3>
            {items.map((item: itemDetailType, index: number) => {
              return (
                <section className={styles.addedItem} key={index}>
                  <p>
                    {index + 1}) {item.formattedDate} {item.title} Цена:{" "}
                    {item.price.toLocaleString("ru-RU", { useGrouping: true })}
                    руб.{" "}
                  </p>
                  <AiFillEdit
                    onClick={() => editItem(item.id)}
                    className={styles.icon}
                  />
                  <AiFillDelete
                    onClick={() => deleteItem(item.id)}
                    className={styles.icon}
                  />
                </section>
              );
            })}
            <h3>
              Итого:{" "}
              {CountPrice(items).toLocaleString("ru-RU", { useGrouping: true })}{" "}
              рублей
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
