// Tunggu sampai halaman siap
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('laporanForm');

  // Saat tombol submit ditekan
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Hentikan reload halaman

    // Ambil semua input
    const nama = document.getElementById('inputName').value.trim();
    const nim = document.getElementById('inputNIM').value.trim();
    const asal = document.getElementById('inputAsal').value.trim();
    const dosen = document.getElementById('selectDosen').value;
    const tanggal = document.getElementById('inputTanggalLahir').value;
    const teman = document.getElementById('inputTemanFavorit').value.trim();
    const ai = document.getElementById('inputAiFavorit').value.trim();

    // Validasi wajib isi NIM
    if (!nim) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'NIM belum diisi.',
      });
    }

    // Fungsi untuk popup konfirmasi
    const konfirmasi = async (label, value) => {
      const { isConfirmed } = await Swal.fire({
        title: `Konfirmasi`,
        html: `${label}: <strong>${value || "(kosong)"}</strong><br>Apakah sudah benar?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, benar',
        cancelButtonText: 'Ubah dulu'
      });
      return isConfirmed;
    };

    // List data untuk dikonfirmasi
    const data = [
      ['Nama', nama],
      ['NIM', nim],
      ['Asal', asal],
      ['Dosen Favorit', dosen],
      ['Tanggal Lahir', tanggal],
      ['Teman Favorit', teman],
      ['AI Favorit', ai]
    ];

    // Konfirmasi satu per satu
    for (const [label, value] of data) {
      const ok = await konfirmasi(label, value);
      if (!ok) return; // Jika tidak dikonfirmasi, hentikan
    }

    // Jika semua dikonfirmasi
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Semua data telah dikonfirmasi dan form berhasil dikirim!',
    });
  });
});
