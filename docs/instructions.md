# Instrukcja manualnego testowania aplikacji (Część I: Etap I)

Niniejszy dokument opisuje procedurę manualnego przetestowania funkcjonalności zaimplementowanych w ramach Części I projektu **Stop Scout Mobile**.

---

## Krok 1: Uruchomienie serwera deweloperskiego

W głównym katalogu projektu uruchom serwer deweloperski Metro Bundler:

```bash
npm run start
```

Do wyboru masz 3 metody podglądu aplikacji:

### 1. W przeglądarce internetowej (najszybszy podgląd bez telefonu)
1. Po wystartowaniu serwera naciśnij klawisz **`w`** w oknie terminala.
2. Aplikacja otworzy się automatycznie w przeglądarce pod adresem: `http://localhost:8081`.

### 2. Na fizycznym telefonie przez aplikację Expo Go (Android / iOS)
1. Zainstaluj aplikację **Expo Go** ze sklepu Google Play (Android) lub App Store (iOS).
2. Upewnij się, że telefon i komputer są połączone z tą samą siecią Wi-Fi.
3. Zeskanuj kod QR z terminala (na Androidzie przez skaner w aplikacji Expo Go, na iOS przez systemową aplikację Aparat).
4. *Rozwiązanie na problemy z Wi-Fi (np. eduroam, separacja sieci):*
   Podłącz telefon kablem USB z włączonym debugowaniem USB i wykonaj:
   ```bash
   adb reverse tcp:8081 tcp:8081
   npx expo start --localhost
   ```
   Następnie naciśnij klawisz **`a`** w terminalu.

### 3. Na emulatorze Android Studio
1. Uruchom emulator Androida.
2. W oknie terminala serwera Expo naciśnij klawisz **`a`**.

---

## Krok 2: Weryfikacja paska nawigacji (Layout)

Spójrz na dolny pasek nawigacji aplikacji (`app/(tabs)/_layout.tsx`):
* **Tytuł zakładki:** Pierwsza zakładka powinna nosić nazwę **„Odjazdy”** (zamiast domyślnego „Tab One”).
* **Ikona zakładki:** Powinna wyświetlać się ikona powiązana z transportem publicznym (autobus / tramwaj).

---

## Krok 3: Weryfikacja logiki domenowej i kart odjazdów

Na ekranie głównym wyświetla się nagłówek **„Najbliższe odjazdy (Mock)”** oraz lista kart odjazdów (`components/DepartureCard.tsx`).

Przewiń listę i zweryfikuj poprawność poszczególnych reguł biznesowych:

| Co weryfikujemy? | Pozycja w danych testowych | Oczekiwany rezultat na ekranie |
| :--- | :--- | :--- |
| **Normalizacja ID tras $\ge 10000$** | Pozycja z `routeId: 10177` (kierunek: *Brętowo PKM*) | W niebieskim kółku wyświetla się **`177`** (obcięty prefiks 10k), a nie `10177`. |
| **Linia nocna** | Pozycja z `routeId: 'N1'` (kierunek: *Jaworzniaków*) | W kółku widnieje **`N1`** z wielką literą. |
| **Brak danych o opóźnieniu (`null`)** | Pozycja z `routeId: 6` (kierunek: *Łostowice Świętokrzyska*) | Zamiast błędu wyświetla się zielony, statyczny napis **`Na czas`**. |
| **Kursy punktualne (`0s`)** | Pozycje `routeId: 2` (*Jelitkowo*) oraz `routeId: 11` (*Lawendowe Wzgórze*) | Zielony, statyczny napis **`Na czas`**. |
| **Drobne opóźnienia ($< 120$ s)** | Pozycje `routeId: 9` (+12s), `routeId: 8` (+45s), `routeId: 5` (+85s) | Bursztynowy/pomarańczowy, statyczny napis z liczbą sekund (np. **`+45s`**, **`+85s`**). |

---

## Krok 4: Weryfikacja animacji pulsowania (`components/DelayHighlight.tsx`)

Zwróć uwagę na kursy z dużym opóźnieniem (**od 2 minut / 120 sekund w górę**):

1. **Linia 12 (*Ujeścisko* – opóźnienie 150 s):**
   * Prezentowany tekst: **`+2 min`** (minuty zaokrąglone w dół: $\lfloor 150 / 60 \rfloor = 2$).
   * Kolor: **czerwony**.
   * **Animacja:** Tekst płynnie, cyklicznie pulsuje (przechodzi między przezroczystością $25\%$ a $100\%$ w pętli 700 ms).
2. **Linia 177 (*Brętowo PKM* – opóźnienie 210 s):**
   * Wyświetla się pulsujący czerwony tekst: **`+3 min`**.
3. **Linia 199 (*Wały Piastowskie* – opóźnienie 130 s):**
   * Wyświetla się pulsujący czerwony tekst: **`+2 min`**.

---

## Krok 5: Eksperyment z mechanizmem Fast Refresh (na żywo)

Aby sprawdzić działanie mechanizmu Fast Refresh:
1. Nie zamykając działającej aplikacji, otwórz plik `app/(tabs)/index.tsx`.
2. W tablicy stanów zmień opóźnienie wybranej linii, np. linii 2 z `0` na `300`:
   ```typescript
   { id: '2', routeId: 2, headsign: 'Jelitkowo', theoreticalTime: '19:15', delayInSeconds: 300 },
   ```
3. Zapisz plik (`Ctrl + S`).
4. Spójrz na ekran – karta linii 2 powinna natychmiast zmienić status z zielonego `Na czas` na czerwony, pulsujący napis `+5 min` bez konieczności restartowania aplikacji.

---

## Krok 6: Weryfikacja testów automatycznych

W dowolnym momencie możesz uruchomić z poziomu terminala pełną automatyczną weryfikację projektu:

* **Testy jednostkowe:**
  ```bash
  npm test
  ```
  *(Oczekiwany rezultat: 27/27 testów zdanych na zielono)*

* **Weryfikacja statyczna typów TypeScript:**
  ```bash
  npx tsc --noEmit
  ```
  *(Oczekiwany rezultat: brak błędów, exit code 0)*
