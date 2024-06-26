import i18n from "i18next";

export function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function toLocalizedDateString(date: string): string {
  return new Date(date).toLocaleDateString(i18n.language === "en" ? "en-US" : "de-DE");
}
