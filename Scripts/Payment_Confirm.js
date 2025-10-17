    // Danh sách input và validate tương ứng
    var inputs = [
    {id: "cardNumber", regex: /^\d{16}$/, msg: "Số thẻ phải gồm 16 chữ số" },
    {id: "expiry", regex: /^(0[1-9]|1[0-2])\/\d{2}$/, msg: "Định dạng phải là MM/YY" },
    {id: "cvv", regex: /^\d{3, 4}$/, msg: "CVV phải là 3 hoặc 4 chữ số" },
    {id: "cardHolder", regex: /^[A-Z ]+$/, msg: "Tên chủ thẻ viết in hoa, không dấu" },
    {id: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "Email không hợp lệ" }
    ];

    const form = document.getElementById('cardForm');
    const submitButton = document.getElementById('submitPayment');
    const modal = document.getElementById('successModal');
    const modalCloseButton = document.getElementById('modalCloseButton');

    // Cập nhật trạng thái nút Thanh toán
    function updateSubmitButtonState() {
        let allFilled = true;
        inputs.forEach(item => {
            const input = document.getElementById(item.id);

    // Bỏ qua email nếu chọn "Không sử dụng email"
    if (item.id === 'email' && document.getElementById('noEmail').checked) {
                return;
            }
    if (!input || input.value.trim() === '') {
        allFilled = false;
            }
        });

    if (allFilled) {
        submitButton.classList.add('active');
        } else {
        submitButton.classList.remove('active');
        }
    }

    // Theo dõi thay đổi dữ liệu
    inputs.forEach(item => {
        const input = document.getElementById(item.id);
    if (input) {
        input.addEventListener('input', updateSubmitButtonState);
        }
    });
    document.getElementById('noEmail').addEventListener('change', updateSubmitButtonState);

    // Validate khi submit form
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    let formValid = true;

        inputs.forEach(item => {
            const input = document.getElementById(item.id);
    const errorDiv = document.getElementById(`err-${item.id}`);
    const isEmailField = item.id === 'email';
    const isEmailDisabled = isEmailField && document.getElementById('noEmail').checked;

    input.classList.remove('input-error');
    errorDiv.textContent = '';

    if (input.value.trim() === '' && !isEmailDisabled) {
        errorDiv.textContent = 'Trường này là bắt buộc.';
    input.classList.add('input-error');
    formValid = false;
            } else if (input.value.trim() !== '' && !item.regex.test(input.value.trim()) && !isEmailDisabled) {
        errorDiv.textContent = item.msg;
    input.classList.add('input-error');
    formValid = false;
            }
        });

    if (formValid) {
        // Hiển thị pop-up thành công
        modal.style.display = 'block';
        }
    });

    // Đóng modal khi click nút
    modalCloseButton.onclick = function () {
        modal.style.display = 'none';
    }

    // Đóng modal khi click ngoài vùng modal
    window.onclick = function (event) {
        if (event.target == modal) {
        modal.style.display = 'none';
        }
    }

    // Khởi tạo trạng thái ban đầu
    updateSubmitButtonState();
