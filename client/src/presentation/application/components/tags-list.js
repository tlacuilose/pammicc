import React from "react";

export default function TagsList(props) {

  const tagsList = createTags(props.tags);

  // Create html tag elements from a comma separate string.
  function createTags(text) {
    if (text === "") {
      return ""
    }

    // HTML elements
    let elements = [];
    // Cycle diferent colors for tags arbitrarily.
    const colors = ["badge-primary", "badge-ghost", "badge-secondary", "badge-accent", ""];
    // Split commas removing spaces.
    const tags = text.trim().split(",").map(s => s.trim());
    // Build a div for every tag.
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "") {
        continue;
      }
      let colorI = i % colors.length;
      elements.push(<div key={i} className={"mr-1 whitespace-nowrap badge " + colors[colorI]}>{tags[i]}</div>)
    }
    return elements
  }

  return (
    <div className="h-24 overflow-x-scroll">
      {tagsList}
    </div>
  );
}
