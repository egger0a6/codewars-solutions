// Solution for 4kyu Kata "Strings Mix" https://www.codewars.com/kata/5629db57620258aa9d000014/train/javascript

function mix(s1, s2) {
  let s1Count = new Array(26), s2Count = new Array(26), mix = [];
  let regex = /[a-z]/g;

  s1 = s1.match(regex)
  .forEach(c => {
    let aPos = c.charCodeAt(0) - 97;
    if (s1Count[aPos]) {
      s1Count[aPos] += c;
    }
    else {
      s1Count[aPos] = c;
    }
  });
  s2 = s2.match(regex)
  .forEach(c => {
    let aPos = c.charCodeAt(0) - 97;
    if (s2Count[aPos]) {
      s2Count[aPos] += c;
    }
    else {
      s2Count[aPos] = c;
    }
  });

  s1Count = s1Count
  .map(el => {
    if (!el || el.length < 2) {
      return null;
    }
    return el;
  });
  s2Count = s2Count
  .map(el => {
    if (!el || el.length < 2) {
      return null;
    }
    return el;
  });
  for (let i = 0; i < s1Count.length; i++) {
    s1Chars = s1Count[i];
    s2Chars = s2Count[i];
    if (s1Chars && s2Chars) {
      if (s1Chars.length === s2Chars.length) {
        mix.push(`=:${s1Chars}`);
        continue;
      }
      mix.push((s1Chars.length > s2Chars.length) ? `1:${s1Chars}` : `2:${s2Chars}`);
      continue;
    }
    if (s1Chars) mix.push(`1:${s1Chars}`);
    if (s2Chars) mix.push(`2:${s2Chars}`);
  }
  mix.sort((a, b) => b.length - a.length);

  mix.sort((a, b) => {
    if (a.length === b.length) {
      if (a.at(0) === "=" || b.at(0) === "=") {
        return b.at(0).localeCompare(a.at(0));
      }
      return a.at(0).localeCompare(b.at(0));
    }
    return 0;
  });
  return (mix) ? mix.join("/") : "";
}