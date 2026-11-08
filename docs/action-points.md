# Plan Działań – Część I: Fundamenty UI, Taktyczne DDD i Animacje (Etap I)

Dokument zawiera szczegółowy harmonogram prac, wytyczne implementacyjne oraz plan krok po kroku niezbędny do zrealizowania **Części I (Etapu I - 30 pkt)** projektu **Stop Scout Mobile**, zgodnie z wymaganiami z [`project-description.md`](file:///C:/Users/steam/IdeaProjects/programowanie-urzadzen-mobilnych/stop-scout-mobile/docs/project-description.md) oraz regułami architektoniczno-jakościowymi z [`rules.md`](file:///C:/Users/steam/IdeaProjects/programowanie-urzadzen-mobilnych/stop-scout-mobile/docs/rules.md).

---

## 1. Ogólny opis zmian i transformacji aplikacji

### Stan początkowy (przed realizacją Części I):
* Projekt został wygenerowany ze standardowego szablonu Expo Tabs (`app/(tabs)/`).
* Widok `app/(tabs)/index.tsx` zawiera domyślny komponent z napisem „Tab One” oraz instrukcjami edycji.
* Brak jakiejkolwiek struktury domenowej (`src/`), modeli danych oraz logiki biznesowej.
* Brak skonfigurowanego środowiska testów jednostkowych (brak Jest / test runnera w `package.json`).

### Stan docelowy (po ukończeniu Części I):
1. **Wizualnie i funkcjonalnie dla użytkownika:**
   * Ekran główny staje się dynamiczną tablicą pasażerską („Najbliższe odjazdy”).
   * Użytkownik widzi przejrzystą listę najbliższych kursów tramwajowych i autobusowych renderowaną w wydajnym komponencie `FlatList`.
   * Każdy odjazd prezentowany jest w postaci czytelnej karty (`DepartureCard`): numer linii w kolorowym badge'u, kierunek docelowy, czas planowy oraz wyróżnienie statusu opóźnienia.
   * Duże opóźnienia (od 2 minut w górę) są kategoryzowane jako krytyczne i natychmiast przyciągają wzrok pasażera dzięki płynnej, zapętlonej animacji pulsowania (`DelayHighlight`).
2. **Architektonicznie (pod maską):**
   * Aplikacja zyskuje szkielet **Clean Architecture** i **Taktycznego Domain-Driven Design (DDD)** w katalogu `src/`.
   * Cała logika biznesowa zostaje wyekstrahowana z komponentów React do samowalidujących, niemutowalnych **Obiektów Wartości (Value Objects)**: `RouteNumber` oraz `DepartureDelay`.
   * Komponenty UI stają się „głupie” (prezentacyjne), odpowiedzialne wyłącznie za renderowanie przekazanego stanu.
   * Wdrożone zostaje podejście **Test-Driven Development (TDD)** – wszystkie metody domenowe i reguły biznesowe posiadają 100% pokrycia testami jednostkowymi (Jest).

---

## 2. Zestawienie Zasad Jakościowych i Architektonicznych

Podczas realizacji należy bezwzględnie przestrzegać zasad zdefiniowanych w [`docs/rules.md`](file:///C:/Users/steam/IdeaProjects/programowanie-urzadzen-mobilnych/stop-scout-mobile/docs/rules.md) oraz [`AGENTS.md`](file:///C:/Users/steam/IdeaProjects/programowanie-urzadzen-mobilnych/stop-scout-mobile/AGENTS.md):
* **Podejście "Building Blocks" & SOLID:**
  * **S (Single Responsibility):** Każdy Value Object i komponent wykonuje tylko jedno zadanie (np. `DepartureDelay` kategoryzuje i formatuje opóźnienie, `DelayHighlight` wyłącznie je animuje).
  * **O / L / I / D:** Małe, dedykowane interfejsy TypeScript, brak sztywnych powiązań między warstwami.
  * **Ekstrakcja logiki:** Zero wyliczeń opóźnień czy normalizacji numerów wewnątrz plików `.tsx` komponentów.
* **TDD & Test-First:** 
  * Testy jednostkowe tworzone równolegle lub przed implementacją.
  * Pełne pokrycie metod publicznych Value Objectów.
* **Nazewnictwo Self-Explanatory (Zakaz skrótów):**
  * Zmienne i funkcje muszą nosić pełne, opisowe nazwy (np. `departureDelayInSeconds`, `normalizedRouteNumber`, `theoreticalDepartureTime`; zakaz: `dep`, `num`, `idx`, `delSec`).
* **Weryfikacja ciągła:**
  * Sprawdzanie kompilacji TypeScript (`npx tsc --noEmit`) oraz uruchamianie testów jednostkowych po każdym kroku.

---

## 3. Plan Działań Krok po Kroku (Action Points)

### Krok 0: Przygotowanie środowiska testowego (Fundament TDD) – [x] Zrealizowano
> **Cel:** Umożliwienie realizacji wymogów z `rules.md` (obowiązkowe testy jednostkowe dla każdej nowej metody i serwisu).

1. **Instalacja zależności testowych:** [x]
   * Dodanie bibliotek `jest`, `jest-expo`, `@types/jest` oraz niezbędnych presetów dla TypeScript / React Native.
2. **Konfiguracja środowiska Jest:** [x]
   * Utworzenie/aktualizacja konfiguracji testowej w `package.json` lub pliku `jest.config.js` (wykorzystując preset `jest-expo` lub skonfigurowany pod TypeScript).
   * Dodanie skryptu w `package.json`: `"test": "jest"`.
3. **Smoke Test:** [x]
   * Utworzenie prostego testu weryfikacyjnego i uruchomienie polecenia `npm test`, aby upewnić się, że środowisko poprawnie wykonuje testy TypeScript.

---

### Krok 1: Przygotowanie struktury katalogów Clean Architecture – [x] Zrealizowano
> **Cel:** Przygotowanie szkieletu pod Taktyczne DDD i przyszłe etapy (Etap II i III).

1. Utworzenie struktury katalogów w `src/`: [x]
   * `src/domain/value-objects/` – Obiekty wartości (immutability, walidacja, równość strukturalna).
   * `src/domain/value-objects/__tests__/` – Dedykowane testy jednostkowe domeny.
   * `src/domain/entities/` – Przyszłe encje (`Departure`, `Stop`, `User`).
   * `src/domain/repositories/` – Interfejsy repozytoriów.
   * `src/use-cases/` – Logika przypadków użycia.
   * `src/di/` – Kontener wstrzykiwania zależności.
   * `src/store/` – Globalny stan aplikacji (Zustand).
   * `src/infrastructure/` – Klienty API, bazy danych, GPS.

---

### Krok 2: TDD & Implementacja Value Objectu `RouteNumber` (Moduł 1) – [x] Zrealizowano
> **Wycena w kryteriach oceny:** część Modułu 1 (15 pkt).  
> **Cel:** Bezpieczna reprezentacja i normalizacja numeru linii transportu publicznego.

1. **Przygotowanie testów jednostkowych (`src/domain/value-objects/__tests__/RouteNumber.test.ts`):** [x]
   * Przypadek: wartość `null`, `undefined` lub pusty ciąg znaków zwraca domyślny znak `'?'`.
   * Przypadek: standardowy numer linii (np. `9`, `'2'`, `'199'`) -> `'9'`, `'2'`, `'199'`.
   * Przypadek: specjalne identyfikatory tras ZTM `>= 10000` (np. `10177` -> `'177'`).
   * Przypadek: linie nocne i tekstowe (np. `'n1'` -> `'N1'`) wraz z weryfikacją metody `isNightLine()`.
   * Przypadek: porównywanie instancji metodą `equals()` oraz reprezentacja tekstowa `toString()`.
2. **Implementacja `RouteNumber.ts` w `src/domain/value-objects/`:** [x]
   * Klasa niemutowalna z polem `public readonly value: string`.
   * Statyczna metoda normalizacyjna `normalize(rawRouteId)`.
   * Metody `isNightLine()`, `equals(other)`, `toString()`.
3. **Weryfikacja:** [x] Uruchomienie `npm test` – testy jednostkowe `RouteNumber` muszą przejść na zielono.

---

### Krok 3: TDD & Implementacja Value Objectu `DepartureDelay` (Moduł 2) – [x] Zrealizowano
> **Wycena w kryteriach oceny:** część Modułu 2 (15 pkt).  
> **Cel:** Niemutowalny obiekt klasyfikujący opóźnienia i przygotowujący dane do prezentacji UI.

1. **Przygotowanie testów jednostkowych (`src/domain/value-objects/__tests__/DepartureDelay.test.ts`):** [x]
   * Przypadek opóźnienia `<= 0` (oraz `null`/`undefined`):
     * Kategoria `severity: 'ON_TIME'`.
     * Tekst `formattedText: 'Na czas'`.
     * Flaga `shouldAnimate: false`.
     * Metoda `isDelayed(): false`.
   * Przypadek opóźnienia małego `0 < seconds < 120`:
     * Kategoria `severity: 'MINOR'`.
     * Tekst `formattedText: '+<seconds>s'` (np. `'+45s'`).
     * Flaga `shouldAnimate: false`.
     * Metoda `isDelayed(): true`.
   * Przypadek opóźnienia dużego `seconds >= 120`:
     * Kategoria `severity: 'MAJOR'`.
     * Tekst `formattedText: '+<minutes> min'` (np. `150s` -> `'+2 min'`).
     * Flaga `shouldAnimate: true`.
     * Metoda `isDelayed(): true`.
   * Przypadek metody porównawczej `equals()`.
2. **Implementacja `DepartureDelay.ts` w `src/domain/value-objects/`:** [x]
   * Definicja typu `DelaySeverity = 'ON_TIME' | 'MINOR' | 'MAJOR'`.
   * Niemutowalne właściwości: `seconds`, `severity`, `formattedText`, `shouldAnimate`.
   * Hermetyzacja logiki kategoryzacji w konstruktorze.
3. **Weryfikacja:** [x] Uruchomienie `npm test` – testy `DepartureDelay` muszą przejść na zielono.

---

### Krok 4: Komponent wyróżniania opóźnień i animacja `DelayHighlight` – [x] Zrealizowano
> **Wycena w kryteriach oceny:** część Modułu 2 (15 pkt).  
> **Cel:** Komponent UI prezentujący stan opóźnienia z płynną animacją pulsowania dla opóźnień krytycznych.

1. **Implementacja komponentu w `components/DelayHighlight.tsx`:** [x]
   * Interfejs `DelayHighlightProps`: `delayInSeconds: number | null | undefined`.
   * Wykorzystanie obiektu wartości `DepartureDelay`.
   * Konfiguracja animacji `Animated.loop` z wykorzystaniem `Animated.sequence`:
     * Przejście opacity z `1.0` do `0.25` (700ms) i z powrotem do `1.0` (700ms).
     * Warunek uruchomienia: tylko gdy `departureDelay.shouldAnimate === true`.
     * Użycie `useNativeDriver: true` dla maksymalnej płynności i odciążenia wątku JS.
     * Zatrzymanie animacji i reset opacity do `1.0` w przypadku odmontowania lub braku potrzeby animacji.
   * Dedykowane style w `StyleSheet`:
     * Odmienne kolory tekstu i tła/badge'a dla każdego stopnia (`ON_TIME` - stonowana zieleń/szary, `MINOR` - bursztyn/pomarańcz, `MAJOR` - wyrazista czerwień).

---

### Krok 5: Reużywalny komponent karty odjazdu `DepartureCard` – [x] Zrealizowano
> **Wycena w kryteriach oceny:** część Modułu 1 (15 pkt).  
> **Cel:** Czysty, deklaratywny komponent reprezentujący pojedynczy odjazd na liście.

1. **Implementacja komponentu w `components/DepartureCard.tsx`:** [x]
   * Interfejs `DepartureCardProps`:
     * `routeId: number | string;`
     * `headsign: string;`
     * `theoreticalTime: string;`
     * `delayInSeconds: number | null | undefined;`
   * Wykorzystanie `RouteNumber` do formatowania i prezentacji numeru linii w dedykowanym badge'u (`routeBadge`).
   * Zintegrowanie komponentu `DelayHighlight` do wyświetlania informacji o czasie i opóźnieniu.
   * Estetyczna warstwa wizualna: biała karta z cieniem (`elevation` na Androidzie, `shadow*` na iOS), zaokrąglonymi rogami, czytelną hierarchią typograficzną.
   * Komponent bezstanowy (Dumb Component) zgodny z regułą Single Responsibility.

---

### Krok 6: Ekran główny i wydajna lista odjazdów (`app/(tabs)/index.tsx`) – [x] Zrealizowano
> **Wycena w kryteriach oceny:** część Modułu 1 (15 pkt).  
> **Cel:** Prezentacja zestawu odjazdów za pomocą zoptymalizowanej listy `FlatList`.

1. **Przygotowanie zestawu danych demonstracyjnych (Mock):** [x]
   * Wykorzystanie zbioru danych testujących wszystkie warianty:
     * Linie zwykłe tramwajowe/autobusowe (np. 9, 2, 6, 8).
     * Linie z identyfikatorem specjalnym ZTM `>= 10000` (np. `10177` -> `177`).
     * Linie o wyższych numerach (np. `199`).
     * Różne stany punktualności: punktualne (0s), lekko spóźnione (12s, 45s, 85s), mocno opóźnione wymagające animacji (130s, 150s, 210s), brak danych opóźnienia (`null`).
2. **Implementacja widoku w `app/(tabs)/index.tsx`:** [x]
   * Zastąpienie szablonu początkowego Expo pełnym widokiem listy odjazdów.
   * Zastosowanie `FlatList`:
     * `data={departures}`
     * `keyExtractor={(item) => item.id}`
     * `renderItem` zwracający `DepartureCard`.
     * `contentContainerStyle` z odpowiednim paddingiem na dole ekranu.
   * Zabezpieczenie przed pułapkami pustych stringów w renderowaniu warunkowym (`Boolean(...)`).
   * Nagłówek ekranu z estetycznym tytułem („Tablica odjazdów ZTM / Mock”).

---

### Krok 7: Dopracowanie nawigacji i zakładek (`app/(tabs)/_layout.tsx`) – [x] Zrealizowano
> **Cel:** Spójność wizualna i ergonomia interfejsu użytkownika.

1. **Dostosowanie konfiguracji zakładek:** [x]
   * Zmiana etykiety pierwszej zakładki z „Tab One” na „Odjazdy”.
   * Dobór odpowiedniej ikony transportu publicznego (SF Symbol / Material Icon / SymbolView dla iOS i Androida).
   * Sprawdzenie kompatybilności z motywem jasnym/ciemnym.

---

### Krok 8: Weryfikacja końcowa, audyt jakościowy i podsumowanie – [x] Zrealizowano
> **Cel:** Upewnienie się, że projekt spełnia 100% wymagań Etapu I (30/30 pkt) oraz zasad z `rules.md`.

1. **Weryfikacja testów jednostkowych:** [x]
   * Uruchomienie `npm test` – wszystkie testy jednostkowe muszą przejść w 100% na zielono (27/27 testów zdanych).
2. **Weryfikacja statyczna typów:** [x]
   * Uruchomienie `npx tsc --noEmit` – brak jakichkolwiek błędów kompilacji TypeScript.
3. **Audyt kodu pod kątem `rules.md`:** [x]
   * Czy nazwy są pełne i opisowe (brak skrótów typu `dep`, `calc`, `del`)?
   * Czy logika biznesowa jest w 100% w `src/domain/`?
   * Czy komponenty UI są czyste i deklaratywne?
4. **Weryfikacja działania w Expo:** [x]
   * `npx expo-doctor` – 21/21 testów spójności środowiska zdanych.
