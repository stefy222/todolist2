export const categoryDecorator = (category) => {
  return {
    id: category.id,
    name: category.name,
    user_id: category.user_id
  };
};

export const categoriesListDecorator = (categories) => {
  if (!Array.isArray(categories)) return [];
  return categories.map((category) => categoryDecorator(category));
};