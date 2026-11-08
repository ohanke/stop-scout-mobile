# Zaawansowane projektowanie aplikacji mobilnych
**Rok akademicki:** 2026/27

**Projekt semestralny:** Framework React Native, ekosystem Expo i projekt "Stop Scout"  
**Prowadzący:** Tomasz Goluch  
**Wersja:** 1.4

---

## Wprowadzenie
**Cel:** Przekazanie podstawowych informacji o zasobach laboratorium oraz specyfice środowiska wieloplatformowego.

Laboratorium odbywa się w trybie stacjonarnym lub zdalnym na maszynach fizycznych (komputery laboratoryjne lub własne laptopy) oraz własnych smartfonach (fizyczny telefon z systemem Android lub iOS). Kod tworzymy z wykorzystaniem preferowanego edytora lokalnego (np. Visual Studio Code, WebStorm). W przeciwieństwie do klasycznego programowania natywnego, wykorzystamy ekosystem Expo, który pozwala na natychmiastowe uruchamianie i testowanie kodu bezpośrednio na Twoim telefonie (tzw. mechanizm Over-The-Air).

> 💻 **Wskazówka dla zajęć zdalnych (Prezentacja ekranu telefonu):**
> Podczas zajęć zdalnych i odbiorów projektów wymagane jest udostępnianie całego ekranu komputera. Aby wygodnie prezentować aplikację działającą na fizycznym telefonie bez konieczności trzymania go przed kamerą internetową, zaleca się skorzystanie z narzędzia `scrcpy` (klonowanie ekranu Androida przez kabel USB z zerowym opóźnieniem) lub emulatora Android Studio / symulatora iOS.

<details>
<summary>📱 Instrukcja krok po kroku: Instalacja i uruchomienie scrcpy (Kliknij, aby rozwinąć/zwinąć)</summary>
*(Miejsce na instrukcję scrcpy)*
</details>

---

## Instalacja środowiska i uruchomienie projektu
**Cel:** Zapoznanie z procesem generowania i uruchamiania projektu React Native przy użyciu Expo CLI.

> ⚠️ **WAŻNE WYMAGANIE TECHNICZNE:** Do standardowego wykonania tej instrukcji i testowania aplikacji bezprzewodowo, Twój komputer oraz fizyczny telefon (smartfon) muszą znajdować się w tej samej lokalnej sieci Wi-Fi. Jeżeli korzystasz z sieci uczelnianej, publicznej lub routera z włączoną separacją klientów (AP Isolation), połączenie po Wi-Fi może być blokowane – w takiej sytuacji uruchomisz projekt niezawodnie po kablu USB za pomocą tunelowania portów ADB (`adb reverse tcp:8081 tcp:8081` oraz `npx expo start --localhost`), co zostało szczegółowo opisane poniżej.

Aby rozpocząć pracę z frameworkiem, wymagane jest środowisko wykonawcze Node.js. Zgodnie z dobrymi praktykami, do jego instalacji zaleca się wykorzystanie menedżera NVM (Node Version Manager).

Dla systemu Windows instalator (plik `nvm-setup.exe`) można pobrać z: nvm-windows releases.

Po instalacji NVM, otwórz terminal (np. PowerShell lub terminal w VS Code) i wykonaj poniższe komendy (uruchom terminal jako administrator), aby zainstalować i aktywować najnowszą stabilną wersję Node.js (LTS):

```bash
nvm install lts
nvm use lts
```

**Weryfikacja instalacji:** Aby sprawdzić, czy środowisko zostało zainstalowane poprawnie, wpisz w terminalu:

```bash
node -v
npm -v
```

Jeśli instalacja przebiegła pomyślnie, w konsoli powinny wyświetlić się numery zainstalowanych wersji (np. `v20.x.x`).

Mając gotowe środowisko, wygenerujemy strukturę projektu korzystając z oficjalnego narzędzia Expo. Tworzymy aplikację z obsługą języka TypeScript oraz nowoczesnym routingiem opartym na plikach (Expo Router). W konsoli wykonujemy polecenie:

```bash
npx create-expo-app@latest stop-scout-mobile --template tabs
```

Po pomyślnym wygenerowaniu projektu przechodzimy do nowo utworzonego katalogu:

```bash
cd stop-scout-mobile
```

### 📦 Kompleksowa instalacja pakietów dla wszystkich etapów projektu:
Aby uniknąć błędów brakujących zależności i konfliktów wersji między bibliotekami natywnych a wersją Reacta (np. React 19 w najnowszych szablonach Expo), zawsze używaj polecenia `npx expo install` dla modułów natywnych. Możesz zainstalować wszystkie pakiety wymagane w projekcie od razu:

