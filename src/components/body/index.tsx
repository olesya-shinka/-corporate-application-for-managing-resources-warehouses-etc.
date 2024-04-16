import { useEffect, useState } from "react";
import "./style.css";
import { useGetItemsQuery } from "../../api";

function BodyItems() {
  const [page, setPage] = useState(1); 
  const { data: items } = useGetItemsQuery({ page }); 

  useEffect(() => {
    console.log(items);
  }, [items]);

  return <div className="body"></div>;
}

export default BodyItems;
