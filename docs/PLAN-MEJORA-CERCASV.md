# Plan de mejora integral de CercaSV

## Objetivo
Pulir CercaSV como marketplace mobile-first para El Salvador, conservando las funciones que ya operan y mejorando progresivamente experiencia, estabilidad, accesibilidad, seguridad y mantenibilidad.

## Alcance y reglas
- Mantener el piloto actual en Cabañas/Ilobasco mientras no se decida ampliar cobertura.
- Mantener la identidad visual azul, naranja y blanca de CercaSV.
- No eliminar funciones operativas ni cambiar contratos de Supabase sin inspeccionar antes sus tablas, políticas y funciones RPC.
- Separar cambios por fases pequeñas, verificables y reversibles.
- Probar comprador, vendedor y administrador por separado.
- No publicar cambios a `main` hasta revisar el resultado de cada fase.

## Fase 1 — Auditoría y mapa del producto
### Estructura observada
- Frontend concentrado principalmente en `index.html`, `app.js` y `style.css`.
- `app.js` contiene catálogo, autenticación, carrito, checkout, pedidos, panel vendedor, administración y navegación.
- `style.css` reúne los estilos de todas las pantallas y múltiples bloques responsive.
- Supabase proporciona autenticación, datos, notificaciones y operaciones RPC.

### Hallazgos iniciales
1. **Mantenibilidad:** la lógica principal está concentrada en un archivo JavaScript de más de 100 KB y los estilos en uno de más de 110 KB. Conviene ordenar por módulos o secciones antes de ampliar funcionalidades.
2. **Marcado del catálogo:** las tarjetas generan un botón `.product-detail` que contiene otro botón `.product-store`. Los botones anidados no son HTML válido y pueden producir comportamientos inconsistentes de clic, teclado y accesibilidad.
3. **Checkout y recogida:** el checkout exige que el comprador tenga una dirección guardada antes de evaluar los métodos de entrega. Hay que comprobar y corregir el caso de pedidos exclusivamente para recogida en local, donde una dirección de entrega no debería bloquear la compra.
4. **Perfil del comprador:** cupones y métodos de pago se muestran como accesos, pero actualmente son pantallas informativas/pendientes; deben distinguirse claramente de funciones activas.
5. **Diseño responsive:** hay numerosos bloques `@media` repartidos por la hoja de estilos. Se debe consolidar gradualmente sin hacer una reescritura visual que pueda romper pantallas.
6. **Flujos de pedidos:** ya existen estados distintos para Delivery, recogida y encomienda, además de cotización de encomienda. La siguiente revisión debe contrastar estos estados con las funciones RPC y restricciones reales de Supabase antes de modificar el flujo.
7. **Datos locales:** el carrito y favoritos usan `localStorage`. Conviene endurecer la lectura ante datos corruptos y revisar sincronización/validación del carrito sin confiar en precios o stock almacenados en el navegador.

### Prioridades detectadas
- Alta: HTML válido y accesibilidad de tarjetas/interacciones.
- Alta: checkout de recogida sin dirección obligatoria.
- Alta: validar estados de pedidos con el esquema y RPC reales.
- Media: claridad de funciones pendientes en Mi cuenta.
- Media: ordenar CSS/JS y reducir duplicación.
- Media: robustecer almacenamiento local, errores y estados de carga.

## Fase 2 — Sistema visual y experiencia móvil
- Unificar tipografía, escalas, espaciado, bordes, sombras y estados de botones.
- Revisar navegación móvil, áreas táctiles, formularios, modales y mensajes.
- Mejorar estados de carga, vacío, error y confirmación.
- Mantener el banner promocional únicamente en Inicio.

## Fase 3 — Experiencia del comprador
- Inicio, catálogo, filtros, búsqueda, categorías y ubicación.
- Ficha de producto y tienda pública.
- Favoritos, carrito, checkout y direcciones.
- Historial y seguimiento de pedidos.
- Revisar accesibilidad y validaciones en cada flujo.

## Fase 4 — Experiencia del vendedor
- Solicitud y estado de aprobación de tiendas.
- Panel, perfil público, imágenes y métodos de entrega.
- Productos, inventario, edición y disponibilidad.
- Pedidos, cotizaciones y métricas.

## Fase 5 — Pedidos y logística
- Delivery: recibido → aceptado → preparando → en camino → entregado.
- Recogida: recibido → aceptado → preparando → listo para recoger → recogido/confirmación de recepción.
- Encomienda: recibido → aceptado → cotización enviada → costo confirmado por comprador → despachado → recibido.
- Alinear interfaz, validaciones y RPC con los estados realmente admitidos por la base de datos.
- Definir cancelaciones, errores, tiempos y notificaciones sin permitir saltos inválidos.

## Fase 6 — Cuenta, seguridad y confianza
- Registro, inicio de sesión, recuperación y perfil.
- Permisos comprador/vendedor/administrador.
- Revisar políticas RLS, validaciones del lado servidor, cargas de imágenes y exposición de datos.
- Clarificar pagos disponibles y políticas de privacidad/soporte.

## Fase 7 — Administración y operación
- Solicitudes de tiendas, usuarios, productos y pedidos.
- Moderación, estados de cuenta y trazabilidad de acciones.
- Mejorar filtros, búsqueda, indicadores y mensajes de error.

## Fase 8 — Pruebas, rendimiento y publicación
- Pruebas funcionales por rol y por método de entrega.
- Pruebas responsive en móviles pequeños y grandes.
- Revisar consola, red, accesibilidad, imágenes, tiempos de carga y errores.
- Verificar despliegue de Cloudflare Pages después de integrar cada fase.

## Criterio de salida por fase
Una fase se considera terminada cuando sus cambios están revisados, las rutas afectadas se han probado, no se han eliminado funciones existentes y el resultado está listo para revisión antes de integrarlo a `main`.
