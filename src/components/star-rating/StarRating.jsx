import Star from "./Star";
import { useState } from "react";
import PropTypes from "prop-types";

// object for inline styles of the container
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

// object for inline styles of the star container
const starContainerStyle = {
  display: "flex",
};

/*
 the <StarRating /> component takes in 7 props which are meant to allow this component to be reusable
and used in different scenarios across different apps.
Default values are used for the props for when users do not assign prop values to the component
*/
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // object defining inline styles for the numbers displayed when user hovers over and selects a number of starts
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  function handleRating(userRating) {
    setRating(userRating);
    onSetRating(userRating);
  }
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func
}
