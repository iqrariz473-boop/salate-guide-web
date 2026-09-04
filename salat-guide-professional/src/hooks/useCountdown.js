import { useEffect, useState } from "react";

function diffToParts(targetDate) {
  const totalSeconds = Math.max(
    0,
    Math.floor((targetDate.getTime() - Date.now()) / 1000)
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { totalSeconds, hours, minutes, seconds };
}

/**
 * Ticks down to `targetDate` (a Date object) once per second. Returns
 * { hours, minutes, seconds, totalSeconds, isComplete }. Pass a new
 * targetDate (e.g. when the next prayer changes) and the hook adjusts.
 */
export default function useCountdown(targetDate) {
  const [parts, setParts] = useState(() =>
    targetDate ? diffToParts(targetDate) : { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 }
  );

  useEffect(() => {
    if (!targetDate) return undefined;

    setParts(diffToParts(targetDate));
    const intervalId = setInterval(() => {
      setParts(diffToParts(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return { ...parts, isComplete: parts.totalSeconds === 0 };
}
