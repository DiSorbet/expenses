import { itemDetailType } from "../App.types";

export function CountPrice(items:itemDetailType[]){
    return items.map((item) => Number(item.price))
    .reduce((a: number, b: number) => a + b)
}
