export function isValidMonth(month: string) {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
}
