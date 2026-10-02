# ⚡ QUIZZTECH — Cyber Trivia Challenge 2026

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**QuizzTech** adalah website mini game kuis trivia interaktif bertema *Cyberpunk / Futuristic Dark Mode* yang dirancang khusus untuk meramaikan kegiatan **MAKRAB 2026**. Game ini menguji wawasan pengguna seputar teknologi, jaringan, dan internet secara interaktif dan seru.

---

## 🚀 Fitur Utama

- **🎮 Cyber Game Arena:** 10 soal trivia pilihan ganda dengan antarmuka futuristik.
- **⏱️ Live Countdown Timer:** Batas waktu 15 detik per soal dengan indikator visual *progress bar*.
- **🔥 Combo Streak System:** Bonus poin berlipat ganda untuk jawaban benar berturut-turut.
- **📊 Realtime Leaderboard:** Terhubung langsung dengan Google Firebase Firestore untuk menampilkan Top 10 Papan Peringkat secara *realtime*.
- **🔊 Web Audio API Synthesis:** Efek suara interaktif (*click*, *correct*, *wrong*) tanpa memerlukan file audio MP3 eksternal.
- **🎙️ Text-to-Speech (TTS):** Fitur pembaca suara soal otomatis ber-bahasa Indonesia (`id-ID`).
- **📱 Dynamic QR Code Generator:** Modal QR Code otomatis yang membaca URL web aktif secara dinamis.
- **✨ Glassmorphism & Particle Canvas:** Desain estetik dengan efek kaca transparan dan animasi latar belakang partikel.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3 (Flexbox/Grid, Animations), JavaScript (ES6+)
- **Database Realtime:** Google Firebase Firestore
- **Libraries:**
  - [Lucide Icons](https://lucide.dev/) — Ikonik vektor modern
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) — Efek animasi selebrasi
  - [QRCode.js](https://davidshimjs.github.io/qrcodejs/) — Generator QR Code dinamis

---

## 📂 Struktur Repositori

```text
.
├── index.html   # Kerangka dasar & struktur halaman web
├── style.css    # Desain antarmuka, tema cyberpunk & media queries
└── script.js    # Logika game, timer, audio synthesis & integrasi Firebase
