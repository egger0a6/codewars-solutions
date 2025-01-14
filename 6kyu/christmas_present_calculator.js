// Solution for 6kyu Kata "Christmas Present Calculator" https://www.codewars.com/kata/585b989c45376c73e30000d1

function countPresents(prod, presents) {
  const daySeconds = 86400;
  const hourSeconds = 3600;
  const minSeconds = 60;

  let totProdTime = Object.values(prod).reduce((prev, curr) => prev + curr, 0) * daySeconds;
  let totPresents = 0;

  // sort presents by time
  presents = presents
  .map((present) => {
    const [hours, mins, secs] = present.split(":").map(Number);
    return (hours * hourSeconds + mins * minSeconds + secs);
  })
  .sort((a, b) => a - b);

  for (const present of presents) {
    totProdTime -= present;
    if (totProdTime < 0) {
      break;
    }
    totPresents++;
  }

  return totPresents
}