export const crudApiTemplate = (entity: string) => {
  return {
    listItem: () => {
      return {
        url: `/${entity}/search`,
        method: "POST",
        body: {},
        headers: {
          "Content-Type": "application/json",
        },
      };
    },
    addItem: (body: any, ) => ({
      url: `/${entity}`,
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    updateItem: (body: any, ) => ({
      url: `/${entity}`,
      method: "PATCH",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    deleteItem: (id: number, ) => ({
      url: `/${entity}/${id}`,
      method: "DELETE",
      headers: {
      },
    }),
    getItem: (id: number, ) => ({
      url: `/${entity}/${id}`,
      headers: {
      },
    }),
  };
};

export const crudApiTemplateWithParent = (parent: string, entity: string) => {
  return {
    listItem: (parentId: number, ) => {
      return {
        url: `/${parent}/${parentId}/${entity}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
    },
    addItem: (parentId: number, body: any, ) => {
      console.log(
        'addItem',
        {
          url: `/${parent}/${parentId}/${entity}`,
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return (
      {
        url: `/${parent}/${parentId}/${entity}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )},
    updateItem: (parentId: number, body: any, ) => ({
      url: `/${parent}/${parentId}/${entity}`,
      method: "PATCH",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    deleteItem: (parentId: number, id: number, ) => ({
      url: `/${parent}/${parentId}/${entity}/${id}`,
      method: "DELETE",
      headers: {
      },
    }),
    getItem: (parentId: number, id?: number, ) => {
      return id
        ? {
            url: `/${parent}/${parentId}/${entity}/${id}`,
            headers: {
            },
          }
        : {
            url: `/${parent}/${parentId}/${entity}`,
          };
    },
    //New create Item for my slice task comment
    createItem: (
      parentId: number,
      body: any,
      
    ) => ({
      url: `/${parent}/${parentId}/${entity}`,
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  };
};
