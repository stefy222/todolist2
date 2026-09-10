export const categoryDecorator = (category) => {
  return {
    id: category.id,
    name: category.name,
    user_id: category.user_id
  };
};