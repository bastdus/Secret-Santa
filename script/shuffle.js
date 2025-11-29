import fs from "fs";

// ==========================
// READ PARTICIPANTS
// ==========================
const participants = fs
  .readFileSync("./config/participants.txt", "utf-8")
  .split("\n")
  .map((name) => name.trim())
  .filter((name) => name.length > 0);

if (participants.length < 2) {
  throw new Error("At least 2 participants are required!");
}

// ==========================
// READ PASSWORDS
// ==========================
const passwordList = fs
  .readFileSync("./config/passwords.txt", "utf-8")
  .split("\n")
  .map((pwd) => pwd.trim())
  .filter((pwd) => pwd.length > 0);

if (passwordList.length < participants.length) {
  throw new Error("Not enough passwords! Add more to config/passwords.txt");
}

// ==========================
// UTILITY FUNCTIONS
// ==========================
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shiftArray = (array) => {
  const copy = [...array];
  const last = copy.pop();
  copy.unshift(last);
  return copy;
};

const obfuscate = (str) =>
  str
    .split("")
    .map((c) => c.charCodeAt(0) + 5)
    .join("-");

const deobfuscate = (str) =>
  str
    .split("-")
    .map((n) => String.fromCharCode(parseInt(n) - 5))
    .join("");

// ==========================
// CREATE PAIRS
// ==========================
const shuffled = shuffleArray(participants);
const shifted = shiftArray(shuffled);
const passwords = shuffleArray(passwordList);

const result = shuffled.map((giver, i) => ({
  name: obfuscate(giver),
  password: obfuscate(passwords[i] + new Date().getFullYear()),
  secretFriend: obfuscate(shifted[i]),
}));

// ==========================
// WRITE OUTPUT FILE
// ==========================
fs.writeFileSync("./src/data.json", JSON.stringify(result, null, 2));

console.log("\n🎄 Secret Santa generated!\n");
result.forEach(({ name, password }) => {
  console.log(`👤 ${deobfuscate(name)} → 🔐 ${deobfuscate(password)}`);
});
console.log("");
