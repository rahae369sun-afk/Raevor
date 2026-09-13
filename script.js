// =========================
// GLOBAL LOADER
// =========================

document.addEventListener("DOMContentLoaded", async () => {

  const isInsidePages = window.location.pathname.includes("/pages/");
  const loaderPath = isInsidePages
    ? "loader.html"
    : "pages/loader.html";

  try {

    const response = await fetch(loaderPath);

    if (!response.ok) {
      throw new Error("Loader not found");
    }

    const html = await response.text();

    document.body.insertAdjacentHTML("afterbegin", html);

    const loader = document.querySelector(".loading");

    if (!loader) return;

    // اگر صفحه همین الان کامل لود شده
    if (document.readyState === "complete") {
      hideLoader(loader);
    } else {
      // اگر هنوز لود نشده، منتظر بمون
      window.addEventListener("load", () => {
        hideLoader(loader);
      }, { once: true });
    }

  } catch (error) {
    console.error("Loader Error:", error);
  }

});


function hideLoader(loader) {

  setTimeout(() => {

    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 400);

  }, 200);

}