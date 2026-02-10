type TimeDuration = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const parseDuration = {
  natural: (seconds: number): string => {
    if (seconds === 0) {
      return '0s';
    }

    const duration = toTimeDuration(seconds);
    const segments: string[] = [];
    segments.push(`${duration.hours}h`);
    segments.push(`${duration.minutes}m`);
    segments.push(`${duration.seconds}s`);
    return segments.join(' ');
  },
  hhmmss: (seconds: number): string => {
    if (seconds === 0) {
      return '00:00';
    }

    const duration = toTimeDuration(seconds);
    const segments: string[] = [];
    segments.push(String(duration.hours).padStart(2, '0'));
    segments.push(String(duration.minutes).padStart(2, '0'));
    segments.push(String(duration.seconds).padStart(2, '0'));
    return segments.join(':');
  },
};

function toTimeDuration(seconds: number): TimeDuration {

  const duration: TimeDuration = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (seconds === 0) {
    return duration;
  }

  let temp = seconds;

  // Hours
  duration.hours = Math.floor(temp / 3600);
  temp -= duration.hours * 3600;

  // Minutes
  duration.minutes = Math.floor(temp / 60);
  temp -= duration.minutes * 60;

  // Seconds
  duration.seconds = temp;

  return duration;
}