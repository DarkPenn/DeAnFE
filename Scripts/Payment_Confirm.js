document.addEventListener("DOMContentLoaded", function () {

    const fields = {
        cardNumber: document.getElementById("cardNumber"),
        expiry: document.getElementById("expiry"),
        cvv: document.getElementById("cvv"),
        cardHolder: document.getElementById("cardHolder"),
        email: document.getElementById("email"),
        terms: document.getElementById("terms"),
        noEmail: document.getElementById("noEmail")
    };

    const errors = {
        cardNumber: document.getElementById("err-cardNumber"),
        expiry: document.getElementById("err-expiry"),
        cvv: document.getElementById("err-cvv"),
        cardHolder: document.getElementById("err-cardHolder"),
        email: document.getElementById("err-email")
    };

    const submitBtn = document.getElementById("submitPayment");
    const modal = document.getElementById("successModal");
    const modalClose = document.getElementById("modalCloseButton");

    // 🔹 Xóa lỗi cũ
    function clearErrors() {
        Object.values(errors).forEach(e => e.textContent = "");
        Object.values(fields).forEach(f => f.classList.remove("error-border"));
    }

    // 🔹 Hiển thị lỗi
    function showError(field, message) {
        if (errors[field]) {
            errors[field].textContent = message;
            fields[field].classList.add("error-border");
        }
    }
    const noEmail = document.getElementById("noEmail");
    if (noEmail) {
        noEmail.addEventListener("change", updateButtonState);
    }

    // 🔹 Kiểm tra hợp lệ
    function validateForm() {
        clearErrors();
        let valid = true;

        // Số thẻ
        if (!/^\d{16}$/.test(fields.cardNumber.value.trim())) {
            showError("cardNumber", "Số thẻ phải gồm 16 chữ số");
            valid = false;
        }

        // Tháng/năm
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fields.expiry.value.trim())) {
            showError("expiry", "Định dạng phải là MM/YY");
            valid = false;
        }

        // CVV
        if (!/^\d{3,4}$/.test(fields.cvv.value.trim())) {
            showError("cvv", "CVV phải là 3 hoặc 4 chữ số");
            valid = false;
        }

        // Tên chủ thẻ
        if (!/^[A-Z ]+$/.test(fields.cardHolder.value.trim())) {
            showError("cardHolder", "Tên chủ thẻ phải viết in hoa, không dấu");
            valid = false;
        }

        // Email (chỉ kiểm tra nếu không chọn “Không sử dụng email”)
        if (!fields.noEmail.checked) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) {
                showError("email", "Email không hợp lệ");
                valid = false;
            }
        }

        // Điều khoản
        if (!fields.terms.checked) {
            alert("Vui lòng đồng ý với Chính sách bảo vệ dữ liệu cá nhân.");
            valid = false;
        }

        return valid;
    }

    // 🔹 Khi người dùng bấm “Xác nhận thanh toán”
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (validateForm()) {
            // Lưu thông tin thẻ vào localStorage (demo)
            const paymentInfo = {
                cardNumber: fields.cardNumber.value.trim(),
                expiry: fields.expiry.value.trim(),
                cardHolder: fields.cardHolder.value.trim(),
                email: fields.noEmail.checked ? "Không sử dụng email" : fields.email.value.trim(),
                method: "Credit/Debit Card"
            };

            localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

            // Hiển thị popup thành công
            modal.style.display = "flex";

            // Sau 4 giây tự động quay về trang chủ
            setTimeout(() => {
                window.location.href = "http://localhost:56486/Home/Home";
            }, 4000);
        }
    });

    // 🔹 Đóng popup thủ công
    modalClose.addEventListener("click", function () {
        modal.style.display = "none";
        window.location.href = "http://localhost:56486/Home/Home";
    });

});
