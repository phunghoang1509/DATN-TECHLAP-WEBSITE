const imageSlider = document.querySelector(".image-slider");
const images = document.querySelectorAll(".image");
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider();
}

function updateSlider() {
  const translateValue = -currentIndex * 100;
  imageSlider.style.transform = `translateX(${translateValue}%)`;
}

setInterval(nextSlide, 3000);
const imgElement = document.querySelector(".img1");

function bounceElement() {
  imgElement.style.transform = "translateY(-20px)";
  setTimeout(() => {
    imgElement.style.transform = "translateY(0)";
  }, 500); // Thời gian trôi qua giữa hai trạng thái
}

setInterval(bounceElement, 1000);
const bannerContainer = document.querySelector('.banner-container');
  const spacer = document.querySelector('.spacer');

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const spacerTop = spacer.offsetTop;

    if (scrollPosition > spacerTop) {
      // Khi cuộn xuống, đặt vị trí của banner container về đầu trang
      bannerContainer.style.top = '0';
    } else {
      // Khi cuộn lên, đặt vị trí của banner container về vị trí bình thường
      bannerContainer.style.top = `-${scrollPosition}px`;
    }
  }

  window.addEventListener('scroll', handleScroll);