# CakeWorld — Mobile Bakery Experience

An elegant React Native storefront showcasing artisanal cakes and slices with a smooth browsing and cart experience. Built with modern React Native, intuitive navigation and lightweight state management using `zustand`.

**Highlights:**

- **Beautiful UI:** responsive components, gradients and Lottie animations.
- **Persistent state:** cart, favorites and order history persisted with `AsyncStorage`.
- **Lightweight store:** `zustand` + `immer` keeps state logic small and testable.

**Tech stack**

- Framework: React Native 0.79.x
- Language: TypeScript
- State: `zustand` + `immer` (persisted via `@react-native-async-storage/async-storage`)
- Navigation: `@react-navigation/native` (native stack + bottom tabs)
- UX: `lottie-react-native`, `react-native-linear-gradient`, `react-native-vector-icons`

**Quick features**

- Browse curated cakes and slices
- Search, filter by category, and smooth horizontal lists
- Add to cart, adjust quantities and place orders
- Mark favorites and view order history

**Getting started**

Prerequisites: Node >= 18, React Native toolchain (Android Studio/Xcode). For iOS, CocoaPods and Ruby bundler may be required.

Install dependencies:

npm install

Run (Android):

npm start
npm run android

Run (iOS - macOS only):

cd ios && bundle install && bundle exec pod install
npm run ios

**Project layout (overview)**

- `App.tsx` — App entry and navigator.
- `src/screens/` — `HomeScreen`, `DetailsScreen`, `CartScreen`, `PaymentScreen`, etc.
- `src/components/` — UI building blocks (`CakeCard`, `HeaderBar`, `CustomIcon`, `BGIcon`).
- `src/data/` — static datasources (`CakeData`, `SlicesData`) used to seed UI.
- `src/store/store.ts` — `zustand` store: cart/favorites/order history and business logic.
- `src/theme/theme.ts` — design tokens used across components.



If you want, I can now: add screenshots to this `README.md`, add CI, or open a small PR that documents the store API. Which would you like me to do next?
