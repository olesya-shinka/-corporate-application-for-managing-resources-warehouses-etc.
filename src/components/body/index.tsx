/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemsQuery } from "../../api";
import { setItems } from "../../store/slice/itemsSlice";
import { RootState } from "../../store/store";
import Pagination from "../pagination";
import SortedItems from "../sortedItems";
import { ModalCreate } from "../modalAdd";
import { ModalEdit } from "../modalEdit";

function BodyItems() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: items } = useGetItemsQuery({ page, pageSize });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortApplied, setSortApplied] = useState(false);
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
  const sortItemsByName = (order: "asc" | "desc") => {
    const sortedItems = allItems.slice().sort((a: Item, b: Item) => {
      const numA = parseFloat(a.name);
      const numB = parseFloat(b.name);
      if (order === "asc") {
        return numA - numB;
      } else {
        return numB - numA;
      }
    });
    return sortedItems;
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortApplied(true);
    setSortOrder(order);
  };

  const handleSortCancel = () => {
    setSortApplied(false);
  };
  // const sortedItems = sortItemsByName(sortOrder);

  const handleOpenModal = () => {
    setModalNew(true);
  };

  const handleCloseModal = () => {
    setModalNew(false);
  };

  const handleOpenModalEdit = (item: Item) => {
    setSelectedItem(item);
    setModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
  };

  const getPageContent = () => {
    if (sortApplied) {
      return (
        <SortedItems
          sortedItems={sortItemsByName(sortOrder)}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          onCancel={handleSortCancel}
          handleSort={handleSort}
          sortApplied={sortApplied}
          sortOrder={sortOrder}
        />
      );
    } else {
      return (
        <div className="body-content">
          <div className="body-header">
            <div>
              <h2 className="body-header-title">
                Склад ЗИП <span> 214</span>
              </h2>
            </div>
            <div className="body-header-box">
              <div>
                <input type="text" className="body-header-input" />
                <button className="body-header-input-btn" >Поиск</button>
              </div>
              <button className="body-header-btn-new" onClick={handleOpenModal}>
                <img src="plus-02.svg" alt="+" />
                Новая позиция
              </button>
              {modalNew && <ModalCreate handleCloseModal={handleCloseModal} />}
              {modalEdit && selectedItem && (
                <ModalEdit
                  item={selectedItem}
                  handleCloseModalEdit={handleCloseModalEdit}
                />
              )}
            </div>
          </div>
          <div className="body-table">
            <div className="body-table-column">
              <div className="body-table-subtitle-div">
                <h2 className="body-table-subtitle">Название</h2>
                <button
                  className="body-table-subtitle-div-btns"
                  onClick={() => handleSort("asc")}
                >
                  по возрастанию
                </button>
                <button
                  className="body-table-subtitle-div-btns"
                  onClick={() => handleSort("desc")}
                >
                  по убыванию
                </button>
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
                  <button
                    className="body-table-edit-btn"
                    onClick={() => handleOpenModalEdit(item)}
                  >
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
              </select>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{getPageContent()}</>;
}

export default BodyItems;
