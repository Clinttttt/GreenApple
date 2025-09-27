import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Function to get a random date between June 1 and October 2 of 2025
function getRandomDateBetweenJuneAndOctober() {
  const start = moment("2025-06-01");
  const end = moment("2025-10-02");
  const diff = end.diff(start, "days");
  const randomDays = random.int(0, diff);
  return start.add(randomDays, "days").format("YYYY-MM-DD HH:mm:ss");
}

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const date = getRandomDateBetweenJuneAndOctober();
  const data = { date };

  console.log("Commit on:", date);
  jsonfile.writeFile(path, data, async () => {
    await git.add([path]);
    await git.commit(date, { "--date": date });
    makeCommits(n - 1);
  });
};

makeCommits(60); // 30 commits
