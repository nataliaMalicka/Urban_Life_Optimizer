function calculateMonthlyRentBudget(monthlyIncome, incomePercentage = 0.5) {
  return monthlyIncome * incomePercentage;
}

async function fetchNeighborhoodData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load data");
    return await response.json();
  } catch (error) {
    console.error("Data Fetch Error:", error);
    return [];
  }
}

function filterByBudget(neighborhoods, maxRent) {
  return neighborhoods.filter(area => area.avgRent <= maxRent);
}

function displayNeighborhoods(list, budget) {
  console.log(`--- Budget: $${budget.toFixed(2)}/mo ---`);
  
  if (list.length === 0) {
    console.log("No neighborhoods found within your budget.");
    return;
  }

  list.forEach(item => {
    console.log(`Neighbourhood: ${item.neighborhood}, Average Rent: ($${item.avgRent})`);
  });
}

async function runAffordabilityCheck(monthlyIncome, incomePercentage) {
  const budget = calculateMonthlyRentBudget(monthlyIncome, incomePercentage);
  const allNeighborhoods = await fetchNeighborhoodData('./data.json');
  const affordableList = filterByBudget(allNeighborhoods, budget);
  
  displayNeighborhoods(affordableList, budget);
}
