import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1, 
  pageRangeDisplayed = 5, 
}) => {
 
  const getPageNumbers = () => {
    const pageNumbers = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    
    if (leftSiblingIndex > 1) pageNumbers.push(1);
    if (leftSiblingIndex > 2) pageNumbers.push("...");

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    if (rightSiblingIndex < totalPages - 1) pageNumbers.push("...");
    if (rightSiblingIndex < totalPages) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  // Generate the pages with the logic
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Loop over the page numbers and render buttons */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          disabled={page === "..." || page === currentPage}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            page === currentPage
              ? "bg-yellow-400 text-gray-900 font-semibold"
              : page === "..."
              ? "text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-gray-900"
          } ${page === "..." && "cursor-default"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
