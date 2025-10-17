<h1 align="center">📦 gdom.js</h1>
<p align="center">DOM simplificado, elegante y extensible</p>

<p align="center">
  <strong>Versión estable:</strong> <code>v0.0.2</code>  
</p>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#ejemplo">Ejemplo</a> •
  <a href="#mejoras-recientes">Mejoras</a> •
  <a href="#estructura-modular">Estructura modular</a> •
  <a href="#documentación">Documentación</a> •
  <a href="#contribuciones">Contribuciones</a>
</p>

---

## 🚀 Características

| 🧠 Categoría                  | 🧩 Métodos disponibles                                                                 |
|-----------------------------|----------------------------------------------------------------------------------------|
| ✅ API encadenable y fluida  | `g('#id').text('Hola').addClass('activo')`                                            |
| 🧱 Manipulación de contenido | `html`, `text`, `empty`, `clone`, `replaceWith`                                       |
| 🎨 Estilos y clases          | `css`, `addClass`, `removeClass`, `toggleClass`, `hasClass`, `cursor`                |
| 🧩 Atributos                 | `prop`, `data`, `addAttrb`, `rmAttrb`                                                 |
| 🧠 Eventos                   | `on`, `once`, `off`, `delegate`, `trigger`, `preventDefault`, `stopPropagation`       |
| 🧬 Estructura DOM            | `append`, `prepend`, `wrap`, `wrapAll`, `unwrap`, `children`, `first`, `last`        |
| 🧭 Navegación                | `parent`, `prev`, `next`, `siblings`, `closest`                                       |
| 📐 Geometría                 | `offset`, `position`, `outerHeight`, `outerWidth`                                     |
| 🎞️ Scroll                   | `scrollTop`, `scrollLeft`, `gotodiv`, `smooth`                                        |
| 🧪 Formularios               | `val`, `intval`, `floatval`, `emptyVal`, `resetText`, `getFiles`, `serialize`        |
| 🎯 Animaciones integradas    | `fadeIn`, `slideUp`, `slideDown`, `slideToggle`, `bounce`, `timeline`, `animateCSS`  |
| 🔍 Utilidades                | `version`, `getArgs`, `setCursorAtEnd`, `extend`, `safeEval`, `logEvent`             |

---
## Manejo de Eventos

### 🔧 Métodos disponibles

| Método              | Descripción                                                                 |
|---------------------|------------------------------------------------------------------------------|
| `.on(event, fn)`     | Escucha un evento en el elemento seleccionado.                              |
| `.once(event, fn)`   | Escucha el evento solo una vez.                                             |
| `.off(event, fn)`    | Elimina el listener del evento.                                             |
| `.delegate(sel, ev)` | Escucha eventos en hijos que coincidan con el selector.                     |
| `.trigger(event)`    | Dispara manualmente un evento.                                              |
| `.preventDefault()`  | Previene el comportamiento por defecto del evento actual.                   |
| `.stopPropagation()` | Detiene la propagación del evento en el árbol DOM.                          |

---

## 🧩 Ventajas del sistema de eventos

El sistema de eventos de `gdom` está diseñado para ofrecer control total, claridad sintáctica y compatibilidad con animaciones, rutas y componentes. Estas son sus principales ventajas:

- ✅ Encadenamiento fluido: puedes combinar `.on()`, `.once()`, `.off()` con cualquier método de `gdom`.
- 🧠 Control granular: permite delegar, prevenir y detener eventos con precisión (`delegate`, `preventDefault`, `stopPropagation`).
- 🎯 Integración con animaciones: se enlaza fácilmente con métodos como `slideUp`, `slideDown`, `bounce`, etc.
- 🧩 Compatibilidad con rutas y componentes: ideal para sistemas interactivos con navegación activa y fichas dinámicas.
- 🧬 Ideal para entornos pedagógicos: permite crear experiencias interactivas y seguras para niños, docentes y editores.
- 🔐 Seguridad y claridad: evita comportamientos no deseados y facilita el debugging en entornos técnicos y educativos.

---

## 🔌 Sistema de plugins en gdom (vía General.JS v2)
| 🧩 Característica             | 📘 Descripción técnica                                                                 |
|------------------------------|----------------------------------------------------------------------------------------|
| 🔌 Registro dinámico         | Los plugins se integran mediante `.extend()` o `.use()` desde `General.JS v2`.        |
| 🧠 Encapsulamiento por módulo | Cada plugin puede definir sus propios métodos, eventos, efectos o utilidades.         |
| 🔄 Encadenamiento fluido     | Los métodos añadidos por plugins se integran al flujo encadenable de `gdom`.          |
| 🧬 Compatibilidad total      | Los plugins pueden interactuar con `animate`, `bind`, `routing`, `reactive`, etc.     |
| 🧪 Tipos de plugins soportados| Visuales, estructurales, de eventos, formularios, AJAX, seguridad, pedagogía.         |
| 🧱 Base técnica               | Usa `Object.assign`, `prototype`, o `extend()` para inyectar funcionalidad.           |


## 🔧 Instalación

```bash
npm install gdom.js
```

## Import library from CDN
```html
	<script src="https://cdn.underdevelopment.work/generaljs/gdom.min.js">
```

## How to init the library
```javascript
	genrl.run(function(){
		//write code below
	});
```

## How to select a DOMElement By ID
```javascript
	g("#element");
```

## How to select a DOMElement By ClassName
```javascript
	g(".element");
```

## How to set CSS attributes
```javascript
	g("#element").css({
		'height': '400px',
		'width': '200px',
		'opacity': '1'
	});
```
## Bind an event
```javascript
g("#btnmover").click(function(){
	g("#div_A").animate('bounce',5000,function(){
		genrl.log("Se ha activado el callBack");
	});
});
```
## How to get an attribute of a DOMElement
```javascript
	idelement=g("#element").getAttrb("id");
```

## How to set an attribute of a DOMElement
```javascript
	g("#element").setAttrb("attribRandom","test");
```

## Get element children
```javascript
	g("#element").children();
```

## Get element child number N
```javascript
	g("#element").child(N);
```

## Get fileList from file input when it changes
### archivo is a file input
```javascript
	g('#archivo').change(function(e){
		console.log("Cambió el campo");
		dataf=g('#archivo').getFiles();
	});
```

## Smooth scrolling
```javascript
	g("#holap").click(function(){
		g("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
```

### Use the Source...

### The Source be with you...

## Si deseas colaborar, haz clic en el enlace abajo:
## if do you like to to collab, you can do it by clicking the link below:
## --Paypal-- 
[![paypal-btn-image-pay](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/avsolucionesweb)
