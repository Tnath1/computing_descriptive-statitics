const readline = require("readline");
const { clearScreenDown } = require("readline"); // Import clearScreenDown function

class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }

  // Measures of central tendency
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

  // Measures of dispersion
  range() {
    const max = Math.max(...this.data);
    const min = Math.min(...this.data);
    return max - min;
  }

  variance() {
    const mean = this.mean();
    const squaredDifferences = this.data.map((x) => Math.pow(x - mean, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce(
      (acc, val) => acc + val,
      0
    );
    return sumOfSquaredDifferences / this.data.length;
  }

  standardDeviation() {
    const variance = this.variance();
    return Math.sqrt(variance);
  }

  meanDeviation() {
    const mean = this.mean();
    const absoluteDeviations = this.data.map((x) => Math.abs(x - mean));
    const sumOfAbsoluteDeviations = absoluteDeviations.reduce(
      (acc, val) => acc + val,
      0
    );
    return sumOfAbsoluteDeviations / this.data.length;
  }

  quartileDeviation() {
    const q1 = this.percentile(25);
    const q3 = this.percentile(75);
    return (q3 - q1) / 2;
  }

  percentile(percentile) {
    const sortedData = [...this.data].sort((a, b) => a - b);
    const index = (percentile / 100) * (sortedData.length - 1);
    if (Number.isInteger(index)) {
      return sortedData[index];
    } else {
      const floorIndex = Math.floor(index);
      const ceilIndex = Math.ceil(index);
      return (sortedData[floorIndex] + sortedData[ceilIndex]) / 2;
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
        promptDispersion(numbers);
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
    "Choose a measure of central tendency:\n1. Mean\n2. Mode\n3. Median\n4. Back to Previous\nEnter your choice (1, 2, or 3): ",
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

function promptDispersion(data) {
  const stats = new DescriptiveStatistics(data);
  console.log(`Your data sets: ${numbers}`);
  rl.question(
    "Choose a measure of dispersion:\n1. Range\n2. Variance\n3. Standard Deviation\n4. Mean Deviation\n5. Quartile Deviation\n6. Back to Previous\nEnter your choice (1, 2, 3, 4, or 5): ",
    (choice) => {
      if (choice === "1") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Range:", stats.range());
        rl.close();
      } else if (choice === "2") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Variance:", stats.variance());
        rl.close();
      } else if (choice === "3") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Standard Deviation:", stats.standardDeviation());
        rl.close();
      } else if (choice === "4") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Mean Deviation:", stats.meanDeviation());
        rl.close();
      } else if (choice === "5") {
        clearScreen();
        console.log(`Your data sets: ${numbers}`);
        console.log("Quartile Deviation:", stats.quartileDeviation());
        rl.close();
      } else if (choice === "6") {
        clearScreen();
        measureOf();
      } else {
        console.log("Invalid choice!");
        rl.close();
      }
    }
  );
}

//Function to clear the screen using ANSI escape codes
function clearScreen() {
  //ANSI escape code to clear the terminal screen
  process.stdout.write("\x1B[2J\x1B[0f");
}

promptInput();
