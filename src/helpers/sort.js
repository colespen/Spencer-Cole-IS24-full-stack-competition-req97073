/**
 * sorts by most recent date
 *  @param {object[]} products
 *  @return {object[]} products
 */
const dateSort = (products) => {
  const byDate = products.sort((a, b) => {
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
  return byDate;
};

/**
 * sorts most recently edited product to top
 *  @param {object[]} products
 *  @param {number} currId
 *  @return {object[]} products
 */
const filterIdTop = (products, currId) => {
  const original = products; //return this if !foundId?
  if (!currId) {
    return products;
  } else {
    let foundId = false;
    products.forEach((product, i) => {
      if (product.id === currId) {
        products.splice(i, 1);
        products.unshift(product);
        foundId = true;
      }
    });
    if (foundId) {
      return products;
    }
    return original;
  }
};

/**
 * sorts most recently added product to top
 *  @param {object[]} products
 *  @param {object} initLengthRef
 *  @return {object[]} products
 */
const sortNewToTop = (products, initLengthRef) => {
  const currLength = products.length - 1;
  const initLength = initLengthRef.current;
  if (currLength === initLength || !initLength) {
    return products;
  } else {
    products.forEach((product, i) => {
      if (product.id === currLength) {
        products.splice(i, 1);
        products.unshift(product);
      }
    });
    return products;
  }
};

const kebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

// FOR SEARCH
///////////////////////////////////////
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

export {
  dateSort,
  kebabCase,
  filterByKey,
  filterIdTop,
  sortNewToTop
};