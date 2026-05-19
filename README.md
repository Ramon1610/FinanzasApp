# 💰 Mis Finanzas - PWA para iPhone

Aplicación web progresiva (PWA) optimizada para iPhone que permite registrar ingresos y gastos personales y visualizar un dashboard financiero conectado a Google Sheets.

## 📋 Archivos incluidos

- `index.html` - Aplicación principal (HTML + CSS + JS autocontenido)
- `manifest.json` - Configuración PWA
- `sw.js` - Service Worker para funcionalidad offline
- `icon-192.png` - Ícono de app 192x192px
- `icon-512.png` - Ícono de app 512x512px

## 🚀 Instalación y uso

### 1. Configuración inicial

**Opción A: Probar localmente**
1. Abre `index.html` directamente en Safari desde tu iPhone
2. En el modal de configuración, ingresa:
   - **Google Sheets API Key**: Tu API Key de Google Cloud Console
   - **ID de la Planilla**: `1N-M1GlYo3l66sMYN1qMehGtlBhGl0xECJglbYqNoL3I` (o tu ID)

**Opción B: Instalar como PWA (recomendado)**
1. Sube todos los archivos a un servidor web con HTTPS
2. Abre la URL en Safari iOS
3. Toca el botón "Compartir" (cuadrado con flecha)
4. Selecciona "Agregar a pantalla de inicio"
5. La app se instalará como una aplicación nativa

### 2. Obtener Google Sheets API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o usa uno existente
3. Habilita "Google Sheets API"
4. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
5. Copia la API Key generada
6. **Importante**: Restringe la clave para usar solo Google Sheets API

### 3. Configurar la planilla de Google Sheets

Tu planilla debe tener:
- **Pestañas mensuales**: Enero, Febrero, Marzo, etc.
- **Columnas en cada pestaña**: Fecha | Concepto | Categoría | Monto
- **Permisos**: La planilla debe ser pública (al menos para lectura) o compartida con tu cuenta

Ejemplo de estructura:
```
Fecha       | Concepto           | Categoría    | Monto
19/05/2026  | Sueldo            | Sueldo       | 150000
19/05/2026  | Supermercado Día  | Supermercado | -8500
20/05/2026  | Uber              | Transporte   | -2300
```

## 💡 Funcionalidades

### Tab REGISTRO
- Toggle Ingreso/Gasto con botones grandes
- Formulario simple: Monto, Concepto, Categoría
- Guardado directo en Google Sheets
- Feedback visual con animación de éxito
- Lista de últimos 10 movimientos

### Tab DASHBOARD
- **KPIs del mes actual**:
  - Balance total
  - Total ingresos
  - Total gastos
- Gráfico de barras: Ingresos vs Gastos (últimos 6 meses)
- Gráfico pie: Distribución de gastos por categoría
- Botón de actualización manual

### Tab HISTORIAL
- Lista completa de movimientos
- Filtros por:
  - Mes (selector)
  - Tipo (Ingresos/Gastos/Todos)
  - Búsqueda por concepto
- Scroll infinito

### Características PWA
- ✅ Instalable en iPhone como app nativa
- ✅ Funciona offline (muestra último estado cacheado)
- ✅ Cache inteligente (30 minutos)
- ✅ Service Worker para mejor rendimiento
- ✅ Optimizada para Safari iOS 15+

## 🎨 Categorías predefinidas

**Ingresos:**
- Sueldo
- Freelance
- Inversiones
- Otros

**Gastos:**
- Supermercado
- Transporte
- Servicios
- Ocio
- Salud
- Comidas
- Hogar
- Otros

## ⚙️ Configuración avanzada

### Cambiar API Key o Sheet ID
1. Toca el ícono de ajustes (⚙️) en el header
2. Edita los valores necesarios
3. Toca "Verificar Conexión" para probar

### Limpiar cache
- Los datos se cachean por 30 minutos
- Usa el botón de refrescar (🔄) para forzar actualización
- O limpia el cache desde los ajustes del navegador

### Modo offline
- La app funciona offline mostrando el último estado cacheado
- Los movimientos nuevos se guardan localmente y se sincronizan cuando hay conexión
- Un indicador visual muestra cuando estás offline

## 🔧 Tecnologías utilizadas

- **HTML5 + CSS3 + JavaScript puro** (vanilla, sin frameworks)
- **Google Sheets API v4** (lectura y escritura)
- **Chart.js** (gráficos interactivos)
- **Service Worker** (funcionalidad offline)
- **PWA Manifest** (instalación como app nativa)

## 📱 Compatibilidad

- ✅ Safari iOS 15+
- ✅ Chrome iOS 100+
- ✅ iPhone con iOS 15 o superior
- ⚠️ Funciones PWA completas solo en Safari

## 🐛 Solución de problemas

### No puedo guardar movimientos
- Verifica que tu API Key tiene permisos de escritura
- Confirma que la pestaña del mes actual existe en la planilla
- Revisa que la planilla no esté protegida con contraseña

### Los gráficos no cargan
- Asegúrate de tener conexión a internet (Chart.js se carga desde CDN)
- Si estás offline, los gráficos no se mostrarán

### La app no se actualiza
- Limpia el cache del navegador
- Toca el botón refrescar en el header
- Reinstala la PWA

### Error de permisos en Google Sheets
- Verifica que la planilla sea pública o compartida
- Confirma que la API Key no esté restringida por dominio
- Revisa que Google Sheets API esté habilitada en tu proyecto

## 🔐 Seguridad y privacidad

- La API Key se guarda solo en localStorage de tu dispositivo
- No hay backend propio, todo se comunica directamente con Google Sheets
- Los datos nunca salen de tu dispositivo excepto hacia Google Sheets
- Usa HTTPS siempre que sea posible para evitar interceptación

## 📊 Limitaciones conocidas

- Formato de números: Argentina (1.234,56)
- Máximo 10 movimientos en la vista de "Recientes"
- Cache de 30 minutos (configurable en el código)
- Requiere conexión para primera carga
- Los íconos de emojis pueden verse diferentes según el dispositivo

## 🚀 Próximas mejoras posibles

- [ ] Notificaciones push diarias
- [ ] Export a CSV
- [ ] Modo oscuro automático
- [ ] Reconocimiento de voz para conceptos
- [ ] Widget iOS (si es posible con PWA)
- [ ] Categorías personalizables
- [ ] Presupuestos mensuales por categoría
- [ ] Comparación año a año
- [ ] Compartir reportes como imagen

## 📝 Notas importantes

- **Formato de fecha**: La app usa formato DD/MM/YYYY (argentino)
- **Separador decimal**: Acepta punto o coma, pero guarda con coma
- **Montos negativos**: Los gastos se guardan con signo negativo automáticamente
- **Mes actual**: Se detecta automáticamente según la fecha del sistema

## 🤝 Soporte

Si encuentras problemas o tienes sugerencias:
1. Verifica que seguiste todos los pasos de configuración
2. Revisa la consola del navegador para errores (Safari → Desarrollador)
3. Confirma que tu API Key y Sheet ID son correctos

---

**Versión**: 1.0  
**Fecha**: Mayo 2026  
**Licencia**: Uso personal  
**Autor**: Ramon @ Holley
