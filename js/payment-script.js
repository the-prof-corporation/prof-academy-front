// Simple Payment Methods JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment script loaded');

    // Payment method accordion
    const selectButtons = document.querySelectorAll('.select-method');
    selectButtons.forEach(button => {
        button.onclick = function() {
            const method = this.getAttribute('data-method');
            const card = document.getElementById(method + '-card');
            const content = card.querySelector('.payment-content');

            // Close all other cards
            document.querySelectorAll('.payment-card').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    otherCard.querySelector('.payment-content').style.display = 'none';
                }
            });

            // Toggle current card
            if (content.style.display === 'none' || content.style.display === '') {
                card.classList.add('active');
                content.style.display = 'block';
            } else {
                card.classList.remove('active');
                content.style.display = 'none';
            }
        };
    });

    // File uploads
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach(area => {
        const fileInput = area.querySelector('input[type="file"]');

        area.onclick = function() {
            fileInput.click();
        };

        fileInput.onchange = function() {
            if (this.files[0]) {
                area.classList.add('has-file');
                area.querySelector('i').className = 'fas fa-check-circle';
                area.querySelector('p').textContent = 'تم اختيار الملف: ' + this.files[0].name;
            }
        };
    });

    // Code validation
    const codeInput = document.getElementById('prof-code');
    if (codeInput) {
        codeInput.oninput = function() {
            const code = this.value.trim();
            const status = document.getElementById('code-status');
            const info = document.getElementById('code-info');

            if (code.length >= 8) {
                status.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                setTimeout(() => {
                    const validCodes = ['PROF-2024-PYTHON-001', 'PROF-2024-MATH-002', 'PROF-2024-PHYS-003'];

                    if (validCodes.includes(code.toUpperCase())) {
                        status.innerHTML = '<i class="fas fa-check-circle" style="color: #22c55e;"></i>';
                        info.style.display = 'block';
                    } else {
                        status.innerHTML = '<i class="fas fa-times-circle" style="color: #ef4444;"></i>';
                        alert('كود غير صحيح');
                    }
                }, 1000);
            } else {
                status.innerHTML = '';
                info.style.display = 'none';
            }
        };
    }

    // Form submissions
    const forms = document.querySelectorAll('.payment-form');
    forms.forEach(form => {
        form.onsubmit = function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show success modal
                const overlay = document.getElementById('success-overlay');
                overlay.style.display = 'flex';

                // Reset form
                this.reset();

                // Reset upload areas
                const uploadAreas = this.querySelectorAll('.upload-area');
                uploadAreas.forEach(area => {
                    area.classList.remove('has-file');
                    area.querySelector('i').className = 'fas fa-cloud-upload-alt';
                    area.querySelector('p').textContent = 'اضغط لرفع الصورة أو اسحبها هنا';
                });

                // Close card
                const card = this.closest('.payment-card');
                card.classList.remove('active');
                card.querySelector('.payment-content').style.display = 'none';

            }, 2000);
        };
    });
});

// Close success modal
function closeSuccessModal() {
    document.getElementById('success-overlay').style.display = 'none';
}


