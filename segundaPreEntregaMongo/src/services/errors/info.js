export const generateProductErrorInfo = (product) => {
  return `
    Un o mas propiedades estan incompletas o son invalidas
    Lista de propiedades obligatorias:
    -name: Must be a string. (${product.name})
    -description: Must be a string. (${product.description})
    -price: Must be a number. (${product.price})
    -stock: Must be a number. (${product.stock})
    -thumbnail: Must be a string. (${product.thumbnail})
    -status: Must be a boolean. (${product.status})
    -code: Must be a string. (${product.code})
    -category: Must be a string. (${product.category})
    `;
};

export const generateDatabaseErrorInfo = () => {
  return `
    Hubo un error en la base de datos o no esta logeado. Intente mas tarde o registrese.
  `;
};
