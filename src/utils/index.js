import React from "react"

export const getChildId = (children) => {
    const child = React.Children.only(children)
    // console.log(child, "child in children");

    if (typeof child.props.id === "string") {
        return child.props.id
    }
}