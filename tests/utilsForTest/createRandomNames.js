function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

exports.generateRandomName = () => {
  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
  ];

  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  let randomNumber = Math.random() * 1000;

  return `${firstName}_${lastName}_${randomNumber}`;
};
