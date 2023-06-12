# Todo list програм

HTML CSS TypeScript ESLint ViteJS ашиглан Todo list програм хийх хичээлийн эх код

## Программаа local орчинд ажиллуулах нь

NPM cli программ байхгүй бол [nodejs.org](nodejs.org) сайтаас nodejs-ээ суулгасаны дараа ажиллуулаарай. NPM нь nodejs-тэй цуг суугдсан байдаг.

Эхлээд package(сангууд)-уудаа суулгана

```bash
npm install
```

Package-ууд Суулгасаны дараа программаа ажиллуулах

```bash
npm start
```

## Программаа production build хийж бүтээгдэхүүн болгон гаргах нь

Production build гэдэг нь манай программ жинхэнэ сервер дээр ажиллахад бэлэн болно гэсэн үг. Production build хийхгүй бол манай TypeScript файлууд маань browser дээр ажиллахгүй. TypeScript файлуудаа заавал JavaScript файл болгож байж жинхэнэ сервер дээр ажиллана. Доорх коммандыг ажиллуулна.

```bash
npm run build
```

Production build хийсэний дараа local дээрээ production build-аа тестлэх бол энэ коммандыг ажиллуулна.

```bash
npm run preview
```
