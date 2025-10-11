document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const left = slider.querySelector('.arrow.left');
        const right = slider.querySelector('.arrow.right');

        left.addEventListener('click', () => (track.scrollLeft -= 300));
        right.addEventListener('click', () => (track.scrollLeft += 300));

        // Kéo bằng chuột
        let isDown = false;
        let startX;
        let scrollLeft;
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => isDown = false);
        track.addEventListener('mouseup', () => isDown = false);
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = scrollLeft - walk;
        });
    });
});