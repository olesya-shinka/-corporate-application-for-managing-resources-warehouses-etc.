import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemsQuery } from "../../api";
import { setItems, setSearchResults } from "../../store/slice/itemsSlice";
import { RootState } from "../../store/store";

function BodyItems() {
  const dispatch = useDispatch();
  const { data: items } = useGetItemsQuery({ page: 1 });

  interface Item {
    id: string;
    name: string;
    description: string;
    measurement_units: string;
    deposit: any;
  }

  useEffect(() => {
    if (items) {
      dispatch(setItems(items.result));
    }
  }, [items, dispatch]);

  const allItems = useSelector((state: RootState) => state.items.allItems);
  const searchResults = useSelector(
    (state: RootState) => state.items.searchResults
  );
  console.log(allItems, searchResults)

  return (
    <div className="body">
      {searchResults.length > 0
        ? searchResults.map((item: Item) => (
            <div key={item.id}>{item.name}</div>
          ))
        : allItems.map((item: Item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          ))}
    </div>
  );
}

export default BodyItems;
