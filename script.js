// === KONFIGURASI FIREBASE LOGINKU ===
const firebaseConfig = {
  apiKey: "AIzaSyARSBPbIn9f_NR4ATfuN8xPWLRBlabGS6w",
  authDomain: "quizztech-2026.firebaseapp.com",
  projectId: "quizztech-2026",
  storageBucket: "quizztech-2026.firebasestorage.app",
  messagingSenderId: "586745377677",
  appId: "1:586745377677:web:09e2a7b9b0efd1d8ef03c4"
};

// Inisialisasi Firebase & Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === LOGIKA PARTIKEL BINTANG BACKGROUND ===
const canvas = document.getElementById('canvas-partikel');
const ctx = canvas.getContext('2d');

let partikelArray = [];
const jumlahPartikel = 70;

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

class Partikel {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.ukuran = Math.random() * 2 + 0.5;
        this.kecepatanX = (Math.random() - 0.5) * 0.3;
        this.kecepatanY = (Math.random() - 0.5) * 0.3;
        this.opasitas = Math.random() * 0.6 + 0.2;
    }
    update() {
        this.x += this.kecepatanX;
        this.y += this.kecepatanY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opasitas})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ukuran, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initPartikel() {
    partikelArray = [];
    for (let i = 0; i < jumlahPartikel; i++) partikelArray.push(new Partikel());
}

function animasiPartikel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    partikelArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animasiPartikel);
}
initPartikel();
animasiPartikel();

// === WEB AUDIO SYNTHESIS ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(110, audioCtx.currentTime + 0.15); // A2
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    }
}

// === NAVIGASI ANTAR TAB ===
const menuTautan = document.querySelectorAll('.menu-link');
const semuaBagian = document.querySelectorAll('.bagian');

function bukaBagian(idBagian) {
    playSound('click');
    menuTautan.forEach(link => {
        link.classList.remove('aktif');
        if(link.getAttribute('data-target') === idBagian) link.classList.add('aktif');
    });
    semuaBagian.forEach(bagian => {
        bagian.classList.remove('aktif');
        if(bagian.id === idBagian) bagian.classList.add('aktif');
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
}

menuTautan.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        bukaBagian(this.getAttribute('data-target'));
    });
});

// === DATABASE BANK SOAL KUIS ===
const bankSoal = [
    {
        kategori: "INTERNET",
        soal: "Apa kepanjangan dari kata internet?",
        opsi: ["Interconnected Network", "International Network", "Internal Network", "Information Network"],
        kunci: 0,
        penjelasan: "Internet kepanjangan dari Interconnected Network, jaringan komputer global yang saling terhubung."
    },
    {
        kategori: "JARINGAN",
        soal: "Alamat unik untuk mengidentifikasi perangkat di internet disebut...",
        opsi: ["Nama Domain", "Alamat IP", "URL Website", "Nama Pengguna"],
        kunci: 1,
        penjelasan: "IP Address (Internet Protocol) adalah serangkaian angka unik penanda identitas perangkat."
    },
    {
        kategori: "HARDWARE",
        soal: "Perangkat yang bertugas mengarahkan lalu lintas data antar jaringan berbeda adalah...",
        opsi: ["Switch", "Repeater", "Router", "Kabel LAN"],
        kunci: 2,
        penjelasan: "Router berfungsi memilih rute terbaik dan meneruskan data ke jaringan tujuan."
    },
    {
        kategori: "WEB TECH",
        soal: "Fungsi utama dari DNS (Domain Name System) adalah...",
        opsi: ["Mengamankan data", "Menerjemahkan domain ke IP", "Mempercepat koneksi", "Menyimpan file web"],
        kunci: 1,
        penjelasan: "DNS seperti buku telepon internet yang mengubah domain 'google.com' menjadi alamat angka IP."
    },
    {
        kategori: "INTERNET",
        soal: "Satuan standar kecepatan transfer data internet diukur dalam...",
        opsi: ["Byte per detik", "bit per detik (bps)", "Hertz (Hz)", "Volt (V)"],
        kunci: 1,
        penjelasan: "Kecepatan jaringan diukur dalam bps (bit per second), misalnya Mbps."
    },
    {
        kategori: "KEAMANAN",
        soal: "Tanda 'https' di awal alamat web mengindikasikan bahwa situs tersebut...",
        opsi: ["Bebas iklan", "Terenkripsi & aman", "Resmi pemerintah", "Berkecepatan tinggi"],
        kunci: 1,
        penjelasan: "Huruf 'S' menandakan ketersediaan protokol SSL/TLS untuk enkripsi data komunikasi."
    },
    {
        kategori: "HARDWARE",
        soal: "Perangkat nirkabel khusus yang memancarkan sinyal Wi-Fi dinamakan...",
        opsi: ["Modem Dial-up", "Network Hub", "Access Point", "Network Card"],
        kunci: 2,
        penjelasan: "Access Point (AP) memancarkan sinyal radio Wi-Fi agar perangkat nirkabel dapat terhubung."
    },
    {
        kategori: "JARINGAN",
        soal: "Alamat fisik permanen unik yang tertanam pada NIC/Kartu Jaringan disebut...",
        opsi: ["IP Address", "MAC Address", "Home Address", "Server Address"],
        kunci: 1,
        penjelasan: "MAC (Media Access Control) Address adalah nomor seri identitas fisik bawaan pabrik hardware."
    },
    {
        kategori: "JARINGAN",
        soal: "Kepanjangan dari istilah LAN dalam dunia jaringan komputer adalah...",
        opsi: ["Local Area Network", "Large Area Network", "Long Access Network", "Link Area Network"],
        kunci: 0,
        penjelasan: "LAN adalah jaringan komputer lokal dalam cakupan area kecil seperti lab atau kantor."
    },
    {
        kategori: "KEAMANAN",
        soal: "Proses mengacak data asli menjadi kode rahasia yang tak terbaca disebut...",
        opsi: ["Dekripsi", "Enkripsi", "Kompresi", "Enkapsulasi"],
        kunci: 1,
        penjelasan: "Enkripsi mengamankan pesan agar hanya pihak pemegang kunci yang bisa membacanya."
    }
];

