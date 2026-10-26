<p align="center">
  <a href="https://openvibe.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="شعار OpenVibe">
    </picture>
  </a>
</p>
<p align="center">وكيل برمجة بالذكاء الاصطناعي مفتوح المصدر.</p>
<p align="center">
  <a href="https://openvibe.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/openvibe-ai"><img alt="npm" src="https://img.shields.io/npm/v/openvibe-ai?style=flat-square" /></a>
  <a href="https://github.com/ClayzaAubert/openvibe/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/ClayzaAubert/openvibe/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![OpenVibe Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://openvibe.ai)

---

### التثبيت

```bash
# YOLO
curl -fsSL https://openvibe.ai/install | bash

# مديري الحزم
npm i -g openvibe-ai@latest        # او bun/pnpm/yarn
scoop install openvibe             # Windows
choco install openvibe             # Windows
brew install anomalyco/tap/openvibe # macOS و Linux (موصى به، دائما محدث)
brew install openvibe              # macOS و Linux (صيغة brew الرسمية، تحديث اقل)
sudo pacman -S openvibe            # Arch Linux (Stable)
paru -S openvibe-bin               # Arch Linux (Latest from AUR)
mise use -g openvibe               # اي نظام
nix run nixpkgs#openvibe           # او github:ClayzaAubert/openvibe لاحدث فرع dev
```

> [!TIP]
> احذف الاصدارات الاقدم من 0.1.x قبل التثبيت.

### تطبيق سطح المكتب (BETA)

يتوفر OpenVibe ايضا كتطبيق سطح مكتب. قم بالتنزيل مباشرة من [صفحة الاصدارات](https://github.com/ClayzaAubert/openvibe/releases) او من [openvibe.ai/download](https://openvibe.ai/download).

| المنصة                | التنزيل                            |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `openvibe-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `openvibe-desktop-mac-x64.dmg`     |
| Windows               | `openvibe-desktop-windows-x64.exe` |
| Linux                 | `.deb` او `.rpm` او AppImage       |

```bash
# macOS (Homebrew)
brew install --cask openvibe-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/openvibe-desktop
```

#### مجلد التثبيت

يحترم سكربت التثبيت ترتيب الاولوية التالي لمسار التثبيت:

1. `$OPENVIBE_INSTALL_DIR` - مجلد تثبيت مخصص
2. `$XDG_BIN_DIR` - مسار متوافق مع مواصفات XDG Base Directory
3. `$HOME/bin` - مجلد الثنائيات القياسي للمستخدم (ان وجد او امكن انشاؤه)
4. `$HOME/.openvibe/bin` - المسار الافتراضي الاحتياطي

```bash
# امثلة
OPENVIBE_INSTALL_DIR=/usr/local/bin curl -fsSL https://openvibe.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://openvibe.ai/install | bash
```

### Agents

يتضمن OpenVibe وكيليْن (Agents) مدمجين يمكنك التبديل بينهما باستخدام زر `Tab`.

- **build** - الافتراضي، وكيل بصلاحيات كاملة لاعمال التطوير
- **plan** - وكيل للقراءة فقط للتحليل واستكشاف الكود
  - يرفض تعديل الملفات افتراضيا
  - يطلب الاذن قبل تشغيل اوامر bash
  - مثالي لاستكشاف قواعد كود غير مألوفة او لتخطيط التغييرات

بالاضافة الى ذلك يوجد وكيل فرعي **general** للبحث المعقد والمهام متعددة الخطوات.
يستخدم داخليا ويمكن استدعاؤه بكتابة `@general` في الرسائل.

تعرف على المزيد حول [agents](https://openvibe.ai/docs/agents).

### التوثيق

لمزيد من المعلومات حول كيفية ضبط OpenVibe، [**راجع التوثيق**](https://openvibe.ai/docs).

### المساهمة

اذا كنت مهتما بالمساهمة في OpenVibe، يرجى قراءة [contributing docs](./CONTRIBUTING.md) قبل ارسال pull request.

### البناء فوق OpenVibe

اذا كنت تعمل على مشروع مرتبط بـ OpenVibe ويستخدم "openvibe" كجزء من اسمه (مثل "openvibe-dashboard" او "openvibe-mobile")، يرجى اضافة ملاحظة في README توضح انه ليس مبنيا بواسطة فريق OpenVibe ولا يرتبط بنا بأي شكل.

---

**انضم الى مجتمعنا** [Discord](https://discord.gg/openvibe) | [X.com](https://x.com/openvibe)
