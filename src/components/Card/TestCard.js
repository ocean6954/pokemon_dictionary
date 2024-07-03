import React, { useState } from "react";
import styled from "styled-components";

const HoverList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HoverListItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.isHovered ? "lightblue" : "white")};

  &:hover {
    background-color: lightblue;
  }
`;

const HoverExample = () => {
  const [lastHovered, setLastHovered] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (content) => {
    setLastHovered(content);
    setHoveredItem(content);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div>
      <HoverList>
        <HoverListItem
          onMouseEnter={() => handleMouseEnter("Item 1")}
          isHovered={hoveredItem === "Item 1"}
        >
          Item 1
        </HoverListItem>
        <HoverListItem
          onMouseEnter={() => handleMouseEnter("Item 2")}
          isHovered={hoveredItem === "Item 2"}
        >
          Item 2
        </HoverListItem>
        <HoverListItem
          onMouseEnter={() => handleMouseEnter("Item 3")}
          isHovered={hoveredItem === "Item 3"}
        >
          Item 3
        </HoverListItem>
        <HoverListItem
          onMouseEnter={() => handleMouseEnter("Item 4")}
          isHovered={hoveredItem === "Item 4"}
        >
          Item 4
        </HoverListItem>
        <HoverListItem
          onMouseEnter={() => handleMouseEnter("Item 5")}
          isHovered={hoveredItem === "Item 5"}
        >
          Item 5
        </HoverListItem>
      </HoverList>
      <div>Last hovered: {lastHovered}</div>
    </div>
  );
};

export default HoverExample;
