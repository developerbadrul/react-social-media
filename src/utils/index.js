import React from "react"

export const getChildId = (children) => {
    const child = React.Children.only(children)
    // console.log(child, "child in children");

    if (typeof child.props.id === "string") {
        return child.props.id
    }
}



export const getDateDifferenceFromNow = (fromDate) => {
    const now = Date.now();
    const target = new Date(fromDate).getTime();

    if (isNaN(target)) return "Invalid Date";

    let diff = Math.floor((now - target) / 1000); // second
    const isPast = diff < 0;
    diff = Math.abs(diff);

    const units = [
        { label: 'day', value: 86400 },
        { label: 'hour', value: 3600 },
        { label: 'minute', value: 60 },
        { label: 'second', value: 1 },
    ];

    const parts = [];

    for (const unit of units) {
        const amount = Math.floor(diff / unit.value);
        if (amount > 0) {
            parts.push(`${amount} ${unit.label}${amount > 1 ? 's' : ''}`)
            diff %= unit.value
        }

        if (parts.length === 2) break;
    }

    if (parts.length === 0) return 'just now';

    return isPast ? `${parts.join(" ")} ago` : `in ${parts.join(" ")}`;
};