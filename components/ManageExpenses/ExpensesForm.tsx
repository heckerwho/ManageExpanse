import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "./InputField";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/style";
import IconButton from "../UI/IconButton";
import { format } from "date-fns";
import { getFormattedDate } from "../../uil/date";

export interface FormProps {
	onCancel: () => void;
	submitButtonLabel: string;
	onSubmit: (expenseData?: any) => any;
	defaultValue?: {
		amount?: any;
		date?: any;
		description?: any;
	};
}

const ExpensesForm = (props: FormProps) => {
	const [inputValue, setInputValue] = useState({
		amount: {
			value: props.defaultValue.amount.toString(),
			isValid: !!props.defaultValue.amount,
		},
		date: {
			value: props.defaultValue.date ? getFormattedDate(props.defaultValue.date) : "",
			isValid: !!props.defaultValue.date,
		},
		description: {
			value: props.defaultValue.description,
			isValid: !!props.defaultValue.amount,
		},
	});
	console.log("inputValue:", inputValue);
	const inputChangeHandler = (inputIdentifier: string, text: string) => {
		setInputValue((prevState) => {
			return {
				...prevState,
				[inputIdentifier]: {
					value: text,
					...[inputIdentifier],
				},
			};
		});
	};
	const onFormStateChange = (key: string, value: string) => {
		setInputValue((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	const submitHandler = () => {
		const expenseData = {
			amount: Number(inputValue.amount.value.replace(",", ".")),
			date: new Date(inputValue.date.value),
			description: inputValue.description.value,
		};
		// console.log(expenseData);
		const amountIsValid = expenseData && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descIsValid = !!expenseData.description.trim();
		if (amountIsValid && dateIsValid && descIsValid) props.onSubmit(expenseData);
		else
			setInputValue({
				description: { ...inputValue.description, isValid: descIsValid },
				amount: { ...inputValue.amount, isValid: amountIsValid },
				date: { ...inputValue.date, isValid: dateIsValid },
			});
	};

	return (
		<View style={{ marginTop: 80 }}>
			<Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Your Expense</Text>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<InputField
					label={"Amount"}
					value={inputValue.amount.value}
					keyboardType="decimal-pad"
					onChangeText={inputChangeHandler.bind(this, "amount")}
					inRow
				/>
				<InputField
					label={"Date"}
					placeholder="YYYY-MM-DD"
					value={inputValue.date.value}
					onChangeText={inputChangeHandler.bind(this, "date")}
					maxLength={10}
					inRow
				/>
			</View>
			<InputField
				label={"Description"}
				multiline
				value={inputValue.description.value}
				onChangeText={inputChangeHandler.bind(this, "description")}
			/>
			<View style={styles.buttons}>
				<Button
					style={styles.button}
					onPress={props.onCancel}
					children="Cancel"
				/>

				<Button
					style={styles.button}
					onPress={submitHandler}
					children={props.submitButtonLabel}
				/>
			</View>
		</View>
	);
};

export default ExpensesForm;

const styles = StyleSheet.create({
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
