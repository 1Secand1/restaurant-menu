"USE STRICT";

const menuHandler = createMenuHandler();
menuHandler.categoryGeneration("categoriesList");
menuHandler.contentGeneration("menu");

const productListHandler = createProductListHandler("orderList");
productListHandler.setHTMLTemplate("li", "order-list__item", "", (data) => {
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
    </div>
  </article>
  `;
});
productListHandler.assignButtonsToСontrol(
  "order-list__item-quantity-control-button--decrease",
  "order-list__item-quantity-control-button--increase",
  "-"
);

menuHandler.exportItem((exportableItem) =>
  productListHandler.importAndAdd(exportableItem)
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
          price: 231,
        },
        {
          id: 1,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Американо",
          price: 160,
        },
        {
          id: 2,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Латте",
          price: 421,
        },
        {
          id: 3,
          previewPictureUrl:
            "https://s3.amazonaws.com/static.cosplay.com/avatars/66438/SvcYxXO.jpg",
          name: "Халвяное латте",
          price: 637,
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
  const mapSelectedProducts = proxyMap();

  function proxyMap() {
    const nameMap = new Map();

    return {
      set(kay, value) {
        const changeableElement = nameMap.has(kay);
        if (changeableElement) {
          updateTemplate(kay, value);
        }

        if (!changeableElement) {
          HTMLtemplateGenerator(value);
        }

        return nameMap.set(kay, value);
      },
      get(kay) {
        if (!kay) {
          return nameMap;
        }
        return nameMap.get(kay);
      },
      has(kay) {
        return nameMap.has(kay);
      },
    };
  }

  let dataTemplate = {
    tagWrap: Number,
    id: Number,
    className: String,
    content: Function(),

    buttonIncrease: String,
    buttonReduce: String,
    buttonRemove: String,
  };

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
  function addQuantityChanges(containerId, key, сlassName, event) {
    const buttons = containerId.querySelector("." + сlassName);

    buttons.addEventListener("click", () => {
      console.log("Ляботай пазязя");
    });
  }
  function HTMLtemplateGenerator(item) {
    const listItem = document.createElement(template.tagWrap);

    listItem.dataset.id = item.key;

    if (template.className) {
      listItem.classList.add(template.className);
    }

    if (template.id) {
      listItem.id = template.id;
    }

    const content = template.content;
    listItem.innerHTML = content(item);

    container.appendChild(listItem);

    addQuantityChanges(listItem, item.key, dataTemplate.buttonIncrease);
    addQuantityChanges(listItem, item.key, dataTemplate.buttonReduce);
  }
  function updateTemplate(key, item) {
    const content = template.content;
    const element = container.querySelector(`[data-id="${key}"]`);
    element.innerHTML = content(item);

    // addQuantityChanges(element, key);
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
      console.log("VZZZ", template);
    },
    getSelectedProducts() {
      return mapSelectedProducts.get();
    },
    setHTMLTemplate(tagWrap, className, id, content) {
      if (!tagWrap) {
        throw new Error("TagWrapp name is not defined");
      }
      if (tagWrap) {
        dataTemplate.tagWrap = tagWrap;
      }
      if (className) {
        dataTemplate.className = className;
      }
      if (id) {
        dataTemplate.id = id;
      }

      if (content) {
        dataTemplate.content = content;
      }

      template = dataTemplate;
    },
    assignButtonsToСontrol(increaseProductCount, reduceProductCount, remove) {
      template.buttonIncrease = increaseProductCount;
      template.buttonReduce = reduceProductCount;
      template.buttonRemove = remove;
    },
  };
}

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

// _____________________utilities__________________________
function firstSimonToLocaleUpperCase(string) {
  return [...string]
    .map((element, id) => {
      if (id === 0) return element.toLocaleUpperCase();
      return element;
    })
    .join("");
}

// if (event == "buttonIncrease") {
//   if (id != 1) return;
//   increaseProductCount(key, "+");
// }

// if (event == "buttonReduce") {
//   if (id != 0) return;
//   increaseProductCount(key, "-");
// }

// if (event == "buttonReduce") {
//   if (id != 0) return;
//   increaseProductCount(key, "-");
// }
