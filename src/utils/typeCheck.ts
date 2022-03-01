export const isNumber = (value: any) => {
  const numReg = /^[0-9]+$/;
  return numReg.test(value) || value.length === 0;
};
