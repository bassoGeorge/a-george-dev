/**
 * Converts a prisma field definition to a nullable field definition.
 * @param field a prisma field definition. Needs to be of the form "<name> <type> <other-attributes>"
 * @returns "<name> <type>?"
 */
export const convertToNullableField = (field: string) => {
  const [name, type] = field.split(' ');
  return `${name} ${type}?`;
};
