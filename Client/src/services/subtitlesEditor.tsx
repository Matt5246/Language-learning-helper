export default function SubsEditor(fileString: string) {
  // Remove unwanted characters
  fileString = fileString.replace(/\[Musik\]/g, ""); // remove "[Musik]"
  fileString = fileString.replace(/\[Applaus\]/g, ""); // remove "[Applaus]"

  // Split text into lines and process them
  const lines = fileString.split("\n");
  const timeRegex = /^\d{1,2}:\d{2}:\d{2}\s*$/;
  const timeRegex2 = /^\d{1,2}:\d{2}\s*$/; // regular expression to match time format "h:mm:ss"
  let subsArray = [];
  for (let i = 0; i < lines.length; i++) {
    const line1 = lines[i].trim();
    const line2 = lines[i + 1]?.trim();
    if (timeRegex.test(line1) || timeRegex2.test(line1)) {
      const time =
        timeRegex.test(line1) || timeRegex2.test(line1) ? line1.trim() : "";
      const id = `line-${i / 2 + 1}`;
      if (line2) {
        // check if line2 is not empty
        const subsObject = {
          id: id,
          learned: false,
          hard: false,
          time: time,
          line: line2,
        };
        subsArray.push(subsObject);
      }
    }
  }

  return subsArray;
}
