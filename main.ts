import { day01 } from "./day_01/task";
import { day02 } from "./day_02/task";
import { day03 } from "./day_03/task";
import { day04 } from "./day_04/task";
import { day05 } from "./day_05/task";

switch (process.argv[2]) {
    case '1': day01(); break;
    case '2': day02(); break;
    case '3': day03(); break;
    case '4': day04(); break;
    case '5': day05(); break;
    // case '6': day06(); break;
    default:
        console.log('No task found');
}