// === STATE LOGIKA GAME ===
let namaPemain = "Player";
let indeksSoal = 0;
let skorTotal = 0;
let jumlahBenar = 0;
let jumlahSalah = 0;
let comboStreak = 0;
let maxCombo = 0;

let sisaWaktu = 15;
let timerInterval = null;
let bisaMenjawab = false;

// === LOGIKA LEADERBOARD FIREBASE REALTIME ===
async function simpanSkorKeFirebase(nama, skor) {
    try {
        await db.collection("leaderboard").add({
            nama: nama,
            skor: skor,
            waktu: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error("Gagal menyimpan skor ke Firebase: ", e);
    }
}

// === LOGIKA LEADERBOARD FIREBASE REALTIME (TOP 10 + BADGE JUARA) ===
function muatLeaderboardRealtime() {
    db.collection("leaderboard")
      .orderBy("skor", "desc")
      .limit(10) // Papan Peringkat Top 10
      .onSnapshot((snapshot) => {
          const container = document.getElementById('leaderboard-list');
          if (!container) return;
          
          container.innerHTML = '';

          let rank = 1;
          snapshot.forEach((doc) => {
              const data = doc.data();
              const row = document.createElement('div');
              row.className = `lb-item ${data.nama === namaPemain ? 'highlight' : ''}`;
              
              // Memberikan Icon Badge Juara untuk Top 3
              let badge = `#${rank}`;
              let badgeClass = "badge-rank";
              if (rank === 1) { badge = '🥇 #1'; badgeClass += " rank-1"; }
              else if (rank === 2) { badge = '🥈 #2'; badgeClass += " rank-2"; }
              else if (rank === 3) { badge = '🥉 #3'; badgeClass += " rank-3"; }

              row.innerHTML = `
                  <span><b class="${badgeClass}">${badge}</b> ${data.nama}</span>
                  <span class="lb-score">${data.skor} PTS</span>
              `;
              container.appendChild(row);
              rank++;
          });
      }, (error) => {
          console.error("Gagal memuat leaderboard: ", error);
      });
}

// === LOGIKA MODAL POPUP QR CODE ===
let qrGenerated = false;

function bukaQR() {
    playSound('click');
    const modal = document.getElementById('modal-qr');
    const currentUrl = window.location.href;
    document.getElementById('qr-url-text').textContent = currentUrl;

    if (!qrGenerated) {
        const qrContainer = document.getElementById('qrcode-container');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: currentUrl,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrGenerated = true;
    }

    modal.style.display = 'flex';
}

function tutupQR() {
    playSound('click');
    document.getElementById('modal-qr').style.display = 'none';
}

// Jalankan listener leaderboard saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", function() {
    muatLeaderboardRealtime();
});

function mulaiGame() {
    const inputNama = document.getElementById('nama-pemain').value.trim();
    if (inputNama !== "") namaPemain = inputNama;

    indeksSoal = 0;
    skorTotal = 0;
    jumlahBenar = 0;
    jumlahSalah = 0;
    comboStreak = 0;
    maxCombo = 0;

    document.getElementById('lobby-game').style.display = 'none';
    document.getElementById('result-game').style.display = 'none';
    document.getElementById('play-game').style.display = 'block';

    tampilkanSoal();
}

