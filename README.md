# Arrow Gen - Youth Church Community Portal & Dashboard

Arrow Gen adalah web application modern untuk komunitas pemuda gereja (Youth Church). Dibangun dengan **Nuxt 3**, **Vue 3**, **Tailwind CSS v4**, **Neon PostgreSQL Serverless**, dan **Better Auth**.

---

## 🚀 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (SSR & Server Engine Nitro)
- **UI & Styling**: [Vue 3](https://vuejs.org/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Neon PostgreSQL Serverless](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Autentikasi & RBAC**: [Better Auth](https://better-auth.com/)
- **Deployment Target**: [Vercel](https://vercel.com/)

---

## 📋 Prasyarat Sistem

Sebelum memulai, pastikan sistem Anda telah terpasang:
- **Node.js**: Versi `18.20.0` atau yang lebih baru (rekomendasi `v20.x` LTS).
- **npm** (atau package manager pilihan Anda: pnpm / yarn / bun).
- Akun dan Database di **[Neon PostgreSQL](https://neon.tech/)**.

---

## 🛠️ Panduan Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan Arrow Gen di komputer lokal Anda:

### 1. Clone Repository & Install Dependensi
```bash
git clone <url-repository-anda>
cd "Arrow Gen"
npm install
```

### 2. Konfigurasi Environment Variables
Salin template konfigurasi `.env.example` menjadi `.env`:
```bash
# Di Windows PowerShell:
Copy-Item .env.example .env

# Di Linux / macOS / Bash:
cp .env.example .env
```
Buka file `.env` yang baru dibuat dan isi variabel sesuai kredensial Anda.

### 3. Inisialisasi Akun Super Admin (Seeding)
Jalankan skrip seed untuk membuat akun administrator pertama:
```bash
npm run seed
```
> **Catatan**: Kredensial akun admin akan dibuat sesuai dengan `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, dan `SEED_ADMIN_PASSWORD` yang Anda tentukan di `.env`.

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser dan akses:
- **Portal Publik**: `http://localhost:3000`
- **Halaman Login Admin**: `http://localhost:3000/login`

---

## 🔑 Variabel Environment yang Dibutuhkan

Berikut daftar environment variable yang harus dikonfigurasi:

| Nama Variabel | Wajib? | Keterangan & Contoh |
|---|---|---|
| `DATABASE_URL` | **Ya** | Connection string Neon PostgreSQL (wajib menyertakan `?sslmode=require`). Contoh: `postgresql://user:pass@ep-xyz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `BETTER_AUTH_SECRET` | **Ya** | Kunci acak minimal 32 karakter untuk hashing session & cookies. Dapat dibuat via `openssl rand -base64 32`. |
| `BETTER_AUTH_URL` | **Ya** | Base URL aplikasi. Lokal: `http://localhost:3000`. Produksi Vercel: `https://domain-anda.vercel.app`. |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | Opsional | Nomor WhatsApp resmi pastoral untuk CTA publik (Format: `6281234567890`). |
| `SEED_ADMIN_NAME` | Lokal | Nama lengkap untuk seeding akun Super Admin. |
| `SEED_ADMIN_EMAIL` | Lokal | Alamat email untuk login Super Admin pertama kali. |
| `SEED_ADMIN_PASSWORD` | Lokal | Password untuk Super Admin (minimal 8 karakter). |

---

## ☁️ Panduan Deployment ke Vercel

Aplikasi ini sudah dioptimasi dan siap di-deploy langsung ke platform **Vercel**:

### Langkah 1: Import Project ke Vercel
1. Masuk ke dashboard [Vercel](https://vercel.com).
2. Klik **Add New** > **Project** lalu pilih repositori Git Arrow Gen.
3. Vercel akan otomatis mendeteksi framework sebagai **Nuxt.js**.
4. Biarkan Build Command (`npm run build`) dan Output Directory bawaan.

### Langkah 2: Atur Environment Variables di Vercel
Pada bagian **Settings -> Environment Variables**, tambahkan variabel berikut untuk Production & Preview:
- `DATABASE_URL` : URL koneksi Neon PostgreSQL Anda (pastikan akhiran `?sslmode=require`).
- `BETTER_AUTH_SECRET` : Secret key produksi yang kuat (minimal 32 karakter acak).
- `BETTER_AUTH_URL` : URL domain Vercel Anda (misal `https://arrow-gen.vercel.app`).
- `NUXT_PUBLIC_WHATSAPP_NUMBER` : Nomor WhatsApp narahubung publik.

### Langkah 3: Deploy
Klik **Deploy**. Nuxt Nitro akan membangun aplikasi dengan preset Vercel Serverless secara otomatis.

> 💡 **Penting**: Skrip `npm run seed` sengaja diproteksi agar tidak bisa dieksekusi di lingkungan produksi demi keamanan. Lakukan seeding akun admin di lingkungan lokal terlebih dahulu menggunakan koneksi database Neon Anda sebelum mengakses halaman admin di Vercel.

---

## 📜 Perintah yang Tersedia

```bash
# Menjalankan development server dengan HMR
npm run dev

# Membangun aplikasi untuk produksi
npm run build

# Menjalankan preview lokal dari build produksi
npm run preview

# Menjalankan database seed untuk membuat admin
npm run seed

# Menyiapkan types Nuxt
npm run postinstall
```
