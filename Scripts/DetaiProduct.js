document.addEventListener("DOMContentLoaded", function () {

    // =========================
    //  DANH SÁCH ẢNH THEO MÀU
    // =========================
    const imageList = {
        White: [
            "/Content/Images/WP1.JPG",
            "/Content/Images/WP2.JPG",
            "/Content/Images/WP3.JPG",
            "/Content/Images/WP4.JPG",
            "/Content/Images/WP5.JPG",
            "/Content/Images/WP6.JPG",
            "/Content/Images/WP7.JPG",
            "/Content/Images/WP8.JPG",
            "/Content/Images/WP9.JPG",
        ],
        Purple: [
            "/Content/Images/PP1.JPG",
            "/Content/Images/PP2.JPG",
            "/Content/Images/PP3.JPG",
            "/Content/Images/PP4.JPG",
            "/Content/Images/PP5.JPG",
            "/Content/Images/PP6.JPG",
            "/Content/Images/PP7.JPG",
            "/Content/Images/PP8.JPG",
            "/Content/Images/PP9.JPG",
        ],
        Black: [
            "/Content/Images/BP1.JPG",
            "/Content/Images/BP2.JPG",
            "/Content/Images/BP3.JPG",
            "/Content/Images/BP4.JPG",
            "/Content/Images/BP5.JPG",
            "/Content/Images/BP6.JPG",
            "/Content/Images/BP7.JPG",
            "/Content/Images/BP8.JPG",
            "/Content/Images/BP9.JPG",
        ],
        Orange: [
            "/Content/Images/OP1.JPG",
            "/Content/Images/OP2.JPG",
            "/Content/Images/OP3.JPG",
            "/Content/Images/OP4.JPG",
            "/Content/Images/OP5.JPG",
            "/Content/Images/OP6.JPG",
            "/Content/Images/OP7.JPG",
            "/Content/Images/OP8.JPG",
            "/Content/Images/OP9.JPG",
        ]
    };

    const mainImage = document.getElementById("mainImage");
    let currentColor = "White"; // mặc định màu trắng
    let currentIndex = 0;

    // =========================
    //  ĐỔI ẢNH CHÍNH KHI CLICK
    // =========================
    function changeImage(img) {
        mainImage.src = img.src;
        let list = imageList[currentColor];
        currentIndex = list.findIndex(src => img.src.includes(src.split("/").pop()));
    }

    // =========================
    //  NEXT / PREV
    // =========================
    function nextImage() {
        let list = imageList[currentColor];
        currentIndex = (currentIndex + 1) % list.length;
        mainImage.src = list[currentIndex];
    }

    function prevImage() {
        let list = imageList[currentColor];
        currentIndex = (currentIndex - 1 + list.length) % list.length;
        mainImage.src = list[currentIndex];
    }

    // =========================
    //  CHỌN MÀU (redirect sang trang mới)
    // =========================
    function selectColor(el, color) {
        document.querySelectorAll(".color-item").forEach(item => item.classList.remove("active"));
        el.classList.add("active");

        switch (color) {
            case "White":
                window.location.href = "/Home/DetailProduct_White";
                break;
            case "Black":
                window.location.href = "/Home/DetailProduct_Black";
                break;
            case "Purple":
                window.location.href = "/Home/DetailProduct_Purple";
                break;
            case "Orange":
                window.location.href = "/Home/DetailProduct_Orange";
                break;
        }
    }

    // =========================
    //  CHỌN SIZE
    // =========================
    function selectSize(el) {
        if (el.classList.contains("disabled")) return;
        document.querySelectorAll(".size").forEach(btn => btn.classList.remove("active"));
        el.classList.add("active");
    }

    // =========================
    //  CHỌN FIT
    // =========================
    function selectFit(btn) {
        document.querySelectorAll('.fit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    // =========================
    //  TĂNG GIẢM SỐ LƯỢNG
    // =========================
    function changeQty(val) {
        let input = document.getElementById('qty');
        let num = parseInt(input.value) + val;
        if (num < 1) num = 1;
        input.value = num;
    }

    // =========================
    //  GIỎ HÀNG
    // =========================
    let cart = [];

    function addToCart() {
        let sizeEl = document.querySelector(".size.active");
        if (!sizeEl) {
            alert("⚠️ Vui lòng chọn kích thước trước khi thêm vào giỏ!");
            return;
        }

        let size = sizeEl.innerText;
        let qty = parseInt(document.getElementById("qty").value) || 1;
        let productName = "Adidas F50 League";
        let productColor = currentColor;
        let price = 2400000;
        let image = mainImage.src;

        cart.push({ name: productName, color: productColor, size, qty, price, image });

        renderCart();
        openCart();
    }

    function renderCart() {
        let cartContent = document.getElementById("cartContent");
        if (!cartContent) return; // nếu chưa có div thì thôi

        if (cart.length === 0) {
            cartContent.innerHTML = "<p>Giỏ hàng trống</p>";
            return;
        }

        let html = "";
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" />
                    <div class="cart-item-details">
                        <strong>${item.name}</strong><br>
                        Màu: ${item.color} - Size: ${item.size}<br>
                        SL: ${item.qty} x ${item.price.toLocaleString()} ₫
                    </div>
                </div>`;
        });
        cartContent.innerHTML = html;
    }

    function openCart() {
        document.getElementById("cartSidebar").classList.add("active");
        document.getElementById("cartOverlay").classList.add("active");
    }

    function closeCart() {
        document.getElementById("cartSidebar").classList.remove("active");
        document.getElementById("cartOverlay").classList.remove("active");
    }

    // =========================
    //  MUA NGAY
    // =========================
    function buyNow() {
        let sizeEl = document.querySelector(".size.active");
        if (!sizeEl) {
            alert("⚠️ Vui lòng chọn kích thước trước khi mua!");
            return;
        }
        alert("🛒 Cảm ơn bạn! Chúng tôi sẽ chuyển đến trang thanh toán.");
        // window.location.href = "checkout.html";
    }

    // Gắn các hàm ra global scope để gọi từ HTML
    window.changeImage = changeImage;
    window.nextImage = nextImage;
    window.prevImage = prevImage;
    window.selectColor = selectColor;
    window.selectSize = selectSize;
    window.selectFit = selectFit;
    window.changeQty = changeQty;
    window.addToCart = addToCart;
    window.buyNow = buyNow;
    window.closeCart = closeCart;
});
