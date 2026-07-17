export const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {
  const hour24 = Math.floor(index / 4);
  const minute = (index % 4) * 15;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  const time = `${hour12.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;

  return {
    label: time,
    value: time,
  };
});

export const RUNNING_DAYS = [
  {
    label: "Saturday",
    value: "SATURDAY",
  },
  {
    label: "Sunday",
    value: "SUNDAY",
  },
  {
    label: "Monday",
    value: "MONDAY",
  },
  {
    label: "Tuesday",
    value: "TUESDAY",
  },
  {
    label: "Wednesday",
    value: "WEDNESDAY",
  },
  {
    label: "Thursday",
    value: "THURSDAY",
  },
  {
    label: "Friday",
    value: "FRIDAY",
  },
];

export const TRAIN_DERECTIONS = [
  {
    label: "Up",
    value: "UP",
  },
  {
    label: "Down",
    value: "DOWN",
  },
];
