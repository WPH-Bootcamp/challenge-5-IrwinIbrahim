import * as readline from "readline";

// 1. Create a type for book where each book has a title, author, and publication year
type Book = {
  title: string;
  author: string;
  year: number;
};

// 2. Create books array to store books
let books: Book[] = [];

// 3. Implement a function named addBook to add new books to the collection
function addBook(title: string, author: string, year: number): void {
  const newBook: Book = { title, author, year };
  books.push(newBook);
  console.log(`\nBuku "${title}" berhasil ditambahkan!\n`);
}

// 4. Implement a function named listBooks to display all stored books
function listBooks(): void {
  console.log("\n--- DAFTAR BUKU ---");

  if (books.length === 0) {
    console.log("Belum ada buku yang tersimpan.\n");
    return;
  }

  books.forEach((book, idx) => {
    console.log(`${idx + 1}. ${book.title} - ${book.author} (${book.year})`);
  });

  console.log();
}

// 5. Implement a function named searchBook to find books by title (should be an optional parameter)
function searchBook(title?: string): void {
  if (!title) {
    console.log("\nMasukkan judul untuk mencari buku!\n");
    return;
  }

  const result = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  if (result.length === 0) {
    console.log(`\nBuku dengan judul "${title}" tidak ditemukan.\n`);
  } else {
    console.log(`\nHasil pencarian untuk "${title}":`);
    result.forEach((book) => {
      console.log(`${book.title} - ${book.author} (${book.year})`);
    });
    console.log();
  }
}

// CLI INTERFACE

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Tambahkan buku default
addBook("Ayat-Ayat Cinta", "Habiburrahman El Shirazy", 2004);

// Menu CLI
function showMenu() {
  console.log(`
=== APLIKASI MANAJEMEN BUKU ===
1. Tambah Buku
2. Lihat Semua Buku
3. Cari Buku
4. Keluar
`);
  rl.question("Pilih menu (1-4): ", handleMenu);
}

// Handler menu
function handleMenu(choice: string) {
  switch (choice) {
    case "1":
      rl.question("Judul: ", (title: string) => {
        rl.question("Penulis: ", (author: string) => {
          rl.question("Tahun terbit: ", (year: string) => {
            addBook(title, author, Number(year));
            showMenu();
          });
        });
      });
      break;

    case "2":
      listBooks();
      showMenu();
      break;

    case "3":
      rl.question("Masukkan judul yang dicari: ", (title) => {
        searchBook(title);
        showMenu();
      });
      break;

    case "4":
      console.log("\nTerima kasih sudah menggunakan aplikasi ini!");
      rl.close();
      break;

    default:
      console.log("\nPilihan tidak valid!\n");
      showMenu();
  }
}

// Jalankan menu
showMenu();

// Run di terminal : npx ts-node src/challenge1.ts

// Don't delete code bellow and this code must be at the bottom of the file
export { addBook, listBooks, searchBook };
