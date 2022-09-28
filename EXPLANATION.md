# Explanation

Project ini dibuat dengan metode Single Page Application (SPA) karena memudahkan user untuk menavigasi seluruh fitur yang ada tanpa perlu pindah ke halaman lain. Tampilan SPA juga lebih mudah untuk diadaptasi ke dalam bentuk mobile dan menyerupai tampilan aplikasi mobile agar mudah digunakan dengan berbagai device.

Tampilan list dibuat berbeda pada desktop dan mobile. Pada tampilan desktop, kolom data dan button untuk melakukan aksi edit dan delete diletakkan menyamping di tiap baris pada table. Sedangkan pada tampilan mobile, table dibuat collapsible dan hanya memperlihatkan 2 kolom data, yang dapat diklik untuk melihat sisa data yang ada serta button untuk edit dan delete. Hal ini dilakukan untuk menyesuaikan dengan device dan meningkatkan estetika UI pada mobile.

Untuk melakukan penambahan dan pengeditan data, menggunakan tampilan Modal yang berisikan form sehingga tidak ada navigasi ke page lain. Jika user tidak jadi melakukan penambahan/pengeditan maka cukup menutup Modal tersebut dan tidak perlu navigasi lain. Modal dengan form yang identikal juga mempermudah user untuk mengisi/mengedit banyak data karena letak kolom input yang konsisten.

Untuk menghapus data, sebelum data langsung terhapus, ditampilkan Modal terlebih dahulu untuk mengkonfirmasi apakah user yakin untuk menghapus data agar meminimalisir kesalahan interaksi dari pihak user. Button untuk mengkonfirmasi penghapusan juga diletakkan dengan urutan "Confirm" di kiri dan "Cancel" di kanan untuk mendukung user membaca instruksi secara seksama dahulu sebelum melakukan aksi penghapusan. Hal ini dikarenakan kebiasaan para user untuk segera mengkonfirmasi sesuatu dengan button yang terletak di kanan, sehingga ketika urutannya dibalik menjadi salah satu lapisan keamanan.

Kolom untuk melakukan sorting dan filtering (searching) data diletakkan diatas table dan pada satu baris yang sama untuk menegaskan kegunaannya yaitu memanipulasi data yang ada di bawahnya. Barisan ini menyesuaikan dengan besar layar pada device, sehingga ketika digunakan di layar kecil (mobile) maka input untuk sorting dan filtering tersusun ke bawah.

Pada form untuk pengisian data, menggunakan input yang sesuai dengan tipe datanya, yaitu string, date, number, dan dropdown. Dropdown digunakan untuk memilih kota, untuk meminimalisir error jika user mengisi kota yang salah. Pemilihan provinsi sudah diotomasi seiring dengan pemilihan kota sehingga user tidak perlu mengisinya lagi.
