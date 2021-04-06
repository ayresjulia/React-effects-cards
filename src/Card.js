import React, { useState } from "react";
import "./Card.css";

const Card = ({ image, name }) => {
	const [ { angle, randomX, randomY } ] = useState({
		angle: Math.random() * 90 - 45,
		randomX: Math.random() * 40 - 20,
		randomY: Math.random() * 40 - 20
	});

	return (
		<img
			className="Card-img"
			style={{ posititon: "absolute", transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` }}
			src={image}
			alt={name}
		/>
	);
};

export default Card;
