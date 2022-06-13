const validateEmpty = (value: string) => {
  if (value.length < 1) return true;
  if (!value) return true;
};
export { validateEmpty }