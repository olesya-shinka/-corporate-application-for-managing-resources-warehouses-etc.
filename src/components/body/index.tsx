import { useEffect, useState } from "react";
import "./style.css";
import { getItems, login } from "../../api";

function BodyItems() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(null);
  useEffect(() => {
    login("username", "password")
      .then((newToken) => {
        setToken(newToken);
        getItems(newToken)
          .then((data) => {
            setItems(data);
          })
          .catch((error) => {
            console.error("Failed to fetch items:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  }, []);
  console.log(items);
  console.log(token);
  return <div className="body"></div>;
}

export default BodyItems;