function tampilkanSoal() {
    bisaMenjawab = true;
    document.getElementById('feedback-box').style.display = 'none';

    const item = bankSoal[indeksSoal];
    document.getElementById('soal-kategori').textContent = item.kategori;
    document.getElementById('teks-soal-aktif').textContent = item.soal;
    document.getElementById('disp-soal-num').textContent = `${indeksSoal + 1}/${bankSoal.length}`;
    document.getElementById('disp-skor').textContent = skorTotal;
    document.getElementById('disp-combo').textContent = `x${comboStreak}`;

    const container = document.getElementById('pilihan-container');
    container.innerHTML = '';

    const simbol = ['A', 'B', 'C', 'D'];
    item.opsi.forEach((opsiTeks, idx) => {
        const optCard = document.createElement('div');
        optCard.className = `opt-card opt-${idx}`;
        optCard.innerHTML = `
            <div class="opt-symbol">${simbol[idx]}</div>
            <div>${opsiTeks}</div>
        `;
        optCard.onclick = () => pilihJawaban(idx, optCard);
        container.appendChild(optCard);
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    mulaiTimer();
}

function mulaiTimer() {
    clearInterval(timerInterval);
    sisaWaktu = 15;
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';

    timerInterval = setInterval(() => {
        sisaWaktu -= 0.1;
        const persen = (sisaWaktu / 15) * 100;
        timerBar.style.width = `${Math.max(0, persen)}%`;

        if (sisaWaktu <= 0) {
            clearInterval(timerInterval);
            waktuHabis();
        }
    }, 100);
}

function waktuHabis() {
    if (!bisaMenjawab) return;
    bisaMenjawab = false;
    playSound('wrong');

    comboStreak = 0;
    jumlahSalah++;
    document.getElementById('disp-combo').textContent = 'x0';

    highlightJawaban();
    tampilkanFeedback(false, "Waktu Habis!");
}

function pilihJawaban(idxPilihan, elem) {
    if (!bisaMenjawab) return;
    bisaMenjawab = false;
    clearInterval(timerInterval);

    const kunci = bankSoal[indeksSoal].kunci;

    if (idxPilihan === kunci) {
        playSound('correct');
        jumlahBenar++;
        comboStreak++;
        if (comboStreak > maxCombo) maxCombo = comboStreak;

        const bonusWaktu = Math.round(sisaWaktu * 10);
        const poinPoin = 100 + bonusWaktu + (comboStreak * 20);
        skorTotal += poinPoin;

        elem.classList.add('correct');
        tampilkanFeedback(true, `Benar! +${poinPoin} Poin`);
    } else {
        playSound('wrong');
        jumlahSalah++;
        comboStreak = 0;

        elem.classList.add('wrong');
        highlightJawaban();
        tampilkanFeedback(false, "Jawaban Kurang Tepat!");
    }

    document.getElementById('disp-skor').textContent = skorTotal;
    document.getElementById('disp-combo').textContent = `x${comboStreak}`;
}

function highlightJawaban() {
    const kunci = bankSoal[indeksSoal].kunci;
    const cards = document.querySelectorAll('.opt-card');
    if (cards[kunci]) {
        cards[kunci].classList.add('correct');
    }
}

function tampilkanFeedback(isBenar, judul) {
    const fbBox = document.getElementById('feedback-box');
    const fbText = document.getElementById('feedback-text');
    const fbPenjelasan = document.getElementById('feedback-penjelasan');

    fbText.textContent = judul;
    fbText.style.color = isBenar ? "#4ade80" : "#f87171";
    fbPenjelasan.textContent = bankSoal[indeksSoal].penjelasan;

    fbBox.style.display = 'block';
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function lanjutSoal() {
    playSound('click');
    indeksSoal++;

    if (indeksSoal < bankSoal.length) {
        tampilkanSoal();
    } else {
        selesaiGame();
    }
}

function selesaiGame() {
    document.getElementById('play-game').style.display = 'none';
    document.getElementById('result-game').style.display = 'block';

    document.getElementById('final-skor').textContent = skorTotal;
    document.getElementById('stat-benar').textContent = jumlahBenar;
    document.getElementById('stat-salah').textContent = jumlahSalah;
    document.getElementById('stat-combo').textContent = `x${maxCombo}`;

    const msg = document.getElementById('result-message');
    if (skorTotal >= 1500) {
        msg.textContent = `Luar biasa, ${namaPemain}! Kamu seorang QuizzTech Master!`;
    } else if (skorTotal >= 1000) {
        msg.textContent = `Bagus sekali, ${namaPemain}! Wawasan teknologimu mantap!`;
    } else {
        msg.textContent = `Kerja bagus, ${namaPemain}! Tingkatkan lagi pengetahuan teknologimu!`;
    }

    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Kirim skor ke Firebase secara otomatis
    simpanSkorKeFirebase(namaPemain, skorTotal);
}

function ulangGame() {
    playSound('click');
    mulaiGame();
}

function bacaSoalAktif() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const teks = bankSoal[indeksSoal].soal;
        const utterance = new SpeechSynthesisUtterance(teks);
        utterance.lang = 'id-ID';
        window.speechSynthesis.speak(utterance);
    }
}