export function generatePagination(currentPage: number, totalPage: number) {
  // If the total number of page is 7 or less
  // display all pages without ellipsis
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  // if the current page among the first 3 pages or last 3 pages
  // show the first 3 pages, an ellipse, the last 3 pages
  if (currentPage <= 3 || currentPage >= totalPage - 2) {
    return [1, 2, 3, '...', totalPage - 2, totalPage - 1, totalPage];
  }

  // if the page is somewhere in  the middle
  // show the first page, an ellipse ,current page, the current page and its neighbors
  // another ellipse and the last page
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPage,
  ];
}
