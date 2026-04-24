# Iotix — IOTA Validators Globe

Interaktywna aplikacja webowa z globusem 3D prezentującym walidatorów sieci IOTA w czasie rzeczywistym.

Inspirowana: [gmonads.com](https://www.gmonads.com/)

## Demo
- Frontend: [*Iotix.com*](https://iota-validators-globe.vercel.app/)
- API: *(link po deployu)*

## Funkcje
- 🌍 Interaktywny globus 3D z zaznaczonymi lokalizacjami walidatorów
- 📡 Dane pobierane na żywo z sieci IOTA
- 📱 Responsywny design

## Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS, Globe.gl
- **Backend:** Node.js, Express

## Uruchomienie lokalne

### 1. Sklonuj repo
```bash
git clone https://github.com/David-Mastalski/iota-validators-globe.git
cd iota-validators-globe
```

### 2. Skonfiguruj zmienne środowiskowe
```bash
cp .env.example .env
cp server/.env.example server/.env
```

### 3. Zainstaluj zależności
```bash
npm install
npm --prefix server install
```

### 4. Uruchom aplikację
```bash
npm run dev
```

Aplikacja dostępna pod: `http://localhost:5173`
