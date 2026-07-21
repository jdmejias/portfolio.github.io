const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\jhonm\\.gemini\\antigravity\\brain\\d29af1aa-890b-48ad-bd7b-aba03c74fb70\\.system_generated\\logs\\transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let indexContent = [];
  let hireMeContent = [];

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.content) {
        if (entry.content.includes('export default function Home()')) {
          indexContent.push(entry.content);
        }
        if (entry.content.includes('export const HireMe')) {
          hireMeContent.push(entry.content);
        }
      }
    } catch (e) {}
  }
  
  if (indexContent.length > 0) {
      console.log("=== FIRST INDEX.JS OCCURRENCE ===");
      console.log(indexContent[0].substring(0, 3000));
  }
  if (hireMeContent.length > 0) {
      console.log("=== FIRST HIREME.JS OCCURRENCE ===");
      console.log(hireMeContent[0].substring(0, 2000));
  }
}

processLineByLine();
