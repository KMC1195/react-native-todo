export function formatDate(date: Date) {
  return `${
    date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate()}`
  }.${
    date.getMonth().toString().length > 1
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`
  }.${date.getFullYear()} ${
    date.getHours().toString().length > 1
      ? date.getHours()
      : `0${date.getHours()}`
  }:${
    date.getMinutes().toString().length > 1
      ? date.getMinutes()
      : `0${date.getMinutes()}`
  }`;
}
