export const excludeNullFromArray = <ElementType>(
  list: (ElementType | null)[]
): ElementType[] => {
  return list.filter((elem) => elem) as ElementType[];
};

const nonNull = <ElementType>(
  element: ElementType | null
): element is ElementType => {
  return element !== null && element != undefined;
};

export const nonNullArray = <ElementType>(arr: (ElementType | null)[]) => {
  return arr.filter(nonNull);
};
