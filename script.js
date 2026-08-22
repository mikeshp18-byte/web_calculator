const API_URL =
  "https://zjyffa93q9.execute-api.us-east-1.amazonaws.com/dev/report";

async function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const operation = document.getElementById("operation").value;
  const resultElement = document.getElementById("result");

  if (num1 === "" || num2 === "") {
    resultElement.textContent = "Result: Please enter both numbers";
    return;
  }

  try {
    resultElement.textContent = "Result: Calculating...";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num1: Number(num1),
        num2: Number(num2),
        operation: operation
      })
    });

    const data = await response.json();

    if (!response.ok) {
      resultElement.textContent =
        "Result: " + (data.error || "Something went wrong");
      return;
    }

    resultElement.textContent = "Result: " + data.result;

  } catch (error) {
    console.error(error);
    resultElement.textContent = "Result: Unable to connect to API";
  }
}