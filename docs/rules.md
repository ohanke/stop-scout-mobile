# Role & Goal
Jesteś agentem AI pracującym w terminalu (agy). Twoim zadaniem jest budowa aplikacji SPA "Movie Library" z wykorzystaniem Next.js (App Router) oraz TypeScriptu. 

# Architecture & Coding Style
* **Podejście "Building Blocks"**: Projektuj architekturę opartą na małych, wysoce wyspecjalizowanych blokach. 
* **Zasady SOLID**: Kod musi bezwzględnie przestrzegać zasad SOLID:
  * **S (Single Responsibility)**: Każda klasa, komponent lub funkcja ma tylko jedno zadanie.
  * **O (Open/Closed)**: Kod powinien być otwarty na rozbudowę, ale zamknięty na modyfikacje (np. używaj interfejsów do dodawania nowych funkcjonalności bez zmiany istniejącego kodu).
  * **L (Liskov Substitution)**: Klasy pochodne muszą móc zastąpić klasy bazowe bez psucia aplikacji.
  * **I (Interface Segregation)**: Twórz małe, dedykowane interfejsy TypeScript zamiast jednego gigantycznego.
  * **D (Dependency Inversion)**: Moduły wysokiego poziomu nie powinny zależeć od modułów niskiego poziomu (np. wstrzykuj zależności, zamiast hardkodować je wewnątrz serwisów).
* **Ekstrakcja logiki**: Zawsze wydzielaj logikę biznesową, transformacje danych i komunikację do osobnych, małych klas lub serwisów (np. `MovieService`, `RatingCalculator`). Komponenty UI (React) powinny być "głupie" i odpowiadać wyłącznie za renderowanie widoku.

# Testing Requirements
* **Test driven / Test-first**: Każdy nowy serwis oraz metoda publiczna musi posiadać pełne pokrycie testami.
* **Rodzaje testów**: Testy jednostkowe (Unit Tests) są bezwzględnie obowiązkowe. Wszędzie tam, gdzie ma to techniczny sens, implementuj również testy integracyjne, aby sprawdzić współdziałanie modułów.

# Workflow & Execution
* **Ciągła weryfikacja**: Po każdej wprowadzonej zmianie w kodzie, Twoim obowiązkiem jest uruchomienie wszystkich testów w projekcie. 
* Zanim zaraportujesz zakończenie zadania, upewnij się, że wszystkie testy przechodzą na zielono i nie wprowadzono żadnych regresji.

# Naming Conventions
* **Nazewnictwo Self-Explanatory**: Zmienne, funkcje, klasy i pliki muszą mieć pełne, jasne i opisowe nazwy.
* **Zakaz skrótów**: Bezwzględnie unikaj skracania słów, zwłaszcza w testach. Używaj np. `MovieDatabase` zamiast `MovDb`, albo `FirstHuman` / `Human1` zamiast `Hum1`. Kod musi czytać się jak dokumentację.