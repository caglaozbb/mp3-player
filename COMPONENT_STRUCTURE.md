# iPod MP3 Player - Component Structure

## Overview
Bu proje, klasik iPod tasarımını taklit eden bir müzik çalar uygulamasıdır. Kullanıcılar iPod tekerleği (wheel) ile menüler arasında gezinebilir ve müzik çalabilirler.

## Component Hiyerarşisi

```
App.jsx (NavigationProvider ile sarmalanmış)
├── ScreenManager (Ekran yönlendirme)
└── WheelController (iPod tekerleği kontrolleri)
```

## Dosya Yapısı

### Context
- **`context/NavigationContext.jsx`**: Tüm navigasyon state'ini ve fonksiyonlarını yönetir
  - `navigateTo()`: Yeni ekrana geçiş
  - `goBack()`: Önceki ekrana dön
  - `moveUp()` / `moveDown()`: Liste içinde yukarı/aşağı hareket
  - `selectedIndex`: Seçili menü öğesinin indeksi

### Main Components
- **`components/ScreenManager.jsx`**: Mevcut ekranı render eder
- **`components/WheelController.jsx`**: iPod tekerleği kontrollerini yönetir

### Screen Components

#### Ana Menü Ekranları
1. **`screens/MainMenu.jsx`**: Ana menü
   - Music → MusicMenu'ye gider
   - Extras → ExtrasMenu'ye gider
   - Settings → SettingsMenu'ye gider
   - Shuffle Songs → Şarkıları karıştır
   - Now Playing → NowPlayingScreen'e gider

2. **`screens/MusicMenu.jsx`**: Müzik menüsü
   - Artists → ArtistsScreen'e gider
   - Albums → AlbumsScreen'e gider
   - Songs → SongsScreen'e gider

3. **`screens/ExtrasMenu.jsx`**: Extras menüsü
   - Clock → ClockScreen'e gider
   - Themes → ThemesScreen'e gider

4. **`screens/SettingsMenu.jsx`**: Ayarlar menüsü
   - Volume: Ses seviyesi ayarı
   - Shuffle: Karıştırma ayarı

#### Alt Ekranlar
5. **`screens/ArtistsScreen.jsx`**: Sanatçı listesi
   - Bir sanatçıya tıklanınca o sanatçının şarkıları gösterilir

6. **`screens/AlbumsScreen.jsx`**: Albüm listesi
   - Bir albüme tıklanınca o albümün şarkıları gösterilir

7. **`screens/SongsScreen.jsx`**: Şarkı listesi
   - Bir şarkıya tıklanınca "Now Playing" ekranı açılır
   - Artist veya Album'den geldiyse filtrelenmiş şarkıları gösterir

8. **`screens/NowPlayingScreen.jsx`**: Şu anda çalan şarkı
   - Şarkı adı, sanatçı, albüm
   - Süre ve ilerleme çubuğu

9. **`screens/ClockScreen.jsx`**: Saat ekranı
   - Anlık saat ve tarih gösterir

10. **`screens/ThemesScreen.jsx`**: Tema seçimi
    - Light Theme
    - Dark Theme

## Navigasyon Akışı

### Music Menüsü Akışı
```
MainMenu 
  → Music (tıkla)
    → MusicMenu
      → Artists (tıkla)
        → ArtistsScreen
          → Artist seç (tıkla)
            → SongsScreen (o sanatçının şarkıları)
              → Song seç (tıkla)
                → NowPlayingScreen
```

### Extras Menüsü Akışı
```
MainMenu 
  → Extras (tıkla)
    → ExtrasMenu
      → Clock (tıkla)
        → ClockScreen
      → Themes (tıkla)
        → ThemesScreen
```

### Settings Menüsü Akışı
```
MainMenu 
  → Settings (tıkla)
    → SettingsMenu
      - Volume ayarı
      - Shuffle ayarı
```

## iPod Wheel Kontrolleri

### Buton İşlevleri
- **MENU Button**: Bir önceki ekrana dön (`goBack()`)
- **Left Button (◄)**: Listede yukarı çık (`moveUp()`)
- **Right Button (►)**: Listede aşağı in (`moveDown()`)
- **Center Button**: Seçili öğeyi onayla/aç (`handleCenterClick()`)
- **Play Button**: Müzik çal/duraklat (gelecekte implement edilecek)

### Navigasyon Mantığı
1. Sol/Sağ butonlar seçili öğeyi değiştirir
2. Merkez buton seçili öğeyi "açar" veya "aktive eder"
3. Menu butonu her zaman bir önceki ekrana döner
4. Ana menüdeyken Menu butonu çalışmaz (zaten en üst seviyede)

## Özellikler

### Tamamlanmış
- ✅ Navigasyon sistemi
- ✅ Tüm menü ekranları
- ✅ Artists, Albums, Songs listeleri
- ✅ Now Playing ekranı
- ✅ Clock ekranı
- ✅ Theme değiştirme
- ✅ iPod wheel kontrolleri
- ✅ Geri gitme (MENU butonu)

### Gelecekte Eklenebilir
- 🔄 Gerçek müzik dosyası oynatma
- 🔄 Volume kontrolü (şu anda sadece görsel)
- 🔄 Shuffle fonksiyonu
- 🔄 Play/Pause butonu işlevi
- 🔄 İlerleme çubuğu etkileşimi
- 🔄 Müzik veritabanı entegrasyonu

## Kullanım

### Yeni Ekran Ekleme
1. `screens/` klasörüne yeni component ekle
2. `ScreenManager.jsx`'e yeni case ekle
3. Gerekirse `WheelController.jsx`'e navigasyon mantığı ekle
4. `NavigationContext`'i kullanarak navigasyon sağla

### Örnek:
```jsx
// screens/YeniEkran.jsx
import { useNavigation } from '../context/NavigationContext'

const YeniEkran = () => {
  const { selectedIndex } = useNavigation()
  
  return (
    <>
      <div className="screen-header">Yeni Ekran</div>
      <ul className="menu">
        {/* Menü öğeleri */}
      </ul>
    </>
  )
}

export default YeniEkran
```

## State Yönetimi

Tüm navigasyon state'i `NavigationContext` içinde merkezi olarak yönetilir:

```javascript
{
  history: [{ screen: 'main' }, { screen: 'music' }, ...],
  selectedIndex: 0,
  currentScreen: { screen: 'music', ...extraData }
}
```

Her ekran geçişinde:
- History'ye yeni ekran eklenir
- selectedIndex sıfırlanır
- Extra data (şarkı, sanatçı bilgisi vb.) iletilir

