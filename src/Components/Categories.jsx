import React from "react";
import { categories2 } from "../App";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const Categories = ({ itemsList, setItemsList,setAddItem, editItem }) => {
  const [itemsInCategory, setItemsInCategory] = React.useState([]);

  React.useEffect(() => {
    const filteredItems = categories2.map((category, index) => {
      return itemsList.filter((item) =>item.category === category.name);
    });
    setItemsInCategory(filteredItems.filter((items) =>items.length > 0));
  }, [itemsList])


  const deleteItem = (id) => {
    setItemsList(itemsList.filter(item=>item.id !==id))
  };
  return (
    <div className="categories">
      {itemsInCategory.map((items, index) => {
        return (
          <div key={index} className={`category color--${items[0].color}`}>
            <h3>Категория: {items[0].category}</h3>
            {items.map((item, index) => {
              return (
                <div className="added--item">
                  <p key={index}>
                    {index + 1} {item.title} Цена: {item.price}рублей{" "} {item.category}
                  </p>
                  <AiFillEdit onClick={()=>editItem(item.id)} className="icon" />
                  <AiFillDelete onClick={()=>deleteItem(item.id)} className="icon" />
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
