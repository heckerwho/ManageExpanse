import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: { item: any }) {
	const description = itemData.item.desc || itemData.item.description;
	return (
		<ExpenseItem
			{...itemData.item}
			description={description.trim()}
		/>
	);
}

function ExpensesList({ expenses }) {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	);
}

export default ExpensesList;
