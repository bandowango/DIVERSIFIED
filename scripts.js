document.addEventListener('DOMContentLoaded', function () {
    const propertyPriceInput = document.querySelector('.primary-input2');
    const downPaymentInput = document.querySelector('.primary-input.append');
    const downPaymentPercentageInput = document.querySelector('.secondary-input');
    const interestRateInput = document.querySelector('.numeric-input');
    const loanTermInput = document.querySelector('.value-set .numeric-input');

    propertyPriceInput.addEventListener('input', calculateMonthlyPayment);
    downPaymentInput.addEventListener('input', calculateMonthlyPayment);
    downPaymentPercentageInput.addEventListener('input', calculateMonthlyPayment);
    interestRateInput.addEventListener('input', calculateMonthlyPayment);
    loanTermInput.addEventListener('input', calculateMonthlyPayment);

    function calculateMonthlyPayment() {
        const propertyPrice = parseFloat(propertyPriceInput.value) || 0;
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const downPaymentPercentage = parseFloat(downPaymentPercentageInput.value) || 0;
        const interestRate = parseFloat(interestRateInput.value) || 0;
        const loanTerm = parseFloat(loanTermInput.value) || 0;

        const adjustedDownPayment = downPayment + (propertyPrice * downPaymentPercentage / 100);
        const loanAmount = propertyPrice - adjustedDownPayment;
        const monthlyInterestRate = interestRate / 100 / 12;

        if (loanTerm === 0 || monthlyInterestRate === 0) {
            updateMonthlyPayment(0);
            return;
        }

        const numberOfPayments = loanTerm * 12;
        const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);

        updateMonthlyPayment(monthlyPayment);
    }

    function updateMonthlyPayment(monthlyPayment) {
        const monthlyPaymentDisplay = document.querySelector('.charts-price__pay');
        monthlyPaymentDisplay.innerText = `฿${monthlyPayment.toFixed(2)}`;
    }
});
