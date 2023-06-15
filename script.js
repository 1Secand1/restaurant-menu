"USE STRICT";

const menuHandler = createMenuHandler();
menuHandler.categoryGeneration("categoriesList");
menuHandler.contentGeneration("menu");

const productListHandler = createProductListHandler("orderList");
menuHandler.exportItem((exportableItem) =>
  productListHandler.importAndAdd(exportableItem)
);

productListHandler.setHTMLTemplateListItems(
  "li",
  "order-list__item",
  "",
  productListHandler.setHTML((data) => {
    return `

<img class="order-list__item-image" src="${data.previewPictureUrl}" alt="${
      data.name
    }">

<article class="order-list__item-content">
  <h3 class="order-list__item-title">${data.name}</h3>

  <div class="order-list__quantity-of-product">
    <div class="order-list__item-quantity-control">

      <button class="
        order-list__item-quantity-control-button
        order-list__item-quantity-control-button--decrease"
      type="button"> - </button>

      <p class="order-list__item-product-quantity">${data.count}</p>

      <button class="
        order-list__item-quantity-control-button
        order-list__item-quantity-control-button--increase"
      type="button"> + </button>

    </div>

    <p> ${data.price * data.count} </p>
    <button class="order-list__item-quantity-control-button--delete">✕</button>

  </div>
</article>
`;
  })
);
productListHandler.totalOrderPriceHandler(
  "numberOfProducts",
  "totalPriceProducts"
);
productListHandler.assignButtonsToСontrol(
  "order-list__item-quantity-control-button--decrease",
  "order-list__item-quantity-control-button--increase",
  "order-list__item-quantity-control-button--delete"
);

function createMenuHandler() {
  const menu = document.getElementById("#menu");
  const productsLists = [
    {
      id: 0,
      categoryName: "drinksMenu",

      iconUrl: "/",
      title: "напитки",
      content: [
        {
          id: 0,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Эспрессо",
          price: 56,
        },
        {
          id: 1,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Американо",
          price: 120,
        },
        {
          id: 2,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Латте",
          price: 89,
        },
        {
          id: 3,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Халвяное латте",
          price: 130,
        },
      ],
    },
    {
      id: 1,
      categoryName: "pizzaMenu",

      iconUrl: "/",
      title: "пицца",
      content: [
        {
          id: 0,
          previewPictureUrl:
            "https://staticy.dominospizza.ru/api/medium/ProductOsg/Web/ПЕПЕ/NULL/NULL/RU",
          name: "Пепперони",
          price: 499,
        },
        {
          id: 1,
          previewPictureUrl:
            "https://staticy.dominospizza.ru/api/medium/ProductOsg/Web/4CHEESE/NULL/NULL/RU",
          name: "Четыре сыра ",
          price: 699,
        },
        {
          id: 2,
          previewPictureUrl:
            "https://staticy.dominospizza.ru/api/medium/ProductOsg/Web/МАРГ/NULL/NULL/RU",
          name: "Маргарита",
          price: 449,
        },
        {
          id: 3,
          previewPictureUrl:
            "https://staticy.dominospizza.ru/api/medium/ProductOsg/Web/ВЕИГ/NULL/NULL/RU",
          name: "Ветчина и грибы",
          price: 699,
        },
      ],
    },
  ];
  return {
    categoryGeneration(containerId) {
      const categoriesList = document.getElementById(containerId);

      const html = productsLists
        .map(
          (category) => `
          <li>
            <button
              class="categories__item"
              id="${category.id}"
              onclick="activateTabs('${category.categoryName}', 'menu__list')">

              <img src="${category.iconUrl}" alt="">
              <p>${firstSimonToLocaleUpperCase(category.title)}</p>
              <small>количество ${category.content.length}</small>

            </button>
          </li>
        `
        )
        .join("");

      categoriesList.innerHTML = html;
    },
    contentGeneration(containerId) {
      const contentList = document.getElementById(containerId);
      let html = "";

      productsLists.forEach((productsList, id) => {
        const contentMenu = productsList.content
          .map((product) => {
            return `
            <figure class="menu__item">
              <img src="${product.previewPictureUrl}" alt="${product.name}">
              <figcaption>
                <h3 id="menu__name">
                  ${firstSimonToLocaleUpperCase(product.name)}
                </h3>
                <p id="menu__price">
                  ${product.price}
                </p>
              </figcaption>
            </figure>
          `;
          })
          .join("");

        const displayValue = id === 0 ? "flex" : "none";
        html += `
          <div class="row menu__list" id="${productsList.categoryName}" style="display: ${displayValue};">
            ${contentMenu}
          </div>
        `;
      });
      contentList.innerHTML = html;
    },
    exportItem(arrowFunction) {
      productsLists.forEach((categories) => {
        const allChildren = document.getElementById(
          categories.categoryName
        ).children;

        [...allChildren].forEach((childrenElement, idChildren) => {
          const exportItem = productsLists[categories.id].content[idChildren];
          childrenElement.addEventListener("click", () => {
            let exportableItem = Object.assign(
              {},
              { categoryID: categories.id },
              exportItem
            );
            arrowFunction(exportableItem);
          });
        });
      });
    },
  };
}

