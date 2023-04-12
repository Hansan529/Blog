const bannerColor = document.querySelectorAll(".banner .active");
const handleFixNav = document.querySelector(".fixNav");

setTimeout(() => {
  bannerColor.forEach((value, index) => {
    bannerColor[index].style.fontWeight = 700;
  });
}, 4000);

setTimeout(() => {
  handleFixNav.style.transform = "translateX(0)";
  handleFixNav.style.borderRadius = "0 50px 50px 0";
  setTimeout(() => {
    handleFixNav.style.transform = "translateX(-100%)";
  }, 2000);
}, 4000);
