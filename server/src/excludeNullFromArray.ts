export const excludeNullFromArray = <ElementType>(
  list: (ElementType | null)[]
): ElementType[] => {
  return list.filter((elem) => elem) as ElementType[];
};
