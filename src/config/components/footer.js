import { getHomePermalink, getPermalink } from "~/utils/permalinks";
import { currentYear } from "~/utils/utils";

const poweredByMessages = [
    "Powered by twisted logic",
    "Powered by irony and despair",
    "Powered by quantum entanglement",
];
const randomMessage = poweredByMessages[Math.floor(Math.random() * poweredByMessages.length)];

const footerData = {
    footNote: '© ' + currentYear + ' · ' + randomMessage
};
export default footerData;
