export const formatTeeTime = (tee_time: string) => {
  const hours = tee_time.split(':')[0].length === 1 ? `0${tee_time.split(':')[0]}` : tee_time.split(':')[0];
  const minutes = tee_time.split(':')[1].length === 1 ? `0${tee_time.split(':')[1]}` : tee_time.split(':')[1];

  if (Number(hours) === 0 && Number(minutes) === 0) {
    return `12:00 AM`;
  }
  if (Number(hours) <= 12) {
    return `${hours}:${minutes} AM`;
  }

  return `${Number(hours) - 12 <= 10 ? `0${Number(hours)}` : Number(hours) - 12}:${minutes} PM`;
};
