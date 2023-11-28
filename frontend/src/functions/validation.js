export function mailIsValid(mail) {
  return mail.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() != "";
}

export function convertNum(number) {
  let newNum = `${Number(number).toFixed(2)} $`;
  return newNum;
}
