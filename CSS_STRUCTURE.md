# CSS Structure Documentation

## 📁 Dosya Organizasyonu

Bu proje, React best practices'e uygun olarak **CSS Modules** kullanır. Her component kendi stil dosyasına sahiptir ve stil izolasyonu sağlanır.

### Dizin Yapısı

```
src/renderer/src/
├── assets/                    # Global stil dosyaları
│   ├── variables.css         # CSS değişkenleri (renkler, boyutlar, vb.)
│   ├── reset.css             # CSS reset ve temel stiller
│   ├── main.css              # Ana import dosyası
│   └── base.css              # Legacy dosya (artık kullanılmıyor)
│
└── styles/                    # Component-specific CSS Modules
    ├── Screen.module.css     # Ekran container ve header stilleri
    ├── Menu.module.css       # Menü ve liste stilleri
    ├── Wheel.module.css      # iPod tekerleği stilleri
    ├── NowPlaying.module.css # Now Playing ekran stilleri
    └── Clock.module.css      # Saat ekran stilleri
```

## 🎨 CSS Modülleri

### 1. **variables.css** - CSS Değişkenleri

Tüm renkler, boyutlar ve diğer stil değişkenlerini içerir:

```css
:root {
  /* Renkler */
  --primary-color: #3853B6;
  --background-light: #C6C6C6;
  --text-dark: #2b2b2b;
  
  /* Boyutlar */
  --spacing-sm: 9px;
  --spacing-md: 15px;
  
  /* Tipografi */
  --font-family: 'Pixelify Sans', Arial, sans-serif;
  --font-size-lg: 20px;
}
```

**Avantajları:**
- Tek noktadan tema yönetimi
- Kolay renk değişimi
- Tutarlı spacing ve sizing
- Dark mode desteği

### 2. **reset.css** - Temel Stiller

Global reset ve body stilleri:
- CSS reset (margin, padding sıfırlama)
- Body layout ayarları
- Global font ayarları
- Background image

### 3. **Screen.module.css** - Ekran Componentleri

iPod ekran container ve header stilleri:
- `.screen` - Ana ekran container
- `.screenHeader` - Ekran başlığı
- `.batteryIcon` - Batarya ikonu

**Kullanım:**
```jsx
import styles from '../styles/Screen.module.css'

<div className={styles.screen}>
  <div className={styles.screenHeader}>
    iPod mini
  </div>
</div>
```

### 4. **Menu.module.css** - Menü Componentleri

Menü listeleri ve öğeler için stiller:
- `.menu` - Ana menü container
- `.menuItem` - Menü öğesi
- `.active` - Seçili öğe
- `.arrow` - Ok işareti olan öğeler
- `.muted` - Soluk metin

**Kullanım:**
```jsx
import menuStyles from '../styles/Menu.module.css'

<ul className={menuStyles.menu}>
  <li className={`${menuStyles.menuItem} ${menuStyles.active}`}>
    Music
  </li>
</ul>
```

### 5. **Wheel.module.css** - iPod Tekerleği

iPod wheel ve buton stilleri:
- `.wheel` - Ana tekerlek container
- `.wheelBtn` - Tekerlek üzerindeki butonlar
- `.centerBtn` - Merkez buton
- `.menuBtn`, `.left`, `.right`, `.play` - Spesifik butonlar

**Kullanım:**
```jsx
import styles from '../styles/Wheel.module.css'

<div className={styles.wheel}>
  <div className={`${styles.wheelBtn} ${styles.menuBtn}`}>
    <img src={menu} alt="menu" />
  </div>
</div>
```

### 6. **NowPlaying.module.css** - Now Playing Ekranı

Çalan şarkı ekranı stilleri:
- `.container` - Ana container
- `.songName` - Şarkı adı
- `.artist` - Sanatçı adı
- `.album` - Albüm adı
- `.progressBarContainer` - İlerleme çubuğu container
- `.progressBar` - İlerleme çubuğu

### 7. **Clock.module.css** - Saat Ekranı

Saat ekranı stilleri:
- `.container` - Ana container
- `.time` - Saat gösterimi
- `.date` - Tarih gösterimi

## 🔄 CSS Modules Avantajları

