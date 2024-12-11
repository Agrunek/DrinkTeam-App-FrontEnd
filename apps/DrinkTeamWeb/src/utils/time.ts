const ONE_SECOND = 1;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;

export const mapTimeToText = (value: number) => {
  const years = Math.floor(value / ONE_YEAR);

  if (years) {
    switch (years) {
      case 1:
        return `${years} rok`;
      case 2:
      case 3:
      case 4:
        return `${years} lata`;
      default:
        return `${years} lat`;
    }
  }

  const months = Math.floor(value / ONE_MONTH);

  if (months) {
    switch (months) {
      case 1:
        return `${months} miesiąc`;
      case 2:
      case 3:
      case 4:
        return `${months} miesiące`;
      default:
        return `${months} miesięcy`;
    }
  }

  const days = Math.floor(value / ONE_DAY);

  if (days) {
    switch (days) {
      case 1:
        return `${days} dzień`;
      default:
        return `${days} dni`;
    }
  }

  const hours = Math.floor(value / ONE_HOUR);

  if (hours) {
    switch (hours) {
      case 1:
        return `${hours} godzina`;
      case 2:
      case 3:
      case 4:
        return `${hours} godziny`;
      default:
        return `${hours} godzin`;
    }
  }

  const minutes = Math.floor(value / ONE_MINUTE);

  if (minutes) {
    switch (minutes) {
      case 1:
        return `${minutes} minuta`;
      case 2:
      case 3:
      case 4:
        return `${minutes} minuty`;
      default:
        return `${minutes} minut`;
    }
  }

  const seconds = Math.floor(value / ONE_SECOND);

  if (seconds) {
    switch (seconds) {
      case 1:
        return `${seconds} sekunda`;
      case 2:
      case 3:
      case 4:
        return `${seconds} sekundy`;
      default:
        return `${seconds} sekund`;
    }
  }

  return 'Instant';
};
