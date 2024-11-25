export function convertMsToHHMMSS(ms: number) {
  const hour = Math.trunc(ms / (60 * 60 * 1000));
  ms = ms - hour * (60 * 60 * 1000);

  const minute = Math.trunc(ms / (60 * 1000));
  ms = ms - minute * (60 * 1000);

  const second = Math.trunc(ms / 1000);

  if (hour > 0) {
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }
  return `${minute.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}`;
}
