"USE STRICT";
//a,j,g
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

  <img class="order-list__item-image" 
  src="${data.previewPictureUrl}" alt="${data.name}">

  <article class="order-list__item-content">

  <div class="row">
  <h3 class="order-list__item-title">${data.name}</h3>

  <button class="order-list__item-quantity-control-button--delete order-list__item-quantity-control-button ">✕</button>
  </div>
    <small class="order-list__item-name-cotigoria">${data.fromСotigoria}</small>

    <div class="order-list__quantity-of-product">
      <div class="order-list__item-quantity-control">

        <button class="
          order-list__item-quantity-control-button
          order-list__item-quantity-control-button--decrease"
        type="button"> </button>

        <p class="order-list__item-product-quantity">${data.count}</p>

        <button class="
          order-list__item-quantity-control-button
          order-list__item-quantity-control-button--increase"
        type="button"> + </button>

      </div>

    <p class="order-list__item-product-price"> 
      ${data.price * data.count} руб 
    </p>
  

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

      // iconUrl: "/img/Product-pictures/coffee/coffee-icon.svg",
      title: "coffee",
      content: [
        {
          id: 0,
          previewPictureUrl:
            "./img/Product-pictures/coffee/contents/32a94c7f6e6174d4b890c4a20d097f26-216x188.jpeg",
          name: "Эспрессо",
          price: 56,
        },
        {
          id: 1,
          previewPictureUrl:
            "./img/Product-pictures/coffee/contents/461f9522a0aaf339f6acc33441278c62-216x188.jpeg",
          name: "Американо",
          price: 120,
        },
        {
          id: 2,
          previewPictureUrl:
            "./img/Product-pictures/coffee/contents/60f66e17d25713f45f48cdaf463872d9-216x188.jpeg",
          name: "Латте",
          price: 89,
        },
        {
          id: 3,
          previewPictureUrl:
            "./img/Product-pictures/coffee/contents/7d75817c08662e1ac94419579b263ff1-216x188.jpeg",
          name: "Халвяное латте",
          price: 130,
        },
        {
          id: 4,
          previewPictureUrl:
            "./img/Product-pictures/coffee/contents/add29baa79c069eaccff3f07fbe7c940-216x188.jpeg",
          name: "Халвяное латте",
          price: 130,
        },
      ],
    },
    {
      id: 1,
      categoryName: "pizzaMenu",

      // iconUrl: "./img/Product-pictures/burger/hamburger-icon.svg",
      title: "Burger",
      content: [
        {
          id: 0,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/1921a91c5e696b490019b12718f10ee5-216x188.jpeg",

          name: "Пепперони",
          price: 499,
        },
        {
          id: 1,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/51cb5adf1dd88c5f7be1e44113910609-216x188.jpeg",
          name: "Четыре сыра ",
          price: 699,
        },
        {
          id: 2,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/692d2deb2bcf5a6624022ddd409465f1-216x188.jpeg",
          name: "Маргарита",
          price: 449,
        },
        {
          id: 3,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/974edecf033718be661b25aee2b5a00f-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 4,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/a48d7ea04ee209a5dbda33781dd6627f-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 5,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/aa477adba4fdf648d5898ce4ecabb5ad-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 6,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/bb47e615264753f9b4a4407d76910ec1-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 7,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/bb47e615264753f9b4a4407d76910ec1-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 8,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/bb47e615264753f9b4a4407d76910ec1-216x188.jpeg",
          name: "Ветчина и грибы",
          price: 699,
        },
        {
          id: 9,
          previewPictureUrl:
            "./img/Product-pictures/burger/contents/bb47e615264753f9b4a4407d76910ec1-216x188.jpeg",
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
              <img  class="menu__item-img" 
              src="${product.previewPictureUrl}" 
              alt="${product.name}">
              
              <figcaption class="menu__item-text-box">
                <h3 class="menu__item-title" id="menu__name">
                  ${firstSimonToLocaleUpperCase(product.name)}
                </h3>
                <p class="menu__item-price" id="menu__price">
                  ${product.price} руб
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
              { fromСotigoria: categories.title },
              exportItem
            );
            console.log(exportableItem);
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
        fromСotigoria,
      } = element;

      const key = `${categoryID}.${id}`;
      const itemParameters = mapSelectedProducts.get(key);

      if (itemParameters) {
        increaseProductCount(key, "+");
      }

      if (!itemParameters) {
        const newItemParameters = {
          key,
          name,
          price,
          count,
          previewPictureUrl,
          fromСotigoria,
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
