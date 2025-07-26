# Aplicación de Personajes de Rick and Morty

Este proyecto es una aplicación de una sola página construida con JavaScript moderno (ES6+), HTML y Tailwind CSS que permite buscar, filtrar y paginar personajes de la API pública de Rick and Morty.

## Características

- **Búsqueda por Nombre:** Filtra personajes por su nombre.
- **Filtros por Estado:** Filtra por "Vivo", "Muerto" o "Desconocido".
- **Filtros por Género:** Filtra por "Femenino", "Masculino", "Sin género" o "Desconocido".
- **Paginación:** Navega entre las páginas de resultados utilizando botones "Anterior" y "Siguiente". Los botones se deshabilitan cuando no hay más páginas.
- **Estado de Carga:** Muestra un mensaje mientras se cargan los datos.
- **Mensaje de No Resultados:** Informa al usuario cuando no se encuentran personajes.
- **Diseño Responsivo:** Utiliza Tailwind CSS para asegurar que la aplicación se vea bien en diferentes tamaños de pantalla.

## Tecnologías Utilizadas

- **HTML5:** Estructura de la página.
- **CSS3 (Tailwind CSS):** Estilos y diseño responsivo.
- **JavaScript (ES6+):** Lógica principal de la aplicación, manejo del DOM, y consumo de la API con `async/await`.
- **API de Rick and Morty:** Fuente de datos para los personajes.

## Cómo Ejecutar el Proyecto

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/nombre-de-tu-repo.git](https://github.com/tu-usuario/nombre-de-tu-repo.git)
    cd nombre-de-tu-repo
    ```

2.  **Abrir `index.html`:**
    Simplemente abre el archivo `public/index.html` en tu navegador web. No se necesita un servidor local para este proyecto, ya que no hay dependencias de backend ni un proceso de compilación complejo.

## Estructura del Proyecto