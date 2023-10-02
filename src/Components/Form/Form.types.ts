import { itemDetailType } from "../../App.types";

export type FormPropsType = {
    itemDetail: itemDetailType;
    setItemDetail: React.Dispatch<React.SetStateAction<itemDetailType>>;
    addFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
    categories: { name: string; color: string }[];
    setCategories: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          color: string;
        }[]
      >
    >;
    setAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  };