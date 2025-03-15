const handleCostChange = (e, setCost) => {
        const newCost = e.target.value.replace(/[^0-9]/g, "");
        setCost(newCost);
}
export default handleCostChange;