```bash
# 1. Pakiety natywne zarządzane przez Expo SDK
npx expo install expo-sqlite expo-crypto expo-location react-native-webview react-native-screens react-native-safe-area-context

# 2. Biblioteki czysto JS/TS oraz definicje typów
npm install zustand bcryptjs
npm install --save-dev @types/bcryptjs jest jest-expo @types/jest
```

<details>
<summary>💡 Rozwiązywanie problemów: Błędy Unable to resolve "..." oraz konflikty ERESOLVE</summary>
*(Szczegóły rozwiązywania problemów)*
</details>
<details>
<summary>💡 Rozwiązywanie problemów: Zawieszenie Bundlera lub zjawisko "Aplikacji-Zombie"</summary>
*(Szczegóły rozwiązywania problemów)*
</details>
<details>
<summary>⚠️ Kontrola wersji (Git) i higiena repozytorium: Weryfikacja pliku .gitignore</summary>
*(Szczegóły higieny repozytorium)*
</details>

---

## Uruchomienie serwera deweloperskiego (Metro Bundler)
Będąc w katalogu projektu, uruchamiamy serwer deweloperski:

```bash
npm run start
```

Po uruchomieniu w terminalu wyświetli się kod QR. Aby podejrzeć aplikację:
1. Pobierz aplikację **Expo Go** ze sklepu Google Play (Android) lub App Store (iOS).
2. Zeskanuj kod QR (na iOS użyj systemowej aplikacji Aparat, na Androidzie użyj skanera wbudowanego w aplikację Expo Go).

### 🔌 Uruchamianie Expo po kablu USB (Rozwiązanie na problemy z Wi-Fi)
Często w sieciach uczelnianych (np. eduroam), akademikowych, firmowych lub podczas korzystania z mobilnego hotspota występuje tzw. separacja klientów (AP Isolation) lub blokada portów przez zaporę sieciową. Wówczas telefon nie może połączyć się z komputerem po Wi-Fi. W takiej sytuacji z pomocą przychodzi połączenie po kablu USB (telefon z systemem Android i włączonym Debugowaniem USB):

