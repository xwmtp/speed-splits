export const isEmpty = (obj) => Object.values(obj).every(x => (x === null || x === ''));