// Solution for 4kyu kata "Human readable duration format" https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript

function formatDuration (seconds) {
  if (!seconds) return "now";
  const secondsPer = [31536000, 86400, 3600, 60];
  const format = ["year", "day", "hour", "minute", "second"];
  let times = new Array(4);

  let remaining, i;
  for (i = 0; i < secondsPer.length; i++) {
    times[i] = Math.floor(seconds / secondsPer[i]);
    if (times[i] > 1) format[i] += "s";
    remaining = seconds % secondsPer[i];
    seconds = remaining;
  }
  times.push(remaining);
  if (times[i] > 1) format[i] += "s";
  console.log(times)
  console.log(format)

  return times.map((time, idx) => {
    if (time) {
      return `${time} ${format[idx]}`;
    }
  })
  .filter(time => time)
  .reduce((prev, curr, idx, arr) => {
    // console.log(arr)
    // console.log(idx)
    // console.log(curr)
    if (idx > 0 && idx === arr.length - 1) {
      return prev + ` and ${curr}`;
    }
    if (arr.length === 1 || idx === 0) {
      return prev + curr;
    }
    return prev + `, ${curr}`
  }, "");
}