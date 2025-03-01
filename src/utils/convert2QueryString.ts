export const convert2QueryString = (data: any) => {
  const query = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key]) && data[key].length) {
      data[key].forEach((item: any) => {
        query.append(key, item);
      });
    } else if ((!Array.isArray(data[key]) && data[key]) || 
    (!Array.isArray(data[key]) && data[key] !== undefined) ||
    (!Array.isArray(data[key]) && data[key] !== null)) {
      query.append(key, data[key]);
    }
  });
  return query;
};
