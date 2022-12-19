export const AmountConverter = (amount) => {
    return Math.abs(amount) > 999
        ? Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1) + "k"
        : Math.sign(amount) * Math.abs(amount);
}