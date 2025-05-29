// example input
const meetings = [
  [1, 2],
  [2, 8],
  [7, 9],
];

//compare function to sort meetings based on their end time
const sortByEndTime = (endFirst, endSecond) => {
  return endFirst - endSecond;
};

//function to  determine the minimum number of rooms required to hold all meetings without overlap
function findMinRooms() {
  let minRooms = 1;
  meetings.sort((a, b) => sortByEndTime(a[1], b[1]));
  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i][0] < meetings[i - 1][1]) minRooms++;
  }
  return [minRooms === 1 ? "true" : "false", minRooms];
}

console.log(findMinRooms());

// example output [ 'false', 2 ]
