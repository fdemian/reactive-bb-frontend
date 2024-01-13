const isInvalidPagenumber = (n: string | null) =>
    n === undefined ||
    n == null ||
    isNaN(parseInt(n, 10)) ||
    parseInt(n, 10) <= 0;

export const getPageNumber = (page: string | null): number =>
    isInvalidPagenumber(page) ? 1 : parseInt(page ?? '1', 10);
