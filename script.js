// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible");
        scrollToTopBtn.classList.add("opacity-100", "visible");
    } else {
        scrollToTopBtn.classList.add("opacity-0", "invisible");
        scrollToTopBtn.classList.remove("opacity-100", "visible");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Form handling
const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

// Phone number validation pattern: 9 digits
const phonePattern = /^[0-9]{9}$/;

// Form submission state
let isSubmitting = false;

// API configuration
const API_CONFIG = {
    baseURL: "https://api.modme.uz/v1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

// Create axios instance
const api = axios.create(API_CONFIG);

// Phone number formatting
phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Agar 998 bilan boshlansa, uni olib tashlaymiz
    if (value.startsWith("998")) {
        value = value.slice(3);
    }

    // Faqat 9 ta raqamni qoldiramiz
    value = value.slice(0, 9);

    e.target.value = value;
});

// Form submission
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values using FormData
    const formData = new FormData(contactForm);

    // Prepare payload
    const payload = {
        branch_id: 3727,
        phone: formData.get("phone"),
        name: formData.get("username"),
        comment: "",
    };

    // Log full request details
    console.log("API Request:", {
        url: "https://api.modme.uz/v1/create_lead",
        method: "POST",
        payload: payload,
    });

    try {
        const response = await api.post("/create_lead", payload);
        console.log("API Response:", response.data);

        if (response.data.success) {
            showSuccess("Sizning so'rovingiz muvaffaqiyatli yuborildi!");
            contactForm.reset();
        } else {
            throw new Error(response.data.message || "Xatolik yuz berdi");
        }
    } catch (error) {
        console.error("Full API Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        showError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring");
    }
});

// Error message handler
function showError(message) {
    const errorDiv = document.getElementById("formError");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
    setTimeout(() => {
        errorDiv.classList.add("hidden");
    }, 5000);
}

// Success message handler
function showSuccess(message) {
    const successDiv = document.getElementById("formSuccess");
    successDiv.textContent = message;
    successDiv.classList.remove("hidden");
    setTimeout(() => {
        successDiv.classList.add("hidden");
    }, 5000);
}
