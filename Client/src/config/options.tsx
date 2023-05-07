import spaceBackground from "../assets/space.jpg";
import linesBackground from "../assets/lines.jpg";

export const prefixOptions = [
  "+1",
  "+44",
  "+48",
  "+49",
  "+81",
  "+86",
  "+91",
  "+971",
];

export const backgroundImage = {
  space: spaceBackground,
  lines: linesBackground,
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
