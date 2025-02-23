# Plataforma eCommerce -  Frontend

![Captura de la aplicación](img.png)
Esta es una pequeña aplicación en Angular para la gestión de productos. Permite listar, agregar, editar y eliminar productos de una base de datos simulada.

## Requisitos

- Node.js (>= 14.x)
- npm (>= 6.x)
- Angular CLI (>= 12.x)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

2. Abrir en el navegador:
   ```
   http://localhost:4200/
   ```

## Creación de Componentes y Servicios

### 1️⃣ Crear el Proyecto (Si aún no lo has hecho)
```bash
ng new ecommerce_frontend
cd ecommerce_frontend
```

### 2️⃣ Generar los Componentes

#### 📌 Componente `clientes-list`
```bash
ng generate component app/clientes-list
```

#### 📌 Componente `product-form`
```bash
ng generate component app/product-form
```

#### 📌 Componente `product-list`
```bash
ng generate component app/product-list
```

#### 📌 Componente `proveedores-list`
```bash
ng generate component app/proveedores-list
```

### 3️⃣ Generar los Servicios

#### 📌 Servicio `client.service.ts`
```bash
ng generate service app/services/client
```

## Estructura del Proyecto

El proyecto contiene los siguientes componentes y servicios:

- **ProductService**: Servicio encargado de la gestión de productos.
  ```bash
  ng generate service product
  ```

- **ProductListComponent**: Componente que muestra la lista de productos.
  ```bash
  ng generate component product-list
  ```

## Funcionalidades

- Listado de productos con paginación.
- Opciones para agregar, editar y eliminar productos.
- Uso de Angular Material para la interfaz de usuario.

## Tecnologías Utilizadas

- **Angular** - Framework de desarrollo web.
- **Angular Material** - Biblioteca de componentes de UI.
- **TypeScript** - Lenguaje de programación.
- **JSON Server** (opcional) - Simulación de una API REST.


## Licencia

Este proyecto está bajo la licencia MIT.
