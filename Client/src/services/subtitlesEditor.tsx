export default function SubsEditor(fileString: string, selectedOption: string) {
  if (selectedOption === "yt") {
    console.log("yt");
    // Remove unwanted characters
    fileString = fileString.replace(/\[Musik\]/g, ""); // remove "[Musik]"
    fileString = fileString.replace(/\[Applaus\]/g, ""); // remove "[Applaus]"

    // Split text into lines and process them
    const lines = fileString.split("\n");
    const timeRegex = /^\d{1,2}:\d{2}:\d{2}\s*$/;
    const timeRegex2 = /^\d{1,2}:\d{2}\s*$/; // regular expression to match time format "h:mm:ss"
    let subsArray = [];
    let id = 0;
    for (let i = 0; i < lines.length; i++) {
      const line1 = lines[i].trim();
      const line2 = lines[i + 1]?.trim();
      if (timeRegex.test(line1) || timeRegex2.test(line1)) {
        const time =
          timeRegex.test(line1) || timeRegex2.test(line1) ? line1.trim() : "";

        if (line2) {
          // check if line2 is not empty
          id++;
          const subsObject = {
            id: "line-" + id,
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
  } else if (selectedOption === "srt") {
    console.log("srt");
    const lines = fileString.split("\n");
    const subsArray = [];
    let id = "";
    let time = "";
    let subtitle = "";

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i].trim();

      if (currentLine !== "") {
        if (!isNaN(Number(currentLine))) {
          // Parse the subtitle ID
          id = currentLine;
        } else if (currentLine.includes(" --> ")) {
          // Parse the timestamp line
          time = currentLine;
        } else {
          // Accumulate the subtitle text
          subtitle += currentLine + " ";
        }
      } else if (id !== "" && time !== "" && subtitle !== "") {
        // Empty line indicates the end of a subtitle
        const subsObject = {
          id: id,
          learned: false,
          hard: false,
          time: time,
          line: subtitle.trim(),
        };
        subsArray.push(subsObject);

        // Reset the variables for the next subtitle
        id = "";
        time = "";
        subtitle = "";
      }
    }

    return subsArray;
  }
  return [];
}
