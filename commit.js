import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Function to get a random date between June 1 and July 31 of 2025
function getRandomDateBetweenJuneAndJuly() {
  const start = moment("2025-06-01");
  const end = moment("2025-07-31");
  const diff = end.diff(start, "days");
  const randomDays = random.int(0, diff);
  return start.add(randomDays, "days").format("YYYY-MM-DD HH:mm:ss");
}

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const date = getRandomDateBetweenJuneAndJuly();
  const data = { date };

  console.log("Commit on:", date);
  jsonfile.writeFile(path, data, async () => {
    await git.add([path]);
    await git.commit(date, { "--date": date });
    makeCommits(n - 1);
  });
};

makeCommits(40); // You can change 50 to more or less
