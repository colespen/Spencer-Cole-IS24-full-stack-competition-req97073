const dateSort = (allProductsData) => {
  return allProductsData.sort((a, b) => {
    let aStart = a.startDate.split('/').join('');
    let bStart = b.startDate.split('/').join('');
    let aa = parseInt(aStart);
    let bb = parseInt(bStart);
    if (aa < bb) {
      return 1;
    } else {
      return -1;
    }
  });
};

const kebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export { dateSort, kebabCase };
