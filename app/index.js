require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Route utama dengan tampilan modern
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sistem Absensi Mahasiswa - Dashboard</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #4F46E5;
                --secondary: #10B981;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            .hero-section {
                background: rgba(255, 255, 255, 0.98);
                border-radius: 24px;
                padding: 60px 40px;
                text-align: center;
                margin-bottom: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                animation: fadeInDown 0.6s ease;
            }
            @keyframes fadeInDown {
                from { opacity: 0; transform: translateY(-30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .hero-title {
                font-size: 3.5rem;
                font-weight: 800;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 20px;
            }
            .hero-subtitle {
                font-size: 1.3rem;
                color: #6B7280;
                margin-bottom: 15px;
            }
            .hero-badge {
                display: inline-block;
                background: #F0FDF4;
                color: var(--secondary);
                padding: 10px 20px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 0.9rem;
                margin-top: 10px;
            }
            .menu-card {
                background: white;
                border-radius: 20px;
                padding: 45px 35px;
                text-align: center;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: 3px solid transparent;
                height: 100%;
                cursor: pointer;
                animation: fadeInUp 0.6s ease;
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .menu-card:hover {
                border-color: var(--primary);
                transform: translateY(-15px) scale(1.02);
                box-shadow: 0 25px 60px rgba(79, 70, 229, 0.25);
            }
            .menu-icon {
                font-size: 5rem;
                margin-bottom: 25px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .menu-title {
                font-size: 1.8rem;
                font-weight: 700;
                color: #1F2937;
                margin-bottom: 15px;
            }
            .menu-desc {
                color: #6B7280;
                font-size: 1.05rem;
                margin-bottom: 25px;
            }
            .btn-custom {
                background: linear-gradient(135deg, var(--primary), #6366F1);
                color: white;
                border: none;
                padding: 14px 35px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1.05rem;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
            }
            .btn-custom:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
                color: white;
            }
            .btn-success-custom {
                background: linear-gradient(135deg, var(--secondary), #34D399);
            }
            .footer {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                margin-top: 50px;
                color: #6B7280;
                animation: fadeIn 1s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .badge-feature {
                background: #EEF2FF;
                color: var(--primary);
                padding: 8px 16px;
                border-radius: 25px;
                font-size: 0.85rem;
                font-weight: 600;
                margin: 0 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="hero-section">
                <div class="hero-title">
                    🎓 Sistem Absensi Mahasiswa
                </div>
                <div class="hero-subtitle">
                    Platform Digital untuk Manajemen Kehadiran Mahasiswa
                </div>
                <p style="color: #9CA3AF; font-size: 1rem;">Kelola data mahasiswa dan absensi dengan mudah dan efisien</p>
                <div class="mt-4">
                    <span class="badge-feature">✓ Docker Based</span>
                    <span class="badge-feature">✓ Real-time</span>
                    <span class="badge-feature">✓ Secure</span>
                </div>
                <div class="hero-badge">
                    <i class="fas fa-check-circle"></i> Kelompok 1 - Kelas B
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-6">
                    <div class="menu-card">
                        <div class="menu-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="menu-title">Data Mahasiswa</div>
                        <div class="menu-desc">
                            Kelola informasi lengkap mahasiswa termasuk NIM, nama, dan kelas
                        </div>
                        <a href="/mahasiswa" class="btn-custom">
                            <i class="fas fa-arrow-right me-2"></i>Kelola Data
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="menu-card">
                        <div class="menu-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="menu-title">Data Absensi</div>
                        <div class="menu-desc">
                            Monitor dan kelola rekap kehadiran mahasiswa secara real-time
                        </div>
                        <a href="/absensi" class="btn-custom btn-success-custom">
                            <i class="fas fa-arrow-right me-2"></i>Lihat Absensi
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div style="font-size: 1.1rem; font-weight: 600; color: #1F2937; margin-bottom: 10px;">
                    <i class="fas fa-graduation-cap"></i> Final Project Teknologi Server
                </div>
                <div>Kelompok 1 | Kelas B | 2026</div>
                <div class="mt-3" style="font-size: 0.9rem;">
                    <span class="badge-feature">🐳 Docker</span>
                    <span class="badge-feature">🚀 Node.js</span>
                    <span class="badge-feature">🗄️ MySQL</span>
                    <span class="badge-feature">🌐 Nginx</span>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `)
})

// Import routes
const mahasiswaRoutes = require('./routes/mahasiswa')
const absensiRoutes = require('./routes/absensi')

app.use('/mahasiswa', mahasiswaRoutes)
app.use('/absensi', absensiRoutes)

// Listen
const PORT = process.env.APP_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
