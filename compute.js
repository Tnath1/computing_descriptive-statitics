const readline = require("readline");
const { clearScreenDown } = require("readline"); // Import clearScreenDown function

class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }
  // these method is calculting for ungrouped data for the measure of central tendency.
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
    let modeValue = null;
    for (const num in frequencyMap) {
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        modeValue = parseInt(num, 10);
      }
    }
    return modeValue;
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
const numbers = [];
function promptInput() {
  console.log("Welcome! Please enter your dataset.");
  rl.question("Enter numbers separated by spaces: ", (input) => {
    //numbers = input.split(" ").map(Number);
    input.split(" ").forEach((val) => {
      numbers.push(Number(val));
    });
    clearScreen();
    measureOf();
  });
}
function measureOf() {
  console.log(`Your data sets: ${numbers}`);

  rl.question(
    "Choose an option:\n1. Measure of Central Tendency\n2. Measure of Dispersion\nEnter your choice (1 or 2): ",
    (option) => {
      if (option === "1") {
        clearScreen();
        promptCentralTendency(numbers);
      } else if (option === "2") {
        clearScreen();
        console.log("Sorry, this option is not ready but coming soon.");
        rl.close();
      } else {
        console.log("Invalid option!");
        rl.close();
      }
    }
  );
}

function promptCentralTendency(data) {
  const stats = new DescriptiveStatistics(data);
  console.log(`Your data sets: ${numbers}`);
  rl.question(
    "Choose a measure of central tendency:\n1. Mean\n2. Mode\n3. Median\n4. Go back to previous step\nEnter your choice (1, 2, 3, or 4): ",
    (choice) => {
      if (choice === "1") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Mean:", stats.mean());
        rl.close();
      } else if (choice === "2") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Mode:", stats.mode());
        rl.close();
      } else if (choice === "3") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Median:", stats.median());
        rl.close();
      } else if (choice === "4") {
        clearScreen();
        measureOf();
      } else {
        console.log("Invalid choice!");
        rl.close();
      }
    }
  );
}

// Function to clear the screen using ANSI escape codes
function clearScreen() {
  // ANSI escape code to clear the terminal screen
  process.stdout.write("\x1B[2J\x1B[0f");
}

promptInput();
