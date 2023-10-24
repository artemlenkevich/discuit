export function timestampToTimeAgo(ms: number) {
  const msFromNow = Date.now() - ms;
  const seconds = (msFromNow / 1000).toFixed(0);
  const minutes = (msFromNow / (1000 * 60)).toFixed();
  const hours = (msFromNow / (1000 * 60 * 60)).toFixed();
  const days = (msFromNow / (1000 * 60 * 60 * 24)).toFixed();
  if (+seconds < 60) return seconds + ' sec ago';
  else if (+minutes < 60) return minutes + ' min ago';
  else if (+hours < 24) return hours + ' hrs ago';
  else return days + ' days ago';
}
