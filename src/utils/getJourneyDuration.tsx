export const getJourneyDuration = (startTime: string, endTime: string) => {
  const parseTime = (time: string) => {
    const [clock, period] = time.split(" ");
    // eslint-disable-next-line prefer-const
    let [hour, minute] = clock.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  };

  let diff = parseTime(endTime) - parseTime(startTime);

  // Handle overnight journey
  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
};
