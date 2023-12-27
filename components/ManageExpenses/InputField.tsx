import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

export interface InputFieldProps extends TextInputProps {
	label: String;
	inRow?: Boolean;
}

const InputField = (props: InputFieldProps) => {
	const inputStyles: any[] = [
		styles.input,
		props.multiline && styles.inputMultiLine,
		{ color: "rgba(0,0,0,0.2)" },
	];
	return (
		<View style={[styles.container, props.inRow && { flex: 1 }]}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={[inputStyles]}
			/>
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		marginHorizontal: 4,
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 4,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
	},
	inputMultiLine: {
		minHeight: 100,
		textAlignVertical: "top",
	},
});
