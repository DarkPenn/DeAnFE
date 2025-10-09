
    document.addEventListener('DOMContentLoaded', function () {
            const items = document.querySelectorAll('.topbar-item');
    const prevBtn = document.querySelector('.topbar-btn.prev');
    const nextBtn = document.querySelector('.topbar-btn.next');
    let index = 0;
    let autoSlide;

    function showItem(i) {
        items.forEach((item, idx) => {
            item.classList.remove('active');
            if (idx === i) item.classList.add('active');
        });
            }

    function nextItem() {
        index = (index + 1) % items.length;
    showItem(index);
            }

    function prevItem() {
        index = (index - 1 + items.length) % items.length;
    showItem(index);
            }

    function startAutoSlide() {
        autoSlide = setInterval(nextItem, 4000);
            }

    function resetAutoSlide() {
        clearInterval(autoSlide);
    startAutoSlide();
            }

            nextBtn.addEventListener('click', () => {nextItem(); resetAutoSlide(); });
            prevBtn.addEventListener('click', () => {prevItem(); resetAutoSlide(); });

    showItem(index);
    startAutoSlide();
        });