### 1. **Scope İzolasyonu**
Her component kendi stillerini içerir, global namespace kirliliği yoktur:
```jsx
// Screen.module.css'deki .container
// Menu.module.css'deki .container
// Birbirleriyle çakışmaz!
```

### 2. **Otomatik Class İsimlendirme**
Build sırasında unique class isimleri oluşturulur:
```css
/* Kaynak: .menuItem */
/* Build sonrası: .Menu_menuItem__a8B9c */
```

### 3. **Type Safety**
IDE autocomplete ve hata kontrolü:
```jsx
import styles from './Screen.module.css'
styles.screenHeader // ✓ Otomatik tamamlama
styles.scrrenHeader // ✗ Hata gösterir
```

### 4. **Kolay Bakım**
- Her component kendi stilini yönetir
- Stil değişiklikleri lokalize edilir
- Test ve debug kolaylaşır

## 🎯 Kullanım Best Practices

### 1. Component-Level Styles
Her component kendi stil modülünü import eder:
```jsx
// MainMenu.jsx
import styles from '../styles/Screen.module.css'
import menuStyles from '../styles/Menu.module.css'
```

### 2. Class Birleştirme
Birden fazla class kullanırken template literal:
```jsx
<li className={`${menuStyles.menuItem} ${selectedIndex === index ? menuStyles.active : ''}`}>
  Music
</li>
```

### 3. CSS Variables Kullanımı
Tekrar eden değerleri CSS variables ile yönetin:
```css
/* Değişken tanımlama */
:root {
  --primary-color: #3853B6;
}

/* Değişken kullanımı */
.active {
  background: var(--primary-color);
}
```

### 4. Tema Değişimi
Body class'ı ile tema değiştirme:
```jsx
// Light/Dark mode
document.body.classList.toggle('theme-dark', isDark)
```

```css
/* variables.css */
body.theme-dark {
  --background-light: var(--background-dark);
  --primary-color: var(--primary-light);
}
```

## 🔧 Yeni Stil Ekleme

### Adım 1: CSS Module Oluştur
```css
/* styles/MyComponent.module.css */
.container {
  padding: var(--spacing-lg);
}

.title {
  font-size: var(--font-size-xl);
  color: var(--primary-color);
}
```

### Adım 2: Component'te Import Et
```jsx
import styles from '../styles/MyComponent.module.css'

const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello</h1>
    </div>
  )
}
```

## 📊 Dosya Boyutları ve Performans

### CSS Modules Avantajları
- ✅ Sadece kullanılan stiller bundle'a dahil edilir
- ✅ Tree-shaking ile optimize edilir
- ✅ Code splitting ile lazy loading
- ✅ Minimize ve compress edilir

### Build Optimizasyonu
```bash
npm run build
# CSS modules otomatik olarak:
# - Minify edilir
# - Unused styles çıkarılır
# - Hash'li dosya isimleri oluşturulur
# - Gzip compression yapılır
```

## 🎨 Tema Sistemi

### Light Theme (Default)
```css
:root {
  --primary-color: #3853B6;
  --background-light: #C6C6C6;
  --text-dark: #2b2b2b;
}
```

### Dark Theme
```css
body.theme-dark {
  --background-light: #222831;
  --primary-color: #90caf9;
  --text-dark: #ffffff;
}
```

### Tema Değiştirme
```jsx
// ThemesScreen.jsx veya WheelController.jsx
const changeTheme = (theme) => {
  document.body.classList.toggle('theme-dark', theme === 'dark')
}
```

## 📝 Migration Notes

### Eski Yapı (base.css)
```css
/* base.css - Global styles */
.menu { ... }
.menu li { ... }
.screen { ... }
```

### Yeni Yapı (CSS Modules)
```css
/* Menu.module.css - Scoped styles */
.menu { ... }
.menuItem { ... }

/* Screen.module.css */
.screen { ... }
```

**Avantajlar:**
- ✅ Stil izolasyonu
- ✅ Bakım kolaylığı
- ✅ Type safety
- ✅ Daha iyi performance
- ✅ React best practices

## 🚀 Sonuç

Bu yeni CSS yapısı:
- Modern React uygulamaları için ideal
- Ölçeklenebilir ve bakımı kolay
- Type-safe ve IDE dostu
- Performans optimized
- Best practices'e uygun

Tüm componentler artık CSS Modules kullanıyor ve eski `base.css` dosyası deprecated edildi.

