// Solution for 7kyu Kata "Can Santa save Christmas?" https://www.codewars.com/kata/5857e8bb9948644aa1000246

function determineTime (durations) {
  const maxSeconds = 86400;
  const hourSeconds = 3600;
  const minSeconds = 60;

  let success = true;
  let totalSeconds = 0;

  for (const time of durations) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    totalSeconds += (hours * hourSeconds + minutes * minSeconds + seconds);

    if (totalSeconds > maxSeconds) {
      success = false;
      break;
    }
  }

  return success;
}