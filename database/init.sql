-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS absensi_db;
USE absensi_db;

-- Tabel mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  kelas VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel absensi
CREATE TABLE IF NOT EXISTS absensi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mahasiswa_id INT NOT NULL,
  tanggal DATE NOT NULL,
  status ENUM('Hadir', 'Izin', 'Alpha') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id) ON DELETE CASCADE
);

-- Data dummy (opsional)
INSERT INTO mahasiswa (nim, nama, kelas) VALUES
('20240140001', 'Ahmad Rizki', 'TI-A'),
('20240140002', 'Siti Nurhaliza', 'TI-A'),
('20240140003', 'Budi Santoso', 'TI-B')
ON DUPLICATE KEY UPDATE nim=nim;

INSERT INTO absensi (mahasiswa_id, tanggal, status) VALUES
(1, '2026-01-10', 'Hadir'),
(2, '2026-01-10', 'Hadir'),
(3, '2026-01-10', 'Izin')
ON DUPLICATE KEY UPDATE mahasiswa_id=mahasiswa_id;