1. Podłącz smartfon kablem USB do komputera i w terminalu zestaw tunelowanie portu 8081 za pomocą narzędzia ADB:
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```
2. Następnie uruchom serwer Expo w trybie lokalnym:
   ```bash
   npx expo start --localhost
   ```
3. Gdy serwer wystartuje, naciśnij w terminalu klawisz `a` (open Android), a aplikacja automatycznie otworzy się w Expo Go na Twoim telefonie przez kabel USB.

> 🧠 **Co dzieje się pod maską po zeskanowaniu kodu?** 
> 1. Metro Bundler analizuje Twój kod oraz pliki bibliotek (`node_modules`).
> 2. Następnie transpiluje go i pakuje w jedną paczkę (bundle).
> 3. Paczka jest przesyłana do aplikacji Expo Go, która wywołuje natywne komponenty systemu Android/iOS.
> 
> *Czas budowania (np. 7163ms): Pierwsze przetwarzanie trwa zazwyczaj dłużej. Każda kolejna zmiana zapisana w kodzie pojawi się na ekranie ułamku sekundy dzięki mechanizmowi Fast Refresh (HMR).*

---

## Rekomendowane rozszerzenia IDE
Dla Visual Studio Code zaleca się instalację:
*   **Expo Tools** (`expo.vscode-expo-tools`)
*   **React Native Tools** (`msjsdiag.vscode-react-native`)
*   **ESLint oraz Prettier - Code formatter**
*   **Auto Rename Tag**

Dla użytkowników JetBrains WebStorm wystarczy upewnić się, że włączona jest wtyczka **React Native Console**.

---

## Przygotowanie projektu do wysyłki na Moodle: Procedura "Clean"
Na platformę Moodle przesyłane jest wyłącznie archiwum ZIP z czystym kodem źródłowym oraz zrzutami ekranu. W paczce ZIP pod żadnym pozorem nie może znaleźć się katalog `node_modules/` ani folder pamięci podręcznej `.expo/`.

**1. Czyszczenie projektu przed spakowaniem (CLI)**
Przed spakowaniem projektu zatrzymaj serwer skrótem `Ctrl + C` i wykonaj polecenie:

*PowerShell (Windows / terminal wbudowany w VS Code):*
```powershell
Remove-Item -Recurse -Force node_modules, .expo
```
*Klasyczny Wiersz poleceń CMD (Windows):*
```cmd
rmdir /s /q node_modules
rmdir /s /q .expo
```
*Bash / Zsh (macOS / Linux):*
```bash
rm -rf node_modules .expo
```

**2. Zawartość archiwum ZIP**
Do przesyłanej paczki dołącz oczyszczony folder projektu i katalog ze zrzutami ekranu (screenshotami). Archiwum nazwij według wzoru: `Etap1_Imie_Nazwisko_NrIndeksu.zip`.

**3. Jak przywrócić działanie projektu?**
Wpisz w terminalu `npm install`, a menedżer npm odtworzy katalog zależności.

---

# CZĘŚĆ I: Fundamenty UI, Taktyczne DDD i Animacje (Zakres Etapu I)

## 1. Struktura projektu, Clean Architecture oraz taktyczne DDD
**Cel:** Zrozumienie domyślnej struktury plików oraz jej refaktoryzacja pod kątem czystej architektury.

Aby zapewnić pełną niezależność logiki biznesowej od interfejsu użytkownika, utworzymy strukturę folderu `src/`:

```text
src/
├── di/                 # Kontener Wstrzykiwania Zależności (container.ts)
├── domain/
│   ├── entities/       # Bogate Encje domenowe posiadające unikalne ID (User, Stop, Departure)
│   ├── value-objects/  # Niemutowalne Obiekty Wartości (Coordinates, GeoBoundingBox, RouteNumber, DepartureDelay)
│   │   └── __tests__/  # Testy jednostkowe domeny
│   └── repositories/   # Interfejsy repozytoriów (w tym IPasswordHasher)
├── infrastructure/
│   ├── api/            # Klient HTTP (ZtmApiClient), DTO i mapery
│   ├── location/       # Integracja sprzętowego GPS (ExpoLocationService)
│   ├── security/       # Kryptografia (BcryptPasswordHasher)
│   └── storage/        # Baza SQLite (SqliteDatabase)
├── store/              # Globalny magazyn stanu Zustand (Optimistic UI)
└── use-cases/          # Przypadki użycia
```

### 🧠 Taktyczny Domain-Driven Design (DDD)
*   **Obiekty Wartości (Value Objects):** Obiekty pozbawione tożsamości reprezentujące miary lub reguły (równość strukturalna, niemutowalność, samowalidacja).
*   **Encje (Entities):** Obiekty posiadające tożsamość (ID), które agregują Value Objecty.

**Implementacja Value Objectu RouteNumber:**
Utwórz plik `src/domain/value-objects/RouteNumber.ts`:

```typescript
// src/domain/value-objects/RouteNumber.ts
export class RouteNumber {
  public readonly value: string;

  constructor(rawRouteId: number | string | null | undefined) {
    this.value = RouteNumber.normalize(rawRouteId);
  }

  private static normalize(raw: number | string | null | undefined): string {
    if (raw === null || raw === undefined) return '?';
    const trimmed = String(raw).trim();
    if (!trimmed) return '?';

    const numericVal = Number(trimmed);
    if (!Number.isNaN(numericVal) && Number.isInteger(numericVal)) {
      if (numericVal >= 10000) {
        return String(numericVal % 10000);
      }
      return String(numericVal);
    }

    return trimmed.toUpperCase();
  }

  public isNightLine(): boolean {
    return this.value.startsWith('N');
  }

  public equals(other: RouteNumber | null | undefined): boolean {
    if (!other) return false;
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
```

---

## 2. Tworzenie pierwszego komponentu (Deklaratywne UI)
**Cel:** Zapoznanie z różnicami między tagami HTML a natywnymi komponentami React Native.

Tworzymy nowy plik `components/DepartureCard.tsx`:

```tsx
// components/DepartureCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteNumber } from '../src/domain/value-objects/RouteNumber';

export interface DepartureCardProps {
  routeId: number | string;
  headsign: string;
  theoreticalTime: string;
  delayInSeconds: number | null | undefined;
}

export function DepartureCard({
  routeId,
  headsign,
  theoreticalTime,
  delayInSeconds,
}: DepartureCardProps) {
  const routeNumber = new RouteNumber(routeId);
  const isDelayed = delayInSeconds !== null && delayInSeconds !== undefined && delayInSeconds > 0;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.routeBadge}>
        <Text style={styles.routeText}>{routeNumber.value}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.headsign}>{headsign || 'Brak kierunku'}</Text>
        <Text style={styles.timeText}>
          Planowo: {theoreticalTime || '--:--'}{' '}
          {isDelayed ? <Text style={styles.delayText}>(+{delayInSeconds}s)</Text> : null}
        </Text>
      </View>
    </View>
  );
}