function createProductListHandler(containerId) {
  const container = document.getElementById(containerId);
  const mapSelectedProducts = handler();
  const listTotalOrderPrice = new Map();

  function handler() {
    const nameMap = new Map();

    function updateTotalOrderPrice(kayValue, event) {
      if (!kayValue) return;

      const { idTotalNumber, idTotalPrice } = templates.get("totalOrderPrice");
      const { key, price, count } = mapSelectedProducts.get(kayValue);

      const totalNumber = document.getElementById(idTotalNumber);
      const totalPrice = document.getElementById(idTotalPrice);

      switch (event) {
        case "+":
          listTotalOrderPrice.set(key, price * count);
          break;
        case "-":
          listTotalOrderPrice.delete(key);
          break;
        default:
          break;
      }

      const totalOrderPrice = Array.from(listTotalOrderPrice.values()).reduce(
        (acc, val) => acc + val,
        0
      );

      totalNumber.value = listTotalOrderPrice.size;
      totalPrice.value = totalOrderPrice;
    }
    function updateTemplate(key, item) {
      const { content } = templates.get("templateListItems");
      const element = container.querySelector(`[data-id="${key}"]`);

      element.innerHTML = content(item);
      addSettingEquivalents(element, key);
    }
    function HTMLtemplateGenerator(item) {
      let { tagWrap, id, className, content } =
        templates.get("templateListItems");

      const listItem = document.createElement(tagWrap);

      listItem.dataset.id = item.key;

      if (className) {
        listItem.classList.add(className);
      }

      if (id) {
        listItem.id = id;
      }

      listItem.innerHTML = content(item);

      container.appendChild(listItem);

      addSettingEquivalents(listItem, item.key);
    }
    return {
      set(key, value) {
        const changeableElement = nameMap.has(key);
        nameMap.set(key, value);

        if (!changeableElement) {
          HTMLtemplateGenerator(value);
        }

        if (changeableElement) {
          updateTemplate(key, value);
        }
        updateTotalOrderPrice(key, "+");

        return;
      },
      get(key) {
        if (!key) {
          return nameMap;
        }
        return nameMap.get(key);
      },
      has(key) {
        return nameMap.has(key);
      },
      delete(key) {
        updateTotalOrderPrice(key, "-");
        nameMap.delete(key);
      },
      size() {
        return nameMap.size;
      },
    };
  }
  const templates = new Map();

  function increaseProductCount(key, value) {
    const existingProduct = mapSelectedProducts.get(key);

    if (value == "+") {
      if (existingProduct.count == 10) return;
      existingProduct.count += 1;
    }

    if (value == "-") {
      if (existingProduct.count == 1) return;
      existingProduct.count -= 1;
    }

    mapSelectedProducts.set(key, existingProduct);
  }
  function addSettingEquivalents(container, key) {
    let { buttonIncrease, buttonReduce, buttonRemove } =
      templates.get("templateListItems");

    let classNameButtons = [buttonIncrease, buttonReduce, buttonRemove];

    classNameButtons.forEach((element, id) => {
      if (!element) return;

      const button = container.querySelector("." + element);

      switch (id) {
        case 0:
          button.addEventListener("click", () => {
            increaseProductCount(key, "-");
          });
          break;
        case 1:
          button.addEventListener("click", () => {
            increaseProductCount(key, "+");
          });
          break;
        case 2:
          button.addEventListener("click", () => {
            container.remove();
            mapSelectedProducts.delete(key);
          });
          break;
        default:
          break;
      }
    });
  }
  return {
    importAndAdd(element) {
      const {
        name,
        price,
        previewPictureUrl,
        count = 1,
        categoryID,
        id,
      } = element;

      const key = `${categoryID}.${id}`;
      const itemParameters = mapSelectedProducts.get(key);

      if (itemParameters) {
        increaseProductCount(key, "+");
        console.log(itemParameters);
      }

      if (!itemParameters) {
        const newItemParameters = {
          key,
          name,
          price,
          count,
          previewPictureUrl,
        };

        mapSelectedProducts.set(key, newItemParameters);
        console.log(newItemParameters);
      }
    },
    getSelectedProducts() {
      return mapSelectedProducts.get();
    },
    setHTML(Function) {
      return Function;
    },
    setHTMLTemplateListItems(tagWrap, className, id, content) {
      templates.set(
        "templateListItems",
        setTemplate(
          ["tagWrap", "className", "id", "content"],
          [tagWrap, className, id, content]
        )
      );
    },

    assignButtonsToСontrol(increaseProductCount, reduceProductCount, remove) {
      const template = templates.get("templateListItems");
      const templateExtension = {
        ...template,
        buttonIncrease: increaseProductCount,
        buttonReduce: reduceProductCount,
        buttonRemove: remove,
      };
      templates.set("templateListItems", templateExtension);
    },

    totalOrderPriceHandler(idTotalNumber, idTotalPrice) {
      templates.set(
        "totalOrderPrice",
        setTemplate(
          ["idTotalNumber", "idTotalPrice"],
          [idTotalNumber, idTotalPrice]
        )
      );
    },
  };
}

