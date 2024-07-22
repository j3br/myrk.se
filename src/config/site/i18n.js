export default {
  language: "en",
  textDirection: "ltr",

  dateFormatter: new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "CET",
  }),

  numberFormatter: new Intl.NumberFormat("en", {
    notation: "compact",
  }),
};
