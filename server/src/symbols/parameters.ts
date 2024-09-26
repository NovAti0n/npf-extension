import { Section } from "./sections";

const parameters = [
    {
        "name": "delay",
        "description": "Delays the start of the test by the given number of seconds",
        "sections": [Section.SCRIPT]
    },
    {
        "name": "autokill",
        "description": "Automatically halts the test after completion",
        "sections": [Section.SCRIPT]
    },
    {
        "name": "waitfor",
        "description": "Waits for a specific event to occur before executing the script",
        "sections": [Section.SCRIPT]
    },
    {
        "name": "sudo",
        "description": "Runs the script with elevated privileges",
        "sections": [Section.SCRIPT]
    }
];

export default parameters;