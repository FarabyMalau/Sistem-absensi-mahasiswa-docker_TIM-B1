const express = require('express')
const router = express.Router()
const db = require('../config/db')

// READ - Tampilkan semua absensi dengan JOIN
router.get('/', (req, res) => {
  // Query untuk absensi
  const queryAbsensi = `
    SELECT a.id, a.mahasiswa_id, m.nama, m.nim, a.tanggal, a.status
    FROM absensi a
    JOIN mahasiswa m ON a.mahasiswa_id = m.id
    ORDER BY a.tanggal DESC, m.nama ASC
  `
  
  // Query untuk daftar mahasiswa (untuk dropdown)
  const queryMahasiswa = 'SELECT * FROM mahasiswa ORDER BY nama ASC'
  
  db.query(queryAbsensi, (err, absensiRows) => {
    if (err) {
      console.error(err)
      return res.send('Error mengambil data absensi')
    }
    
    db.query(queryMahasiswa, (err, mahasiswaRows) => {
      if (err) {
        console.error(err)
        return res.send('Error mengambil data mahasiswa')
      }
      
      res.render('absensi', { 
        absensi: absensiRows,
        mahasiswa: mahasiswaRows 
      })
    })
  })
})

// CREATE - Input absensi baru
router.post('/add', (req, res) => {
  const { mahasiswa_id, tanggal, status } = req.body
  db.query(
    'INSERT INTO absensi (mahasiswa_id, tanggal, status) VALUES (?, ?, ?)',
    [mahasiswa_id, tanggal, status],
    (err) => {
      if (err) {
        console.error(err)
        return res.send('Error menambah absensi')
      }
      res.redirect('/absensi')
    }
  )
})

// UPDATE - Edit absensi
router.post('/update/:id', (req, res) => {
  const { id } = req.params
  const { mahasiswa_id, tanggal, status } = req.body
  db.query(
    'UPDATE absensi SET mahasiswa_id = ?, tanggal = ?, status = ? WHERE id = ?',
    [mahasiswa_id, tanggal, status, id],
    (err) => {
      if (err) {
        console.error(err)
        return res.send('Error mengupdate absensi')
      }
      res.redirect('/absensi')
    }
  )
})

// DELETE - Hapus absensi
router.post('/delete/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM absensi WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err)
      return res.send('Error menghapus absensi')
    }
    res.redirect('/absensi')
  })
})

module.exports = router
