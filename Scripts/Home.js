document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".brand-btn");
    const sections = document.querySelectorAll(".brand-section");

    // 🌟 Chuyển giữa các tab (nút lựa chọn)
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("active"));
            button.classList.add("active");
            const targetId = button.getAttribute("data-target");
            document.getElementById(targetId)?.classList.add("active");
        });
    });

    // 🌟 Kéo slide bằng chuột
    const sliders = document.querySelectorAll(".slider-track");
    sliders.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('active');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => { isDown = false; });
        track.addEventListener('mouseup', () => { isDown = false; });
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = scrollLeft - walk;
        });
    });
});

/**
 * Hàm điều khiển khi bấm nút ❮ ❯
 * Mỗi lần trượt đúng 3 hình (~960px)
 */
function moveSlide(sectionId, direction) {
    const section = document.getElementById(sectionId);
    const track = section.querySelector(".slider-track");
    const imageWidth = 320; // mỗi ảnh rộng khoảng 300px + margin
    const imagesPerView = 3;
    const scrollAmount = imageWidth * imagesPerView;

    track.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}
