import { useState } from "react";
import "./style.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState("");

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 6; 
 
    let startPage = currentPage - Math.floor(maxPageButtons / 2);
    let endPage = currentPage + Math.floor(maxPageButtons / 3);


    if (startPage < 1) {
      endPage += 1 - startPage;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? "pagination-btns active" : "pagination-btns"}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };


  const handleBackButtonClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };


  const handleNextButtonClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-items">
      {currentPage > 4 && (
        <button onClick={handleBackButtonClick} className="pagination-btn-pred">
          назад
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button onClick={handleNextButtonClick} className="pagination-btn-next">
          <img src="arrow right.svg" alt="next" />
        </button>
      )}

      {/* <input
        type="text"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onPageChange(Number(inputPage));
          }
        }}
      /> */}
    </div>
  );
}

export default Pagination;
