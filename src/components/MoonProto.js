import React from "react";

const MoonProto = () => {
    const getJulianDate = (date = new Date()) => {
        const time = date.getTime();
        const tzoffset = date.getTimezoneOffset()
        
        return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
    }
    const LUNAR_MONTH = 29.530588853;
    const getLunarAge = (date = new Date()) => {
      const percent = getLunarAgePercent(date);
      const age = percent * LUNAR_MONTH;
      return age;
    }
    const getLunarAgePercent = (date = new Date()) => {
      return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
    }
    const normalize = value => {
      value = value - Math.floor(value);
      if (value < 0) {
        value = value + 1
      }
      return value;
    }    

    return(
        <div>
            <h1>{normalize.toString()}</h1>
        </div>
    )
}

export default MoonProto;

