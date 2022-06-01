export const telephoneDto = (telephone: string) => {
  const sanitizedTelephone = telephone.replace(/[\(\)\s]/g, "");
  const ddd = +sanitizedTelephone.slice(0, 2);
  const number = sanitizedTelephone.slice(2);
  console.log(sanitizedTelephone);

  return { ddd, number };
};
