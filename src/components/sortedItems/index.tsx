import React from "react";
import Pagination from "../pagination";
import "../body/style.css";

type SortedItemsProps = {
  sortedItems: Item[];
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  pageSize: number;
  onCancel: () => void;
  handleSort: (order: "asc" | "desc") => void;
  sortApplied: boolean;
  sortOrder: "asc" | "desc"; // Добавляем состояние для хранения порядка сортировки
};
interface Item {
  id: string;
  name: string;
  description: string;
  measurement_units: string;
  deposit: any;
  code: string;
}

function SortedItems({
  sortedItems,
  handlePageSizeChange,
  pageSize,
  totalPages,
  currentPage,
  onPageChange,
  onCancel,
  handleSort,
  sortApplied,
  sortOrder,
}: SortedItemsProps) {
  return (
    <div className="body-content">
      <div className="body-header">
        <div>
          <h2 className="body-header-title">
            Склад ЗИП <span>200</span>
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
            <button
              className={
                sortApplied && sortOrder === "asc" // Проверяем состояние сортировки
                  ? "body-table-subtitle-div-btns active"
                  : "body-table-subtitle-div-btns"
              }
              onClick={() => handleSort("asc")}
            >
              по возрастанию
            </button>
            <button
              className={
                sortApplied && sortOrder === "desc" // Проверяем состояние сортировки
                  ? "body-table-subtitle-div-btns active"
                  : "body-table-subtitle-div-btns"
              }
              onClick={() => handleSort("desc")}
            >
              по убыванию
            </button>
            <button className="body-table-subtitle-div-btns" onClick={onCancel}>
              сброс
            </button>
          </div>
          {sortedItems.map((item: Item, id: React.Key | null | undefined) => (
            <div className="body-table-text-div" key={id}>
              <p className="body-table-text">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="body-table-column">
          <div className="body-table-subtitle-div">
            <h2 className="body-table-subtitle">Единица измерения</h2>
          </div>
          {sortedItems.map((item: Item, id: React.Key | null | undefined) => (
            <div className="body-table-text-div" key={id}>
              <p className="body-table-text">{item.measurement_units}</p>
            </div>
          ))}
        </div>
        <div className="body-table-column">
          <div className="body-table-subtitle-div">
            <h2 className="body-table-subtitle">Артикул/код</h2>
          </div>
          {sortedItems.map((item: Item, id: React.Key | null | undefined) => (
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
          currentPage={currentPage}
          onPageChange={onPageChange}
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

export default SortedItems;
