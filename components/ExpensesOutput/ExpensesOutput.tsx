import { StyleSheet, Text, View } from "react-native";

import ExpensesList from "./ExpenseList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/style";

export interface ExpensesOutputProps {
	expenses: any[];
	expensesPeriod: string;
	fallbackText?: string;
}

function ExpensesOutput(props: ExpensesOutputProps) {
	const { expenses, expensesPeriod, fallbackText } = props;
	let content = <Text style={styles.infoText}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}

	return (
		<View style={styles.container}>
			<ExpensesSummary
				expenses={expenses}
				periodName={expensesPeriod}
			/>
			{content}
		</View>
	);
}

export default ExpensesOutput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	infoText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		marginTop: 32,
	},
});
