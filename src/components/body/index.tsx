import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemsQuery } from "../../api";
import { setItems } from "../../store/slice/itemsSlice";
import { RootState } from "../../store/store";
import Pagination from "../pagination";

function BodyItems() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: items } = useGetItemsQuery({ page, pageSize });

  interface Item {
    id: string;
    name: string;
    description: string;
    measurement_units: string;
    deposit: any;
    code: string;
  }

  useEffect(() => {
    if (items) {
      dispatch(setItems(items.result));
    }
  }, [items, dispatch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const totalPages = items ? Math.ceil(items.total / pageSize) : 0;
  const allItems = useSelector((state: RootState) => state.items.allItems);
  const searchResults = useSelector(
    (state: RootState) => state.items.searchResults
  );
  console.log(allItems, searchResults);

  return (
    <div className="body-content">
      <div className="body-header">
        <div>
          <h2 className="body-header-title">
            Склад ЗИП <span> {allItems.length}</span>
          </h2>
        </div>
        <div className="body-header-box">
          <div>
            <input type="text" className="body-header-input" />
            <button className="body-header-input-btn">Поиск</button>
          </div>
          <button className="body-header-btn-new">
            <img src="plus-02.svg" alt="+" />
            Новая позиция
          </button>
        </div>
      </div>
      <div className="body-table">
        <div className="body-table-column">
          <div className="body-table-subtitle-div">
            <h2 className="body-table-subtitle">Название</h2>
          </div>
          {allItems.map((item: Item, id) => (
            <div className="body-table-text-div" key={id}>
              <p className="body-table-text">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="body-table-column">
          <div className="body-table-subtitle-div">
            <h2 className="body-table-subtitle">Единица измерения</h2>
          </div>
          {allItems.map((item: Item, id) => (
            <div className="body-table-text-div" key={id}>
              <p className="body-table-text">{item.measurement_units}</p>
            </div>
          ))}
        </div>
        <div className="body-table-column">
          <div className="body-table-subtitle-div">
            <h2 className="body-table-subtitle">Артикул/код</h2>
          </div>
          {allItems.map((item: Item, id) => (
            <div className="body-table-text-div" key={id}>
              <p className="body-table-text">{item.code}</p>
              <button className="body-table-edit-btn">
                <img src="edit-02.svg" alt="edit" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
        <div className="pagination-select">
          <p className="pagination-text">Показывать по:</p>
          <select
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            value={pageSize}
            className="custom-select"
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="50">70</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BodyItems;
