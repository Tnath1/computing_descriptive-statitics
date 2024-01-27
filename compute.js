const readline = require("readline");

class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }

  mean() {
    const sum = this.data.reduce((acc, val) => acc + val, 0);
    return sum / this.data.length;
  }

  mode() {
    const frequencyMap = {};
    this.data.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });
    let maxFrequency = 0;
    let modes = [];
    for (const num in frequencyMap) {
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        modes = [parseInt(num, 10)];
      } else if (frequencyMap[num] === maxFrequency) {
        modes.push(parseInt(num, 10));
      }
    }
    return modes;
  }

  median() {
    const sorted = [...this.data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptInput() {
  console.log("Welcome! Please enter your dataset.");
  rl.question("Enter numbers separated by spaces: ", (input) => {
    const numbers = input.split(" ").map(Number);
    const stats = new DescriptiveStatistics(numbers);
    rl.question("Choose an option (mean, mode, median): ", (option) => {
      if (option === "mean") {
        console.log("Mean:", stats.mean());
      } else if (option === "mode") {
        console.log("Mode:", stats.mode());
      } else if (option === "median") {
        console.log("Median:", stats.median());
      } else {
        console.log("Invalid option!");
      }
      rl.close();
    });
  });
}

promptInput();
