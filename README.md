# 🛒 MiniStock API

API REST para la gestión de stock de productos en un minimarket.
Permite administrar productos, categorías y movimientos de inventario

🚧 **Proyecto en desarrollo** 🚧

---

## 📌 Tecnologías

- Node.js
- Express
- TypeScript
- PostgreSQL
- TypeORM
- Class-validator
- Passport
- JWT
- bcryptjs
- dotenv

---

## 🔧 Instalación (en desarrollo)

1. Cloná el repositorio:

```
git clone https://github.com/FLBracco/ministock.git
```

2. Instalá dependencias:

```
pnpm install
```

3. Configurá las variables de entorno en `.env` (ver `.env.example`).
4. Ejecutá las migraciones y el servidor

---

## 📦 Funcionalidades previstas

- Registro y login de usuarios

- CRUD de productos

- CRUD de categorías

- Registro de movimientos de stock

- Autenticación y autorización con JWT

- Validación de datos con Class-validator

---

## 🗂️ Estructura del proyecto (en progreso)

```
src/
├── auth/
├── categories/
│ ├── controller/
│ ├── dto/
│ ├── entities/
│ ├── middlewares/
│ ├── services/
│ └── categories.router.ts
├── config/
│ ├── base.dto.ts
│ ├── base.entity.ts
│ ├── base.service.ts
│ ├── config.ts
│ └── data.source.ts
├── migrations/
├── products/
├── shared/
├── stock/
├── user/
└── app.ts
.env
.gitignore
package.json
pnpm-lock.yaml
README.md
tsconfig.json
```

---

## 📅 Estado del proyecto

- [x] Configuración inicial del entorno
- [x] Modelado de la base de datos
- [x] Implementación del módulo de categorías
- [x] Implementación del módulo de usuarios
- [x] Implementación del módulo de Productos
- [x] Implementación del módulo de Stock_movements
- [x] Autenticación con JWT
- [ ] Asociar automáticamente los movimientos de stock con el usuario a partir del token
