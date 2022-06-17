import { useState } from "react";
import React, { useEffect, useRef } from "react";
const App = () => {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");
	const ops = ["+", "-", "*", "/", "=", ".", "AC"];
	const useEventListener = (eventName, handler, element = window) => {
		const savedHandler = useRef();

		useEffect(() => {
			savedHandler.current = handler;
		}, [handler]);

		useEffect(() => {
			const eventListener = (event) => savedHandler.current(event);
			element.addEventListener(eventName, eventListener);
			return () => {
				element.removeEventListener(eventName, eventListener);
			};
		}, [eventName, element]);
	};

	/**
	 * If the value is an operator and the calc is empty, or if the value is an operator and the last
	 * character of the calc is an operator, then return. Otherwise, add the value to the calc and set the
	 * result to the evaluated calc
	 * @returns the value of the calc variable.
	 */
	const updateCalc = value => {
		if ((ops.includes(value) && calc === '') || (ops.includes(value) && ops.includes(calc.slice(-1)))) {
			return;
		}

		setCalc(calc + value);
		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}
	}
	/**
	 * It takes the current value of the calc state, evaluates it as a mathematical expression, and then
	 * sets the calc state to the result of that evaluation
	 */
	const calculate = () => {
		setCalc(eval(calc).toString());

	}
	const createDigits = () => {
		const digits = [];
		for (let i = 1; i < 10; i++) {
			digits.push(<button key={1} onClick={() => { updateCalc(i.toString()) }}>{i}</button>);
		}
		return digits;
	}
	const deleteLast = () => {
		if (calc === '') {
			return;
		}
		const value = calc.slice(0, -1);
		setCalc(value);
	}
	const clear = () => {
		setCalc("");
		setResult("");
	}
	const handler = ({ key }) => {
		console.log(key)
		console.log(typeof (key))
		// eslint-disable-next-line default-case
		switch (key) {
			case 'Enter':
				calculate();
				break;
			case '1':
				updateCalc('1');
				break;
			case '2':
				updateCalc('2');
				break;
			case '3':
				updateCalc('3');
				break;
			case '4':
				updateCalc('4');
				break;
			case '5':
				updateCalc('5');
				break;
			case '6':
				updateCalc('6');
				break;
			case '7':
				updateCalc('7');
				break;
			case '8':
				updateCalc('8');
				break;
			case '9':
				updateCalc('9');
				break;
			case '0':
				updateCalc('0');
				break;
			case '.':
				updateCalc('.');
				break;
			case '+':
				updateCalc('+');
				break;
			case '-':
				updateCalc('-');
				break;
			case '*':
				updateCalc('*');
				break;
			case '/':
				updateCalc('/');
				break;
			case '=':
				calculate();
				break;
			case '(':
				updateCalc('(');
				break;
			case ')':
				updateCalc(')');
				break;
		}
	};

	useEventListener("keydown", handler);
	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : ''}&nbsp; {calc || 0}
				</div>
				<div className="operators">
					<button onClick={() => { updateCalc('/') }}>/</button>
					<button onClick={() => { updateCalc('*') }}>*</button>
					<button onClick={() => { updateCalc('+') }}>+</button>
					<button onClick={() => { updateCalc('-') }}>-</button>
					<button onClick={() => { updateCalc('(') }}>(</button>
					<button onClick={() => { updateCalc(')') }}>)</button>

					<button onClick={() => { deleteLast() }}>DEL</button>
					<button onClick={() => { clear() }}>AC</button>

				</div>
				<div className="digits">
					{createDigits()}
					<button onClick={() => { updateCalc('0') }}>0</button>
					<button onClick={() => { updateCalc('.') }}>.</button>

					<button onClick={() => { calculate() }}>=</button>
				</div>
			</div>
		</div>

	);
}

export default App;
