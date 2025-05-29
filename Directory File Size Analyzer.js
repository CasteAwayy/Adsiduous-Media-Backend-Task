// example input
const filesystem = {
  root: {
    "file1.txt": 100,
    folder1: {
      "file2.txt": 200,
      folder2: {
        "file3.txt": 300,
      },
    },
  },
};

function get_total_size(input, destination) {
  const paths = destination.split("/");

  // Navigate to the target directory
  let currentLevel = input;
  for (const path of paths) {
    // assuming path is valid and exist
    if (currentLevel[path] !== undefined) {
      currentLevel = currentLevel[path];
    }
  }

  // after navigating to path calculate the size of it
  function calculatePathSize(directory) {
    let total = 0;
    for (const key in directory) {
      const value = directory[key];
      if (typeof value === "number") {
        total += value;
      } else if (value.constructor === Object && value !== null) {
        total += calculatePathSize(value);
      }
    }
    return total;
  }
  return calculatePathSize(currentLevel);
}

console.log(get_total_size(filesystem, "root/folder1"));

//example output : 500
