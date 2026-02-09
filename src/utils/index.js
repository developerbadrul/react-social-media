import React from "react"

export const getChildId = (children) => {
    const child = React.Children.only(children)
    // console.log(child, "child in children");

    if (typeof child.props.id === "string") {
        return child.props.id
    }
}



export function getDateDifferenceFromNow(date) {
  const target = new Date(date);
  if (isNaN(target)) return 'Invalid date';

  const now = new Date();
  const diffMs = target - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Less than 1 minute
  if (Math.abs(diffSec) < 60) {
    return 'just now';
  }

  // Less than 1 hour
  if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, 'minute');
  }

  // Less than 1 day
  if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, 'hour');
  }

  // Less than 2 days
  if (Math.abs(diffDay) < 2) {
    return rtf.format(diffDay, 'day'); // yesterday / tomorrow
  }

  // Otherwise → ACTUAL DATE
  return target.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
