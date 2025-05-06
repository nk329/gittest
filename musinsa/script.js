document.addEventListener('DOMContentLoaded', () => {
  // 검색 팝업 관련 요소
  const searchTrigger = document.querySelector('.search-trigger');
  const searchPopup = document.querySelector('.search-popup');
  const closeSearch = document.querySelector('.close-search');
  const searchInput = document.querySelector('.search-header input');
  const mainSearchInput = document.querySelector('.search-wrapper input');
  const mainSearchButton = document.querySelector('.search-wrapper button');

  // 검색 팝업 열기
  function openSearchPopup(e) {
    e.preventDefault();
    e.stopPropagation();
    searchPopup.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  }

  // 검색 팝업 닫기
  function closeSearchPopup() {
    searchPopup.classList.remove('active');
    document.body.style.overflow = ''; // 배경 스크롤 복원
  }

  // 이벤트 리스너 등록
  searchTrigger.addEventListener('click', openSearchPopup);
  searchTrigger.addEventListener('touchend', openSearchPopup);
  mainSearchInput.addEventListener('click', openSearchPopup); // 메인 검색창 클릭
  mainSearchButton.addEventListener('click', openSearchPopup); // 메인 검색 버튼 클릭
  closeSearch.addEventListener('click', closeSearchPopup);

  // ESC 키로 검색 팝업 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
      closeSearchPopup();
    }
  });

  // 검색창 외부 클릭시 닫기
  document.addEventListener('click', (e) => {
    if (searchPopup.classList.contains('active') && 
        !searchPopup.contains(e.target) && 
        !searchTrigger.contains(e.target) &&
        !mainSearchInput.contains(e.target) &&
        !mainSearchButton.contains(e.target)) {
      closeSearchPopup();
    }
  });

  // 캐러셀 관련 코드는 그대로 유지
  const carousel = document.querySelector('.carousel-container');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  const totalItems = items.length;

  function moveCarousel(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  function nextSlide() {
    if (currentIndex === totalItems - 1) {
      moveCarousel(0);
    } else {
      moveCarousel(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex === 0) {
      moveCarousel(totalItems - 1);
    } else {
      moveCarousel(currentIndex - 1);
    }
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);

  // 상품 슬라이더 기능
  const productGrid = document.querySelector('.product-grid');
  const productPrevBtn = document.querySelector('.product-section .prev-btn');
  const productNextBtn = document.querySelector('.product-section .next-btn');
  
  // 슬라이드 스크롤 함수
  function slideProducts(direction) {
    const scrollAmount = productGrid.offsetWidth;
    const currentScroll = productGrid.scrollLeft;
    
    productGrid.scrollTo({
      left: currentScroll + (direction === 'next' ? scrollAmount : -scrollAmount),
      behavior: 'smooth'
    });
  }

  // 버튼 클릭 이벤트
  if (productPrevBtn && productNextBtn) {
    productPrevBtn.addEventListener('click', () => slideProducts('prev'));
    productNextBtn.addEventListener('click', () => slideProducts('next'));
  }

  // 상품 슬라이더 드래그 기능
  let isDragging = false;
  let startX;
  let scrollLeft;
  let isClick = false;

  // 마우스 이벤트
  productGrid.addEventListener('mousedown', (e) => {
    isDragging = true;
    isClick = true;
    productGrid.classList.add('dragging');
    startX = e.pageX - productGrid.offsetLeft;
    scrollLeft = productGrid.scrollLeft;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    isClick = false;
    e.preventDefault();
    const x = e.pageX - productGrid.offsetLeft;
    const walk = (x - startX) * 2;
    productGrid.scrollLeft = scrollLeft - walk;
  });

  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    productGrid.classList.remove('dragging');

    // 클릭으로 스크롤
    if (isClick && productGrid.contains(e.target)) {
      const containerWidth = productGrid.offsetWidth;
      const clickPosition = e.pageX - productGrid.getBoundingClientRect().left;
      
      if (clickPosition > containerWidth / 2) {
        // 오른쪽 클릭
        productGrid.scrollBy({
          left: containerWidth / 2,
          behavior: 'smooth'
        });
      } else {
        // 왼쪽 클릭
        productGrid.scrollBy({
          left: -containerWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  });

  // 터치 이벤트
  productGrid.addEventListener('touchstart', (e) => {
    isDragging = true;
    productGrid.classList.add('dragging');
    startX = e.touches[0].pageX - productGrid.offsetLeft;
    scrollLeft = productGrid.scrollLeft;
  });

  productGrid.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - productGrid.offsetLeft;
    const walk = (x - startX) * 2;
    productGrid.scrollLeft = scrollLeft - walk;
  });

  productGrid.addEventListener('touchend', () => {
    isDragging = false;
    productGrid.classList.remove('dragging');
  });

  // 링크 클릭 방지
  const preventClick = (e) => {
    if (!isClick) {
      e.preventDefault();
    }
  };

  const links = productGrid.getElementsByTagName('a');
  for (let link of links) {
    link.addEventListener('click', preventClick);
  }

  // 스크롤 위치에 따른 버튼 표시/숨김
  function updateButtonVisibility() {
    if (productPrevBtn && productNextBtn) {
      productPrevBtn.style.display = productGrid.scrollLeft <= 0 ? 'none' : 'flex';
      productNextBtn.style.display = 
        productGrid.scrollLeft >= (productGrid.scrollWidth - productGrid.offsetWidth - 10) 
          ? 'none' : 'flex';
    }
  }

  productGrid.addEventListener('scroll', updateButtonVisibility);
  updateButtonVisibility(); // 초기 버튼 상태 설정

  // Footer 아코디언 메뉴
  document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;
      button.classList.toggle('active');
      
      if (button.classList.contains('active')) {
        accordionContent.classList.add('active');
      } else {
        accordionContent.classList.remove('active');
      }
    });
  });
}); 

function updateTimesaleTimer() {
  const timerElem = document.getElementById('timesale-timer');
  if (!timerElem) return;

  // 다음날 0시(자정)까지 남은 시간 계산
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diff = tomorrow - now;

  if (diff > 0) {
    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    timerElem.textContent = `${hours}:${minutes}:${seconds}`;
  } else {
    timerElem.textContent = "00:00:00";
  }
}

// 1초마다 타이머 갱신
setInterval(updateTimesaleTimer, 1000);
updateTimesaleTimer();