// _____________________utilities__________________________
/**
 * Show the tab content with the specified ID and hide all othertabs.
 * @param {string} tabId - The ID of the tab to activate.
 * @param {string} tabsWrapClass - The class of the tab wrapper elements.
 */
function activateTabs(tabId, tabsWrapClass) {
  const tabWrappers = document.querySelectorAll("." + tabsWrapClass);

  // Check if there are any elements with the specified class
  if (!tabWrappers.length) {
    console.error("No elements found with class " + tabsWrapClass);
    return;
  }

  // Loop through all tab wrappers
  tabWrappers.forEach((wrapper) => {
    const isTargetTab = wrapper.id === tabId;

    // Hide all tab wrappers except the target one
    wrapper.style.display = isTargetTab ? "flex" : "none";
  });
}
function firstSimonToLocaleUpperCase(string) {
  return [...string]
    .map((element, id) => {
      if (id === 0) return element.toLocaleUpperCase();
      return element;
    })
    .join("");
}
function setTemplate(dataNames, dataValue) {
  if (!Array.isArray(dataNames) || !Array.isArray(dataValue)) {
    throw new Error("Error: Both parameters must be arrays");
  }
  if (dataNames.length != dataValue.length) {
    throw new Error("The number of names does not match the number of values");
  }
  const dataTemplate = new Object();

  for (let i = 0; i < dataNames.length; i++) {
    dataTemplate[`${dataNames[i]}`] = dataValue[i];
  }

  return dataTemplate;
}
