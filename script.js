function calculate() {
  const price = parseFloat(document.getElementById("price").value);
  const discount = parseFloat(document.getElementById("discount").value || price);
  const months = parseInt(document.getElementById("months").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
  const processingFee = parseFloat(document.getElementById("processingFee").value) || 0;
  const gstRate = parseFloat(document.getElementById("gstRate").value) || 18;

  if (!price || !months) {
    alert("Please enter valid price and months");
    return;
  }

  // Convert annual interest to monthly rate
  const monthlyRate = interestRate / 12 / 100;

  // EMI formula
  const emi = monthlyRate === 0
    ? discount / months
    : (discount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - discount;

  const gstOnInterest = totalInterest * (gstRate / 100);
  const gstOnProcessing = processingFee * (gstRate / 100);

  const totalCost = totalPayment + processingFee + gstOnInterest + gstOnProcessing;
  const extra = totalCost - discount;

  // Display results
  document.getElementById("emi").innerText = emi.toFixed(2);
  document.getElementById("interest").innerText = totalInterest.toFixed(2);
  document.getElementById("gstInterest").innerText = gstOnInterest.toFixed(2);
  document.getElementById("processingTotal").innerText = (processingFee + gstOnProcessing).toFixed(2);
  document.getElementById("totalCost").innerText = totalCost.toFixed(2);
  document.getElementById("extra").innerText = extra.toFixed(2);

  document.getElementById("result").classList.remove("hidden");
}
