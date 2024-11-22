export const api = process.env.NEXT_PUBLIC_API_URL;

export const formatDate = (dateString: string) => {
  if (typeof window !== "undefined" && window.navigator) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", timeZone: "UTC" };
    const utcDate = date.toLocaleString("en-US", options as any);
    const localDate = new Date(utcDate);
    // localDate.setUTCHours(0, 0, 0, 0);
    return localDate.toLocaleString(navigator.language, {
      month: "long",
      day: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
};

export const formatDateYear = (dateString: string) => {
  if (typeof window !== "undefined" && window.navigator) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" };
    const utcDate = date.toLocaleString("en-US", options as any);
    const localDate = new Date(utcDate);
    // localDate.setUTCHours(0, 0, 0, 0);
    return localDate.toLocaleString(navigator.language, {
      month: "long",
      day: "2-digit",
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
};

export const shortDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString()
};

export const formatDateYearShort = (dateString: string) => {
  if (typeof window !== "undefined" && window.navigator) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" };
    const utcDate = date.toLocaleString("en-US", options as any);
    const localDate = new Date(utcDate);
    // localDate.setUTCHours(0, 0, 0, 0);
    return localDate.toLocaleString(navigator.language, {
      month: "short",
      day: "2-digit",
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
};

export const timeSince = (dateString: string) => {
  const now = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in time (milliseconds)
  //@ts-ignore
  const diffInMs = now - givenDate;

  // Calculate the difference in days
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMin = Math.floor(diffInMs / (1000 * 60));

  if (diffInHours <= 1) {
    return `${diffInMin}min ago`
  }
  else if (diffInDays <= 1) {
    return `${diffInHours}h ago`;
  }
  else if (diffInWeeks <= 1) {
    return `${diffInDays}d ago`;
  }
  else {
    return `${diffInWeeks}w ago`;
  }
}

export const timeTo = (dateString: string) => {
  const now = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in time (milliseconds)
  //@ts-ignore
  let diffInMs = givenDate - now;
  //@ts-ignore
  let diff = givenDate - now;

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  diffInMs -= (diffInDays * 1000 * 60 * 60 * 24 )
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  diffInMs -= (diffInHours * 1000 * 60 * 60)
  const diffInMin = Math.floor(diffInMs / (1000 * 60));
  diffInMs -= (diffInMin * 1000 * 60)
  const diffInSec = Math.floor(diffInMs / (1000));


  return {text: `${diffInDays}d ${diffInHours}h ${diffInMin}m ${diffInSec}s`, amount: diff};
}

export const daysSince = (dateString: string) => {
  const now = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in time (milliseconds)
  //@ts-ignore
  const diffInMs = now - givenDate;

  // Calculate the difference in days

  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMin = Math.floor(diffInMs / (1000 * 60));


  if (diffInDays < 1) {
    return `Today`;
  }
  else if (diffInDays == 1) {
    return 'Yesterday'
  }
  else if (diffInWeeks < 1) {
    return `${diffInDays}d ago`;
  }
  else {
    return `${diffInWeeks}w ago`;
  }
}

export const formatTime = (dateString: string) => {
  if (typeof window !== "undefined" && window.navigator) {
    const date = new Date(dateString);
    const localTime = date.toLocaleTimeString(navigator.language, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return localTime;
  }
};
export const calculatePercentile = (
  userStat: number,
  median: number,
  min: number,
  max: number
) => {

  if (userStat < median) {
    const barPercent = Math.abs((userStat - median) / (median - min) / 2 + 0.5) * 100;
    const percentile = 100 - barPercent;

    let color = null;
    color = percentile >= 80 ? 'loss' : percentile <= 20 ? 'win' : percentile <= 60 && percentile >= 40 ? 'caution' : null;

    return { barPercent, percentile, color};
  } else {
    const barPercent = Math.abs((userStat - median) / (max - median) / 2 + 0.5) * 100;
    const percentile = 100 - barPercent;

    let color = null;
    color = percentile >= 80 ? 'loss' : percentile <= 20 ? 'win' : percentile <= 60 && percentile >= 40 ? 'caution' : null;

    return { barPercent, percentile, color };
  }
};

export const convertTimeToUTC = (date: String | Date | Number) => {
  //@ts-ignore
  const d = new Date(date);
  const result = new Date(new Date(d).toUTCString()).toISOString()
  return result;
}

export const CalcRankName = (rankInt: number) => {
  const ranks = {
    0: 'unranked',
    3: 'iron',
    6: 'bronze',
    9: 'silver',
    12: 'gold',
    15: 'platinum',
    18: 'diamond',
    21: 'ascendant',
    24: 'immortal',
    27: 'radiant'
  }
  const current_rank = rankInt - (rankInt % 3);
  //@ts-ignore
  return ranks[current_rank];
}

export const GetFile = (filename: string) => {
  return 'https://files.esportsclubs.gg/'+filename;
}

export const CreateMedalToolTip = (medal_name: string) => {
  let sanitizeURL = medal_name.replace('https://files.esportsclubs.gg/', '').replace('.png', '');
  const split_name = sanitizeURL.split('_');
  let new_name = '';
  for (const x in split_name) {
    if(Number(x) != (Number(split_name.length) - 1)) {
      new_name += split_name[x] + " ";
    }
    else {
      new_name += 'Tier ' + split_name[x];
    }
  }
  return new_name
}