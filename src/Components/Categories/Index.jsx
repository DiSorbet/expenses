import React from "react";
import styles from './Categories.module.scss'

import { AiFillDelete, AiFillEdit,AiOutlineCloseCircle } from "react-icons/ai";
const Categories = ({
  itemsList,
  setItemsList,
  categories,
  setCategories,
  editItem,
}) => {
  const [itemsInCategory, setItemsInCategory] = React.useState([]);

  React.useEffect(() => {
    const filteredItems = categories.map((category, index) => {
      return itemsList.filter((item) => item.category === category.name);
    });
    setItemsInCategory(filteredItems.filter((items) => items.length > 0));
  }, [itemsList]);

  const deleteItem = (id) => {
    setItemsList(itemsList.filter((item) => item.id !== id));
  };
  return (
    <div className={styles.root}>
      {itemsInCategory.map((items, index) => {
        return (
          <div key={index} className={`${styles.category} ${styles[`color--${items[0].color}`]}  `}>
            <h3>Категория: {items[0].category}</h3>
            {items.map((item, index) => {
              return (
                <div className={styles.addedItem}>
                  <p key={index}>
                    {index + 1}) {item.formattedDate} {item.title} Цена:{" "}
                    {item.price}руб.{" "}
                  </p>
                  <AiFillEdit
                    onClick={() => editItem(item.id)}
                    className={styles.icon}
                  />
                  <AiFillDelete
                    onClick={() => deleteItem(item.id)}
                    className={styles.icon}
                  />
                </div>
              );
            })}
            <h3>
              Итого:{" "}
              {items
                .map((item, index) => Number(item.price))
                .reduce((a, b) => a + b)}
              рублей{" "}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;