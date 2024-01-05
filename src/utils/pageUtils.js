const isInvalidPagenumber = (n) => isNaN(n) || n <= 0 || n === undefined || n == null;

export const getPageNumber = (page) =>
    isInvalidPagenumber(page) ? 1 : parseInt(page, 10);
