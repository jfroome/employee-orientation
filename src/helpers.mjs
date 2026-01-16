
import { Medical, Vision, Dental } from './constants.mjs';

export const EncodeCoverage = (medical, vision, dental) => {
    return (medical ? 1 : 0) + (vision ? 2 : 0) + (dental ? 4 : 0);
}

export const DecodeCoverage = (coverage) => {
    if (coverage === undefined) {
        return {
            [Medical]: true,
            [Vision]: true,
            [Dental]: true
        }
    }
    return {
        [Medical]: (coverage & 1) > 0,
        [Vision]: (coverage & 2) > 0,
        [Dental]: (coverage & 4) > 0
    }
}

export const handleNinoxDateTimeBS = (time, direction, offset) => {
    // if(time === undefined) {
    //     time = "08:00:00";
    // }
    //console.log(time)
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    let timeOffset = offset;
    let trueOffset = (timeOffset - timezoneOffset) / 60;

    var hours = parseInt(time.split(":")[0]);
    //console.log(hours)
    //console.log(trueOffset)
    if (direction === "in") {
      hours = hours + trueOffset;
    } else {
      hours = hours - trueOffset;
    }
    //console.log(hours)
    return hours.toString().padStart(2,"0") + ":" + time.split(":")[1] + ":00";
  }