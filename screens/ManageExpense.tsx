import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpensesForm from "../components/ManageExpenses/ExpensesForm";

function ManageExpense() {
	const expensesCtx = useContext(ExpensesContext);
	const navigation = useNavigation<any>();
	const route = useRoute<any>();
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const selectedExpense = expensesCtx.expenses.find(
		(item) => item.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(expenseData: {
		desc: string;
		date: string;
		amount: string;
	}) {
		console.log(expenseData);
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpensesForm
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
				submitButtonLabel={!isEditing ? "Add" : "Update"}
				defaultValue={
					selectedExpense || { amount: "", date: "", description: "" }
				}
			/>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
