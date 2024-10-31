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
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    
    // Check if the two dates are on the same day
    const sameDay = now.toDateString() === givenDate.toDateString();

    if (sameDay) {
        // Calculate the difference in hours if it's the same day
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        return `${diffInHours}h ago`;
    } else {
        return `${diffInDays}d ago`;
    }
}

export const daysSince = (dateString: string) => {
  const now = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in time (milliseconds)
  //@ts-ignore
  const diffInMs = now - givenDate;
  
  // Calculate the difference in days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  
  // Check if the two dates are on the same day
  const sameDay = now.toDateString() === givenDate.toDateString();


  if (diffInDays < 1) {
      return `Today`;
  } 
  else if(diffInDays == 1){
    return 'Yesterday'
  }
    else {
      return `${diffInDays}d ago`;
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
    return { barPercent, percentile };
  } else {
    const barPercent = Math.abs((userStat - median) / (max - median) / 2 + 0.5) * 100;
    const percentile = 100 - barPercent;
    return { barPercent, percentile };
  }
};

export const convertTimeToUTC = (date: String | Date | Number) =>{
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