export default DepartureCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 12,
  },
  routeBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeText: {
    color: '#1D4ED8', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
  },
  headsign: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  delayText: {
    color: '#DC2626', 
    fontWeight: 'bold',
  },
});
```

---

## 3. Stan Aplikacji i Renderowanie List (FlatList)
W pliku `app/(tabs)/index.tsx` zastępujemy zawartość implementując stan i wykorzystując `FlatList`:

```tsx
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import DepartureCard from '../../components/DepartureCard';

export default function HomeScreen() {
  const [departures] = useState([
    { id: '1', routeId: 9, headsign: 'Strzyża PKM', theoreticalTime: '19:09', delayInSeconds: 12 },
    { id: '2', routeId: 2, headsign: 'Jelitkowo', theoreticalTime: '19:15', delayInSeconds: 0 },
    { id: '3', routeId: 12, headsign: 'Ujeścisko', theoreticalTime: '19:22', delayInSeconds: 150 },
    { id: '4', routeId: 6, headsign: 'Łostowice Świętokrzyska', theoreticalTime: '19:27', delayInSeconds: null },
    { id: '5', routeId: 8, headsign: 'Stogi Plaża', theoreticalTime: '19:31', delayInSeconds: 45 },
    { id: '6', routeId: 10177, headsign: 'Brętowo PKM', theoreticalTime: '19:36', delayInSeconds: 210 },
    { id: '7', routeId: 11, headsign: 'Lawendowe Wzgórze', theoreticalTime: '19:42', delayInSeconds: 0 },
    { id: '8', routeId: 5, headsign: 'Oliwa', theoreticalTime: '19:48', delayInSeconds: 85 },
    { id: '9', routeId: 199, headsign: 'Wały Piastowskie', theoreticalTime: '19:53', delayInSeconds: 130 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Najbliższe odjazdy (Mock)</Text>

      <FlatList
        data={departures}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DepartureCard
            routeId={item.routeId}
            headsign={item.headsign}
            theoreticalTime={item.theoreticalTime}
            delayInSeconds={item.delayInSeconds}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' },
});
```

> ⚠️ **PUŁAPKA RENDEROWANIA WARUNKOWEGO:** W elementach list zawsze stosuj rzutowanie logiczne, aby uniknąć pomyłek pustych stringów: `{Boolean(item.notes) ? <Text>{item.notes}</Text> : null}`.

---

## 4. Komponent wyróżniania opóźnień i animacje
**Krok 1: Warstwa Domeny – Value Object** `src/domain/value-objects/DepartureDelay.ts`

```typescript
// src/domain/value-objects/DepartureDelay.ts
export type DelaySeverity = 'ON_TIME' | 'MINOR' | 'MAJOR';

export class DepartureDelay {
  public readonly seconds: number;
  public readonly severity: DelaySeverity;
  public readonly formattedText: string;
  public readonly shouldAnimate: boolean;

  constructor(delayInSeconds: number | null | undefined) {
    this.seconds = delayInSeconds ?? 0;

    if (this.seconds <= 0) {
      this.severity = 'ON_TIME';
      this.formattedText = 'Na czas';
      this.shouldAnimate = false;
    } else if (this.seconds < 120) {
      this.severity = 'MINOR';
      this.formattedText = `+${this.seconds}s`;
      this.shouldAnimate = false;
    } else {
      const minutes = Math.floor(this.seconds / 60);
      this.severity = 'MAJOR';
      this.formattedText = `+${minutes} min`;
      this.shouldAnimate = true;
    }
  }

  public isDelayed(): boolean { return this.seconds > 0; }
  public equals(other: DepartureDelay | null | undefined): boolean {
    if (!other) return false;
    return this.seconds === other.seconds;
  }
}
```

**Krok 2: Animacja UI** `components/DelayHighlight.tsx`

```tsx
// components/DelayHighlight.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { DepartureDelay } from '../src/domain/value-objects/DepartureDelay';

export interface DelayHighlightProps {
  delayInSeconds: number | null | undefined;
}

export function DelayHighlight({ delayInSeconds }: DelayHighlightProps) {
  const delay = new DepartureDelay(delayInSeconds);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (delay.shouldAnimate) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, { toValue: 0.25, duration: 700, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 1.0, duration: 700, useNativeDriver: true }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    } else {
      opacityAnim.setValue(1.0);
    }
  }, [delay.shouldAnimate, opacityAnim]);

  const styleBySeverity = delay.severity === 'ON_TIME' ? styles.onTime : delay.severity === 'MINOR' ? styles.minor : styles.major;

  return (
    <Animated.Text style={[styles.baseText, styleBySeverity, { opacity: opacityAnim }]}>
      {delay.formattedText}
    </Animated.Text>
  );
}

