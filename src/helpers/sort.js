const dateSort = (allProducts, currId) => {
  const byDate = allProducts.sort((a, b) => {
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
  if (!currId) {
    return byDate;
  } else {
    let foundId = false;
    byDate.forEach((product, i) => {
      if (product.id === currId) {
        byDate.splice(i, 1);
        byDate.unshift(product);
        foundId = true;
      }
    });
    if (foundId) {
      return byDate;
    } 
  }
  return byDate;
};

const kebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

// first store requested keys in a hash
function buildMap(data, filterKey) {
  const map = {};

  for (const product of data) {
    const keys = Object.keys(product);

    for (const key of keys) {
      if (key === filterKey) {
        const value = product[key]?.toString()?.toLowerCase() ?? "";
        const names = value.split(" ");
        for (const name of names) {
          if (name.length) {
            if (!map[name]) {
              map[name] = [];
            }

            map[name].push(product);
          }
        }
      }
    }
  }
  return map;
}
/**
 * returns all articles containing matching character from selected filter key.
 *  @param {object[]} allProducts
 *  @param {string} searchTerm
 *  @return {Array} results
 */
const filterByKey = (allProducts, searchTerm, filterKey) => {
  const map = buildMap(allProducts, filterKey);
  const resultsMap = {};
  const searchArray = searchTerm?.toLowerCase().split(" ");

  if (!searchArray) {
    return [];
  }
  for (const s of searchArray) {
    const term = s;
    if (!term.length) {
      continue;
    }
    const keys = Object.keys(map);

    for (const key of keys) {
      const value = key.toLowerCase();

      if (value.includes(term)) {
        const products = map[key];

        for (const product of products) {
          resultsMap[product.id] = product;
        }
      }
    }
  }
  const results = Object.values(resultsMap);
  return results;
};

export { dateSort, kebabCase, filterByKey };