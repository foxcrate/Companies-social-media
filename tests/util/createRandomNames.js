function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

exports.generateRandomName = () => {
  const firstNames = [
    "John1",
    "Jane1",
    "Michael1",
    "Emily1",
    "David1",
    "Sarah1",
    "John2",
    "Jane2",
    "Michael2",
    "Emily2",
    "David2",
    "Sarah2",
    "John3",
    "Jane3",
    "Michael3",
    "Emily3",
    "David3",
    "Sarah3",
    "John4",
    "Jane4",
    "Michael4",
    "Emily4",
    "David4",
    "Sarah4",
    "John5",
    "Jane5",
    "Michael5",
    "Emily5",
    "David5",
    "Sarah5",
  ];
  const lastNames = [
    "Smith1",
    "Johnson1",
    "Williams1",
    "Brown1",
    "Jones1",
    "Miller1",
    "Smith2",
    "Johnson2",
    "Williams2",
    "Brown2",
    "Jones2",
    "Miller2",
    "Smith3",
    "Johnson3",
    "Williams3",
    "Brown3",
    "Jones3",
    "Miller3",
    "Smith4",
    "Johnson4",
    "Williams4",
    "Brown4",
    "Jones4",
    "Miller4",
    "Smith5",
    "Johnson5",
    "Williams5",
    "Brown5",
    "Jones5",
    "Miller5",
  ];

  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);

  return `${firstName}_${lastName}`;
};
