# Iotix — IOTA Validators Globe

Interaktywna aplikacja webowa z globusem 3D prezentującym walidatorów sieci IOTA w czasie rzeczywistym.

Inspirowana: [gmonads.com](https://www.gmonads.com/)

## Demo
- Frontend: *(link po deployu)*
- API: *(link po deployu)*

## Funkcje
- 🌍 Interaktywny globus 3D z zaznaczonymi lokalizacjami walidatorów
- 📡 Dane pobierane na żywo z sieci IOTA (odświeżane co 30s)
- 🔒 RPC zabezpieczone przez backend — adres nigdy nie trafia do przeglądarki
- 📱 Responsywny design, działa na mobile

## Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS, Globe.gl
- **Backend:** Node.js, Express

## Uruchomienie lokalne

### 1. Sklonuj repo
```bash
git clone https://github.com/David-Mastalski/iota-validators-globe.git
cd iota-validators-globe
```

### 2. Backend
```bash
cd server
cp .env.example .env
npm install
node server.js
```

### 3. Frontend
```bash
cd ..
cp .env.example .env
npm install
npm run dev
```

Aplikacja dostępna pod: `http://localhost:5173`
