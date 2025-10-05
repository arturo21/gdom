<h1 align="center">📦 gdom.js</h1>
<p align="center">DOM simplificado, elegante y extensible</p>

<p align="center">
  <strong>Versión estable:</strong> <code>v0.0.1</code>  
</p>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#ejemplo">Ejemplo</a> •
  <a href="#mejoras-recientes">Mejoras</a> •
  <a href="#documentación">Documentación</a> •
  <a href="#contribuciones">Contribuciones</a>
</p>

---

## 🚀 Características

- ✅ Selección rápida y segura de elementos (`g('#id')`)
- 🧱 Manipulación de contenido (`text`, `html`, `val`, `empty`)
- 🎨 Estilos y clases (`css`, `addClass`, `removeClass`, `toggleClass`)
- 🧩 Atributos y propiedades (`prop`, `cursor`, `hide`, `show`)
- 🧭 Navegación DOM (`parent`, `children`, `next`, `prev`, `closest`)
- 🧬 Mutación estructural (`append`, `prepend`, `before`, `after`, `remove`)
- 🧠 Eventos (`on`, `trigger`, `preventDefault`, `stopPropagation`)
- 🎞️ Animaciones (`animate`)
- 📐 Geometría y scroll (`offset`, `position`, `scrollTop`, `outerHeight`)
- 🧪 Formularios (`val`, `intval`, `floatval`, `getFiles`)
- 🔍 Utilidades (`version`, `setCursorAtEnd`, `getArgs`)

---

## 🔧 Instalación

```bash
npm install gdom.js

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
