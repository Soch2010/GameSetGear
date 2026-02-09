document.addEventListener("DOMContentLoaded", () => {
  const brandFilter = document.getElementById("brandFilter");
  const productCards = document.querySelectorAll(".product-card");

  // Safety check – prevents JS errors if elements are missing
  if (!brandFilter || productCards.length === 0) {
    console.warn("Brand filter: elements not found");
    return;
  }

  brandFilter.addEventListener("change", () => {
    const selectedBrand = brandFilter.value.toLowerCase();

    productCards.forEach((card) => {
      const cardBrand = card.dataset.brand?.toLowerCase();

      if (selectedBrand === "all" || cardBrand === selectedBrand) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
