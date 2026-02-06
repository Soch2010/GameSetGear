const searchInput = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");

// Search data (you can expand this later)
const searchItems = [
  "Tennis Rackets",
  "Tennis Shoes",
  "Tennis Accessories",
  "Wilson Rackets",
  "Babolat Rackets",
  "Nike Tennis Shoes",
  "Adidas Tennis Shoes",
  "Grip Tape",
  "Overgrips",
  "Tennis Balls",
  "Strings",
];

// Listen for typing
searchInput.addEventListener("keyup", function () {
  const input = searchInput.value.toLowerCase();
  resultBox.innerHTML = "";

  if (input.length === 0) {
    return;
  }

  const filteredResults = searchItems.filter((item) =>
    item.toLowerCase().includes(input)
  );

  if (filteredResults.length === 0) {
    resultBox.innerHTML = "<ul><li>No results found</li></ul>";
    return;
  }

  const ul = document.createElement("ul");

  filteredResults.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;

    li.addEventListener("click", function () {
      searchInput.value = item;
      resultBox.innerHTML = "";
    });

    ul.appendChild(li);
  });

  resultBox.appendChild(ul);
});
