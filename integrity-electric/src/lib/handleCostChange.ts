const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>, setCost: React.Dispatch<React.SetStateAction<string|number>>) => {
        const newCost = e.target.value.replace(/[^0-9]/g, "");
        setCost(newCost);
}
export default handleCostChange;
