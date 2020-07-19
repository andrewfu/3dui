export default (data) => {
  return data.map((list) => ({
    title: `${list.Title} (${list.ItemCount})`,
    name: list.Title,
    count: list.ItemCount,
    id: list.Id,
  }));
};
