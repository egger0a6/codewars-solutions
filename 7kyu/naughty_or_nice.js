// Solution for 7kyu Kata "Naughty or Nice?" https://www.codewars.com/kata/52a6b34e43c2484ac10000cd

function getNiceNames(people) {
  return people.filter(person => person.wasNice).map(person => person.name);
}

function getNaughtyNames(people) {
  return people.filter(person => !person.wasNice).map(person => person.name);
}