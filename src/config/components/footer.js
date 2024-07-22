import { currentYear } from "~/utils/utils";

const poweredByMessages = [
  "twisted logic",
  "irony and despair",
  "quantum entanglement",
  "cosmic rays",
  "serendipity",
];
const randomMessage = poweredByMessages[Math.floor(Math.random() * poweredByMessages.length)];

const footerData = {
  footNote: '© ' + currentYear + ' · Powered by ' + randomMessage
};
export default footerData;
