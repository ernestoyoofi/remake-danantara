# Danantara Remake Design

Hanya remake design dari [www.danantaraindonesia.com](https://danantara.vercel.app), bukan membuat seutuhnya untuk Danantara.

> [!WARNING]
> Project ini merupakan versi redesign/remake dari [www.danantaraindonesia.com](https://danantara.vercel.app/). semua keseluruhan asset seperti gambar milik dari Danantara bukan dari saya. project ini tidak berafiliasi dengan atau menggantikan situs resmi. semua hak atas konten dan merek dagang tetap menjadi milik pemilik aslinya.

## 📚 Library/Tech

List perpustaka atau teknologi (framework/library) yang dipakai diproject ini :

- [Next.js](https://nextjs.org/) (Framework) : Fundamental Project
- [@nivo/line](https://nivo.rocks/line/) : Chart Data
- [@radix-ui](https://www.radix-ui.com/) + [shacdn](https://ui.shadcn.com/) : UI/UX Element
- [axios](https://axios-http.com/docs/intro) + [cheerio](https://cheerio.js.org/) : Request HTTP For Fetching & Create API By Scraping Data
- [framer-motion / motion](https://motion.dev/) : Animate React To Make More Beautiful
- [lenis/react](https://lenis.darkroom.engineering/) : Create Scroll More Smoothly
- [lucide-react](https://lucide.dev/guide/packages/lucide-react) : Icon React.js
- [next-view-transitions](https://next-view-transitions.vercel.app/) : Create Transision Page To Page
- [sonner](https://sonner.emilkowal.ski/) : Toast Message React

## 🚀 Deployment

> [!IMPORTANT]
> Jika kamu deploy di Vercel, harap bagian "Install Command" ubah menjadi `yarn --force` agar tidak terjadi masalah `Could not resolve dependency` atau mengubah versi library pada package.json
> 
> Selain itu jika kamu deploy di Vercel, disarankan bagian "Function Region" ubah ke bagian "Asia Pacific" karena ketika melakukan fetching ke web bi.go.id sering mengalami timeout karena request dari web aslinya lama dan ditambah latensi yang tinggi.

Kloning / Duplikat repository ini kedalam sistem kamu

```bash
git clone https://github.com/ernestoyoofi/remake-danantara.git
cd remake-danantara
```

Lalu build dan jalankan

```bash
yarn --force # Disarankan force karena ada library yang tidak kompatible, kamu juga bisa fixednya
yarn build
yarn start
```

Kamu bisa deploy ini ke [vercel dengan link ini](https://vercel.com/new/clone?utm_source=github&b=main&s=https%3A%2F%2Fgithub.com%2Fernestoyoofi%2Fremake-danantara) untuk dapat mempermudahnya jika tidak memiliki vps/cloud/hosting
