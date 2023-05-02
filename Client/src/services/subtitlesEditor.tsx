export default function SubsEditor(fileString: string) {
// Remove unwanted characters
fileString = fileString.replace(/\[Musik\]/g, ""); // remove "[Musik]"
fileString = fileString.replace(/\[Applaus\]/g, ""); // remove "[Applaus]"

// Split text into lines and process them
const lines = fileString.split("\n");

let result = "";
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (i % 2 === 0) {
    result += line;
  } else {
    result += " "+ line + "\n"; // remove the last newline character from the previous line and concatenate with the current line
  }
}
const lines2 = result.split("\n");
const linesToDelete:string[] = [];
for (let i = 0; i < lines2.length; i++) {
  const currentLine = lines2[i];
  const timeRegex = /^\d{1,2}:\d{2}:\d{2}\s*$/;
  const timeRegex2 = /^\d{1,2}:\d{2}\s*$/; // regular expression to match time format "h:mm:ss"
  if (timeRegex.test(currentLine) || timeRegex2.test(currentLine)) {
    linesToDelete.push(currentLine);
  }
}
return result = result.split("\n")
  .filter(line => !linesToDelete.includes(line))
  .join("\n"); 
}