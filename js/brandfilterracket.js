document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const brandFilter = document.getElementById("brandFilter");
  console.log("brandFilter:", brandFilter);

  const productCards = document.querySelectorAll(".product-card");
  console.log("productCards found:", productCards.length);

  if (!brandFilter) {
    console.error("❌ brandFilter NOT FOUND");
    return;
  }

  brandFilter.addEventListener("change", () => {
    console.log("Dropdown changed to:", brandFilter.value);

    productCards.forEach((card) => {
      const brand = card.dataset.brand;
      console.log("Card brand:", brand);

      if (brandFilter.value === "all" || brand === brandFilter.value) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