// ... eksporty i style
```

---

# CZĘŚĆ II: Stan Globalny, SQLite, Warstwa DTO/Maperów oraz API (Zakres Etapu II)

*(Ze względu na obszerność tej sekcji i podobieństwo kodu z części pierwszej – pliki w warstwie Domain, Infrastructure i Use Cases tworzymy analogicznie według zasad przedstawionych na początku dokumentu).*

---

# CZĘŚĆ III: Mapa, GPS, Testy Jednostkowe i Wdrożenie (Zakres Etapu III)

## 9. Integracja Map (react-native-webview)
Otwórz `app/(tabs)/two.tsx` i zastąp zawartość:

```tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapTabScreen() {
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([54.352, 18.646], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
          var marker = L.marker([54.352, 18.646]).addTo(map);
          marker.bindPopup("<b>Dworzec Główny</b>").openPopup();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{ html: mapHtml }} style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, map: { width: '100%', height: '100%' }});
```

---

## 12. Kompilacja i wdrożenie aplikacji: EAS Build
Zainstaluj narzędzia:
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

---

## Harmonogram odbiorów i punkty kontrolne (Milestones)

| Etap | Termin rozliczenia (Moodle) | Weryfikowany zakres prac | Punkty |
| :--- | :--- | :--- | :--- |
| **Etap I**<br>(Milestone 1) | Przed zajęciami Lab 2<br>*(do 5. godziny lekcyjnej)* | **Fundamenty UI, Taktyczne DDD & Animacje:**<br>• Moduł 1: Szkielet Clean Architecture, DepartureCard, RouteNumber. (15 pkt)<br>• Moduł 2: DepartureDelay i animacja. (15 pkt) | 30 pkt |
| **Etap II**<br>(Milestone 2) | Przed zajęciami Lab 3<br>*(do 9. godziny lekcyjnej)* | **API ZTM, DTO, Stan Globalny, SQLite & DI:**<br>• Moduł 3: API ZTM, Zustand z Optimistic UI. (20 pkt)<br>• Moduł 4: Uwierzytelnianie, SQLite, kontener DI. (15 pkt) | 35 pkt |
| **Etap III**<br>(Milestone 3) | Przed zajęciami Lab 4<br>*(do 13. godziny lekcyjnej)* | **Funkcje natywne, Jakość & Wdrożenie:**<br>• Moduł 5: Mapa Leaflet, GPS. (15 pkt)<br>• Moduł 6: Testy Jednostkowe. (10 pkt)<br>• Moduł 7: Budowa instalatora .apk. (10 pkt) | 35 pkt |
| | | **SUMA** | **100 pkt** |

---

## Kryteria oceny projektu (100 pkt)

| Moduł | Etap | Wymagania techniczne | Punkty |
| :--- | :--- | :--- | :--- |
| **1. UI, Lista & RouteNumber** | Etap I | Reużywalny komponent karty, wydajne renderowanie FlatList, Value Object RouteNumber. | 15 pkt |
| **2. DelayHighlight & DepartureDelay** | Etap I | Niemutowalny Value Object DepartureDelay kategoryzujący opóźnienia, cykliczna animacja. | 15 pkt |
| **3. API ZTM, DTO & Zustand** | Etap II | Bogate encje (Stop, Departure), mapery DTO, reguła 2 minut, Zustand z Optimistic UI. | 20 pkt |
| **4. Autoryzacja, SQLite & DI** | Etap II | Port IPasswordHasher, logowanie w bazie expo-sqlite oraz wstrzykiwanie zależności. | 15 pkt |
| **5. Mapa, GPS & GeoBoundingBox** | Etap III | Mapa Leaflet w WebView, kwerenda Bounding Box w SQLite oraz integracja GPS. | 15 pkt |
| **6. Testy Jednostkowe (Jest)** | Etap III | Pokrycie testami wszystkich Value Objectów oraz use-case'a z zamrożonym zegarem. | 10 pkt |
| **7. Wdrożenie APK & Clean Architecture**| Etap III| Konfiguracja eas.json, samodzielny plik .apk, pełna separacja warstw w TypeScript. | 10 pkt |