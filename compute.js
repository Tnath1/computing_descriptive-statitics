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
    rl.question(
      "Choose an option:\n1. Measure of Central Tendency\n2. Measure of Dispersion\nEnter your choice (1 or 2): ",
      (option) => {
        if (option === "1") {
          promptCentralTendency(numbers);
        } else if (option === "2") {
          console.log("Sorry, this option is not ready but coming soon.");
          rl.close();
        } else {
          console.log("Invalid option!");
          rl.close();
        }
      }
    );
  });
}

function promptCentralTendency(data) {
  const stats = new DescriptiveStatistics(data);
  rl.question(
    "Choose a measure of central tendency:\n1. Mean\n2. Mode\n3. Median\n4. Go back to previous step\nEnter your choice (1, 2, 3, or 4): ",
    (choice) => {
      if (choice === "1") {
        console.log("Mean:", stats.mean());
        rl.close();
      } else if (choice === "2") {
        console.log("Mode:", stats.mode());
        rl.close();
      } else if (choice === "3") {
        console.log("Median:", stats.median());
        rl.close();
      } else if (choice === "4") {
        promptInput(); // Go back to the previous step
      } else {
        console.log("Invalid choice!");
        rl.close();
      }
    }
  );
}

promptInput();
