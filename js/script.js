const defaultConfig = {
    banner_title: "Hi Revoneers, Welcome To Website",
    banner_subtitle: "Ini adalah website latihan pertama",
    headquarter_title: "Our Headquarter",
    portfolio_title: "Portofolio",
    message_title: "Message Us",
    footer_text: "Created By RevoU"
};

const config = window.elementSdk ? window.elementSdk.config : defaultConfig;

async function onConfigChange(config) {
    document.getElementById('bannerTitle').textContent = config.banner_title || defaultConfig.banner_title;
    document.getElementById('bannerSubtitle').textContent = config.banner_subtitle || defaultConfig.banner_subtitle;
    document.getElementById('headquarterTitle').textContent = config.headquarter_title || defaultConfig.headquarter_title;
    document.getElementById('portfolioTitle').textContent = config.portfolio_title || defaultConfig.portfolio_title;
    document.getElementById('messageTitle').textContent = config.message_title || defaultConfig.message_title;
    document.getElementById('footerText').textContent = config.footer_text || defaultConfig.footer_text;
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["banner_title", config.banner_title || defaultConfig.banner_title],
        ["banner_subtitle", config.banner_subtitle || defaultConfig.banner_subtitle],
        ["headquarter_title", config.headquarter_title || defaultConfig.headquarter_title],
        ["portfolio_title", config.portfolio_title || defaultConfig.portfolio_title],
        ["message_title", config.message_title || defaultConfig.message_title],
        ["footer_text", config.footer_text || defaultConfig.footer_text]
    ]);
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// Form submission handler
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
    const pesan = document.getElementById('pesan').value;

    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <div class="result-item">
            <div class="result-label">Name:</div>
            <div class="result-value">${nama}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Date of Birth:</div>
            <div class="result-value">${tanggalLahir}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Gender:</div>
            <div class="result-value">${jenisKelamin}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Message:</div>
            <div class="result-value">${pesan}</div>
        </div>
    `;
});

// Navbar active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Name Modal Popup
const nameModal = document.getElementById('nameModal');
const nameInput = document.getElementById('nameInput');
const submitNameBtn = document.getElementById('submitName');
const bannerTitle = document.getElementById('bannerTitle');

// Show modal on page load
window.addEventListener('load', function() {
    nameModal.classList.remove('hidden');
    nameInput.focus();
});

// Handle name submission
function submitUserName() {
    // 1. Ambil nilai input dan hilangkan spasi di awal/akhir
    let userName = nameInput.value.trim();

    // 2. Cek logika: Jika kosong pakai "Revoneers", jika ada ubah ke Proper Case
    if (!userName) {
        userName = "Revoneers";
    } else {
        // Logika Proper Case: Kecilkan semua dulu, lalu besarkan huruf pertama setiap kata
        userName = userName.toLowerCase().replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    // 3. Proses penggantian judul (sama seperti sebelumnya, tapi tanpa pengecekan if(userName))
    const currentTitle = config.banner_title || defaultConfig.banner_title;
    
    // Regex kita ubah sedikit ke /Hi [\w\s]+/i agar bisa mendeteksi nama lama meskipun ada spasinya
    const newTitle = currentTitle.replace(/Hi [\w\s]+/i, `Hi ${userName}`);
    
    bannerTitle.textContent = newTitle;
    nameModal.classList.add('hidden');

    if (window.elementSdk) {
        window.elementSdk.setConfig({
            banner_title: newTitle
        });
    }
}
// Submit on button click
submitNameBtn.addEventListener('click', submitUserName);

// Submit on Enter key
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitUserName();
    }
});

// Enable/disable button based on input
nameInput.addEventListener('input', function() {
    submitNameBtn.disabled = !this.value.trim();
});

// Banner Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide every 4 seconds
let sliderInterval = setInterval(nextSlide, 4000);

// Manual navigation with dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);

        // Reset auto slide timer
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 4000);
    });
});