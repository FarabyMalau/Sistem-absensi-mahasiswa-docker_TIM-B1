const express = require('express')
const router = express.Router()
const db = require('../config/db')

// READ - Tampilkan semua mahasiswa
router.get('/', (req, res) => {
  db.query('SELECT * FROM mahasiswa ORDER BY id DESC', (err, rows) => {
    if (err) {
      console.error(err)
      return res.send('Error mengambil data mahasiswa')
    }
    res.render('mahasiswa', { mahasiswa: rows })
  })
})

// CREATE - Tambah mahasiswa
router.post('/add', (req, res) => {
  const { nim, nama, kelas } = req.body
  db.query(
    'INSERT INTO mahasiswa (nim, nama, kelas) VALUES (?, ?, ?)',
    [nim, nama, kelas],
    (err) => {
      if (err) {
        console.error(err)
        return res.send('Error menambah data')
      }
      res.redirect('/mahasiswa')
    }
  )
})

// UPDATE - Edit mahasiswa
router.post('/update/:id', (req, res) => {
  const { id } = req.params
  const { nim, nama, kelas } = req.body
  db.query(
    'UPDATE mahasiswa SET nim = ?, nama = ?, kelas = ? WHERE id = ?',
    [nim, nama, kelas, id],
    (err) => {
      if (err) {
        console.error(err)
        return res.send('Error mengupdate data')
      }
      res.redirect('/mahasiswa')
    }
  )
})

// DELETE - Hapus mahasiswa
router.post('/delete/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err)
      return res.send('Error menghapus data')
    }
    res.redirect('/mahasiswa')
  })
})

module.exports = router
