import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import Message from "./Message.js";
const Students = (props) => {
	const [enteredCode, setEnteredCode] = useState("");
	const [textMessage, setTextMessage] = useState("");
	const [quizData, setQuizData] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [optionState, setOptionState] = useState(false);

	useEffect(() => {
		fetch(`/api/${props.route}`)
			.then((res) => res.json())
			.then((data) => setQuizData(data))
			.catch((err) => console.error(err));
	}, [props.route]);

	const changeHandler = (event) => {
		setEnteredCode(event.target.value);
	};

	return (
		<div className="survey-page">
			{isSubmitted ? (
				<Message
					setIsSubmitted={setIsSubmitted}
					textMessage={textMessage}
					setOptionState={setOptionState}
					setCode={props.setCode}
				/>
			) : null}
			<input
				type="text"
				onChange={changeHandler}
				placeholder="Enter the code"
				autoFocus
			/>
			{quizData.questions_id && props.code === enteredCode && !optionState ? (
				<Questions
					quizData={quizData}
					quizId={props.quizId}
					setIsSubmitted={setIsSubmitted}
					setTextMessage={setTextMessage}
				/>
			) : null}
		</div>
	);
};
export default Students;
