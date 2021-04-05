import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
	const [ deck, setDeck ] = useState(null);
	const [ card, setCard ] = useState([]);
	const [ autoDraw, setAutoDraw ] = useState(false);
	const timerId = useRef(null);

	useEffect(
		() => {
			async function loadData() {
				const res = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
				setDeck(res.data);
			}
			loadData();
		},
		[ setDeck ]
	);

	useEffect(
		() => {
			async function loadCard() {
				try {
					const cardRes = await axios.get(`${API_BASE_URL}/${deck["deck_id"]}/draw/?count=1`);

					if (cardRes.data.remaining === 0) {
						setAutoDraw(false);
						alert("The deck is empty!");
					}

					setCard((c) => [
						...c,
						{
							name: cardRes.data.cards[0].code,
							image: cardRes.data.cards[0].image
						}
					]);
					console.log(cardRes.data.cards[0].code);
				} catch (e) {
					console.log(e);
				}
			}

			if (autoDraw && !timerId.current) {
				timerId.current = setInterval(async () => {
					await loadCard();
				}, 1000);
			}

			return () => {
				clearInterval(timerId.current);
			};
		},
		[ autoDraw, setAutoDraw, deck, setCard ]
	);

	const toggleAutoDraw = () => {
		setAutoDraw((auto) => !auto);
	};

	const cards = card.map((c) => <Card name={c.name} image={c.image} key={c.name} />);
	return (
		<div className="Deck">
			{deck ? (
				<button className="Deck-btn" onClick={toggleAutoDraw}>
					{autoDraw ? "Stop" : "Start"} drawing
				</button>
			) : null}
			<div className="Deck-card">{cards}</div>
		</div>
	);
};

export default Deck;
