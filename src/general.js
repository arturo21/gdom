/*
  Copyright (C) 2021 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*Integrado GDOM para el manejo del DOM / eventos / AJAX */
/*Este archivo lo necesita Function SMOOTH SCROLL*/
require("./requestAnimationFrame.js");
require("./css/animate.css");
/*************************************************/
let numapps=0;
let elementactive="html";
let varsint=[{}];
let scope=[{}];

g=(function(global,factory){
	this.elemaux='';
	this.childrenaux=[{}];
	this.parentsaux=[{}];
	this.parentaux='';
	//here wuould go private functions
	//...................
	function glog(msg){
		console.log(msg);
	};
	function easeInOutQuad(t, b, c, d){
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function indexOf_(array, valToFind){
	    let foundIndex = -1;
	    for (let index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop(element,proper){
		let obj; //busca dentro del objeto y devuelve solo la primera acepcion
		let val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function getScreenCordinates(obj) {
        let p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	function setError(name,message){
		this.name = name;
		this.message = message || '';
		let error = new Error(this.message);
		error.name = this.name;
		this.stack = error.stack;
	};
	function getBrowserPreffix(){
		let N = navigator.appName, ua = navigator.userAgent, tem;
		let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
		M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
		M = M[0];
		if(M == "Chrome") { browserPrefix = "webkit"; }
		if(M == "Firefox") { browserPrefix = "moz"; }
		if(M == "Safari") { browserPrefix = "webkit"; }
		if(M == "Opera") { browserPrefix = "o"; }
		if(M == "MSIE") { browserPrefix = "ms"; }
		return browserPrefix;
	};
	function setAnimationDuration(el,speed){
		let preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	};
	function getTransitionEvent(){
		let t, el = document.createElement("fakeelement");
		let transitions = {
	    	"transition"      : "transitionend",
	    	"OTransition"     : "oTransitionEnd",
	    	"MozTransition"   : "transitionend",
	    	"WebkitTransition": "webkitTransitionEnd"
	  	};
		for (t in transitions){
	    	if (el.style[t] !== undefined){
	      		return transitions[t];
	    	}
		}
	};
	function getAnimationEvent(){
	  	let t, el = document.createElement("fakeelement");
	  	let animations = {
		    "animationDuration"      : "animationend",
		    "OAnimationDuration"     : "oanimationend",
		    "MozAnimationDuration"   : "animationend",
		    "WebkitAnimationDuration": "webkitAnimationEnd",
			'MSAnimationDuration': 'MSAnimationEnd'
	  	}
	  	for (a in animations){
	    	if (el.style[a] !== undefined){
	      		return animations[a];
	    	}
	  	}
	};
	function getobjtype(id){
		let cadena;
		let typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getelem(id){
		let objeto, attrib, filelist;
		let tag,tagf;
		if(id!=undefined){
			if(typeof id==='string'){
				objeto=document.querySelector(id);
				if(objeto){
					return objeto;
				}
				if(typeof objeto==='object'){
					return objeto;
				}
			}
			else{
				if(typeof id==='object'){
					return id;
				}
			}
		}
	};
	function getFileList(id,callback){
		let objeto, attrib, filelist;
		let tag,tagf;
		if(id!=undefined){
			if(typeof id==='string'){
				objeto=document.querySelector(id);
				if(objeto){
					console.log("FILTRO1");
					tag=objeto.tagName;
					tagf=tag.toLowerCase();
					if(tagf=='input'){
						console.log("FILTRO2");
						attrib=objeto.getAttribute("type");
						if(attrib!=null || attrib!=undefined || attrib!=''){
							console.log("FILTRO2.5 " + attrib);	
							if(attrib=='file'){
								console.log("FILTRO3");
								fileList = objeto.files;
								callback(fileList);
							}
						}
					}
				}
			}
		}
	};
	function getelems(tag){
		let arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			console.log("TIPO" + obj.type);
			if(obj.type=="checkbox"){
				if(obj.checked==true){
					valor=true;
				}
				else{
					valor=false;
				}
			}
			else{
				valor=obj.value;
			}
        }
        else{
        	if(obj.type=="file"){
        		valor=obj.files[0];
        	}
        	else{
        		valor=obj.options[obj.selectedIndex].value;
        	}
        }
        return valor;
   };
   function setval(objval,value){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
	};
	function version(){
		return "0.0.1";
	};
	function getCssElements(el){
		if(el instanceof HTMLElement){
			return [el];
		}
		else if(typeof el === 'string'){
			return document.querySelectorAll(el);
		}
		return [];
	};
	function child_(domel_,number){
      	let objeto;
      	let valaux;
      	let numint;
      	let children;
      	let childfin;
      	let intquery=domel_;
      	objeto=getelem(intquery);
      	if(typeof number==='number'){
      		if(typeof objeto==='object'){
	      		if(objeto.children!=undefined){
	      			numint=parseInt(number);
	      			children=objeto.children;
	      			childfin=children[numint-1];
					setValAux_(childfin);
	      			return this;
				}
			}
		}
		return this;
	};
	function debugvar_(varinter){
		if(varinter != undefined || varinter != null || varinter.length > 0 || varinter != ''){
			return varinter;
		}
		else{
			return -1;
		}
	};
	function setValAux_(valor){
		this.elemaux=valor;
		return 0;
	};
	function getValAux_(){
		console.log("ELEMAUX +" + this.elemaux);
		return this.elemaux;
	};
	function emptyValAux_(){
		this.elemaux=null;
		return 0;
	};
	function setChildrenAux_(valor){
		this.childrenaux=valor;
		return 0;
	};
	function getChildrenAux_(){
		console.log("CHILDRENAUX +" + this.childrenaux);
		return this.childrenaux;
	};
	function emptyChildrenAux_(){
		this.childrenaux=null;
		return 0;
	};
	function setParentAux_(valor){
		this.parentaux=valor;
		return 0;
	};
	function getParentAux_(){
		console.log("PARENTAUX +" + this.parentaux);
		return this.parentaux;
	};
	function emptyParentAux_(){
		this.parentaux=null;
		return 0;
	};
	setError.prototype = Object.create(Error.prototype);
	//here wuould go public functions
	//...................
	return function(domel="html"){
		return{
			getThis: function(){
				return this;
			},
			getEl: function(){
				let element;
				element=getelem(domel);
				return element;
			},
			getEls: function(){
				let arrtags=[];
				arrtags=getelems(domel);
				return arrtags;
			},
			getArgs:function(){
				return arguments;
			},
			getFiles:function(){
				let objeto, tag, tagf, attrib;
				objeto=getelem(domel);
				tag=objeto.tagName;
				tagf=tag.toLowerCase();
				if(tagf=='input'){
					attrib=objeto.getAttribute("type");
					if(attrib!=null || attrib!=undefined || attrib!=''){
						if(attrib==='file'){
							fileList = objeto.files;
							return fileList;
						}
					}
				}
				return this;
			},
			hide: function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="none";
				}
				return this;
			},
			height: function(){
				let domelement;
				domelement=getelem(domel);
				return parseFloat(getComputedStyle(domelement, null).height.replace("px", ""));
			},
			show:function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="block";
				}
				return this;
			},
			animate:function(){
				let infiniteBool=0;
				let speedanim=0;
				let bit;
				//write code below
				//define arguments to work with
				el=getelem(domel);
				animationStr="";
				animationName=arguments[0];
				bit=arguments[1];
				if(bit<=1){
					infiniteBool=parseInt(arguments[1]);
				}
				else{
					speedanim=parseInt(arguments[1]);
				}
				callbackFunc=arguments[2];
				animpreffix="";
				animpreffix=getAnimationEvent();
				el.addEventListener(animpreffix,function(){
					if(infiniteBool==true){
						glog("INFINITO");
						el.classList.remove('infinite');
					}
					el.classList.remove(animationName);
					el.classList.remove('animated');
					if(animationName=='fadeOut'){
						el.style.opacity=0;
					}
					if(animationName=='fadeIn'){
						el.style.opacity=1;
					}
					callbackFunc();
				});
				//call animateCss function
				el.classList.add('animated');
				el.classList.add(animationName);
				if(infiniteBool==true){
					glog("INFINITO");
					el.classList.add('infinite');
				}
				else{
					setAnimationDuration(el,speedanim);
				}
				return this;
			},
			find:function(selector,callbackfind){
				// Final found elements
				let found_elements = [];
				let i;
				// Find all the outer matched elements
				let outers = getelem(domel);
				for(i=0;i<outers.length;i++){
					let elements_in_outer=outers[i].querySelectorAll(selector);
					// document.querySelectorAll() returns an "array-like" collection of elements
				// convert this "array-like" collection to an array
					elements_in_outer=Array.prototype.slice.call(elements_in_outer);
					found_elements=found_elements.concat(elements_in_outer);
				}
				// The final 4 elements
				if(found_elements.length>0){
					glog(found_elements);
					callbackfind(found_elements);
				}
				return this;
		   },
			each:function(callbackeach){
		      	let objeto;
		      	let x,y,valor,indice;
		      	objeto=getelems(domel);
		        genrl.each(objeto,callbackeach);
		        return this;
	      	},
			trigger:function(evtname){
		      	let objeto;
		      	objeto=getelem(domel);
				let event = document.createEvent('HTMLEvents');
				event.initEvent(evtname, true, false);
				objeto.dispatchEvent(event);
				return this;
			},
			empty:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.innerHTML='';
		        return this;
			},
			emptyVal:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.value='';
		        return this;
			},
			prop:function(property){
		      	//busca dentro del objeto y devuelve solo la primera acepcion
				let obj;
				//Llama a funcion interna prop(domel,prper)
				obj=prop_(domel,property);
				if(is.isObject(obj)){
					return obj;
				}
				return this;
			},
			wrap:function(){
		      	let objeto;
		      	let content;
		      	objeto=getelem(domel);
		      	content=document.createElement('div');
		      	content.class="wrap";
		      	content.name="wrap";
		      	content.id="wrap";
				wrap(objeto, content);
				return this;
			},
			wrapAll:function(){
				let wrapper = document.createElement('div');
				let objeto=getelems(domel);
				objeto[0].before(wrapper);
				elements.forEach(function(element) {
				    wrapper.append(element);
				});
				return this;
			},
			unwrap:function(docunw){
		      	let objeto;
		      	objeto=getelem(docunw);
				// get the element's parent node
				let parent = objeto.parentNode;
				// move all children out of the element
				while (objeto.firstChild) parent.insertBefore(objeto.firstChild, objeto);
				// remove the empty element
				parent.removeChild(objeto);
				return this;
			},
			html:function(){
		      	let objeto;
		      	let objetohtml=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined || args[0]!=null){
					if(args[0]!=''){
				  		string=args[0];
				  		objetohtml.innerHTML = string;
				  		return this;
					}
					else{
						return objetohtml.innerHTML;
					}
		      	}
				else{
					return objetohtml.innerHTML;					
				}
			},
			text:function(){
		      	let objeto;
		      	let objetotext=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		string=args[0];
		      		objetotext.textContent = string;
					return this;
		      	}
		      	else{
		      		return objeto;
		      	}
			},
			is:function(classElem){
		      	let objeto;
		      	let otroobjeto;
		      	objetois=getelem(domel);
		      	otroobjeto=getelem(classElem);
		      	if(objetois === otherEl){
					return 0;
		      	}
				return this;
			},
			prev:function(){
		      	let objeto;
		      	let nextsib;
		      	objetoprev=getelem(domel);
		      	prevsib=objetoprev.previousElementSibling;
				if(prevsib){
					return prevsib;
				}
				else{
					return this;
				}
			},
			next:function(){
		      	let objeto;
		      	let nextsib;
		      	objetonext=getelem(domel);
		      	nextsib=objetonext.nextElementSibling;
				if(nextsib){
					return nextsib;
				}
				else{
					return this;
				}
			},
			remove:function(){
				let elem = document.getElementById(domel);
				elem.parentNode.removeChild(elem);
		      	return this;
			},
			replaceWith:function(string){
		      	let objetorep;
		      	objetorep=getelem(domel);
		      	objetorep.outerHTML = string;
		      	return this;
			},
			matches:function(selector){
		      	let objetomat;
		      	let otroobjetomat;
		      	objetomat=getelem(domel);
		      	otroobjetomat=getelem(classElem);
		      	if(objetomat === otroobjetomat){
					return 0;
		      	}
				return this;
			},
			filter:function(filterFn){
		      	let objetofilter;
		      	objetofilter=getelem(domel);
		      	if(typeof filterFn==='function'){
		      		Array.prototype.filter.call(objetofilter,filterFn);
		      	}
		      	return this;
			},
			has:function(strquery){
		      	let objetohas;
		      	let intqueryhas=domel + ":has " + strquery;
		      	objetohas=getelem(intqueryhas);
		      	if(typeof strquery==='string'){
		      		if(typeof objetohas==='object'){
		      			return this;
		      		}
		      	}
			},
			getChild:function(number){
				if(child_(domel,number)){
					let childelem=child_(domel,number);
					return childelem;
				}
				return this;
			},
			child:function(number){
				if(child_(domel,number)){
					let childelem=child_(domel,number);
					return this;
				}
				return this;
			},
			closest:function(strelem){
				let objetoclo;
				objetoclo=getelem(domel);
				if(typeof strelem==='string'){
					return objetoclo.closest(strelem);
	  			}
	  			return this;
	  		},
	  		siblings:function(){
	  			let objetosib;
	  			objetosib=getelem(domel);
	  			Array.prototype.filter.call(objetosib.parentNode.children, function(child){
					return child !== objetosib;
				});
				return this;
	  		},
			offset:function(){
				let objetooff;
				let par;
				let rect;
				let result;
				objetooff=getelem(domel);
				rect = objetooff.getBoundingClientRect();
				result={
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				};
				return result;
	  		},
	  		scrollLeft:function(){
	  			let objetoscr;
	  			let par;
	  			let rect;
	  			let result;
	  			objetoscr=getelem(domel);
	  			rect = objetoscr.getBoundingClientRect();
	  			if(arguments.length<1){
	  				let valor=rect.left;
	  				return valor;
	  			}
	  			else{
	  				let valor=rect.left + arguments[0];
	  				objetoscr.style.transition="transform 3s linear 1s";
					objetoscr.style.transform="translateX(" + valor + "px)";
	  				return this;
	  			}
	  		},
			scrollTop:function(){
		    	let objetoscrt;
		      	let par;
		      	let rect;
		      	let result;
		      	objetoscrt=getelem(domel);
		      	rect = objetoscrt.getBoundingClientRect();

		      	if(arguments.length<1){
		      		let valor=rect.top;
		      		return valor;
		      	}
		      	else{
		      		let valor=rect.top + arguments[0];
		      		objetoscrt.style.transition="transform 3s linear 1s";
		      		objetoscrt.style.transform="translateY(" + valor + "px)";
					return this;
				}
			},
			offsetParent:function(){
			  	let objetooffp;
			  	let par;
			  	let rect;
			  	let result;
			  	objetooffp=getelem(domel);
			  	result=objetooffp.offsetParent || objetooffp;
				return this;
			},
			parent:function(){
				let objetopar;
				objetopar=getelem(domel);
				return objetopar.parentNode;
			},
			position:function(){
		      	let objetopos;
		      	let result;
		      	objetopos=getelem(domel);
		      	result={left:objetopos.offsetLeft,top:objetopos.offsetTop};
				return result;
			},
			outerHeight:function(){
		      	let objeto;
		      	let result;
		      	let objetooh=getelem(domel);
			    let height=objetooh.offsetHeight;
		    	let style=getComputedStyle(objetooh);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  		height+=parseInt(style.marginTop) + parseInt(style.marginBottom);
					  		return height;
		      		}
		      		else{
		      			return objetooh.offsetHeight;
		      		}
		      	}
		      	else{
		      		return objetooh.offsetHeight;
		      	}
			},
			outerWidth:function(){
		      	let result;
		      	let objetoow=getelem(domel);
			    let height=objeto.offsetWidth;
			    let style=getComputedStyle(objeto);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
					  return width;
		      		}
		      		else{
		      			return objetoow.offsetWidth;
		      		}
		      	}
		      	else{
		      		return objetoow.offsetHeight;
		      	}
			},
			after:function(htmlstr){
		      	//write code below...
		      	let objaf;
		      	objaf=getelem(domel);
				objaf.insertAdjacentHTML('afterend', htmlstr);
				return this;
			},
			before:function(htmlstr){
		      	//write code below...
		      	let objbef;
		      	objbef=getelem(domel);
				objbef.insertAdjacentHTML('beforebegin', htmlstr);
				return this;
			},
			append:function(html){
		      	//write code below...
		      	let objappe;
		      	let elChild = document.createElement('div');
				objappe=getelem(domel);
				elChild.innerHTML=html;
				objappe.appendChild(elChild);
				return this;
			},
			prepend:function(html){
		      	//write code below...
		      	let objprep;
		      	objprep=getelem(domel);
				objprep.insertAdjacentHTML('afterend', html);
				return this;
			},
			clone:function(){
		      	//write code below...
		      	let objclo;
		      	objclo=getelem(domel);
		      	objclo.cloneNode(true);
		      	return this;
			},
			children:function(){
		      	//write code below...
		      	let objcld;
		      	objcld=getelem(domel);
				if(objcld.children!=undefined){
					setChildrenAux_(objcld.children);
					return objcld.children;
				}
				return this;
			},
			first:function(){
		      	//write code below...
		      	let objfrs;
		      	let numeqch;
		      	objfrs=getelem(domel);
				numeqch=objfrs.children[0];
				if(numeqch){
					return numeqch;
				}
				return this;
			},
			last:function(){
		      	//write code below...
		      	let objlst;
		      	let numeqch;
		      	objlst=getelem(domel);
				numeqch=objlst.slice(-1);
				if(numeqch){
					return numeqch;
				}
				return this;
			},
			index:function(){
				let elm=getelem(domel);
				let c = elm.parentNode.children;
				let i=0;
				for(; i < c.length; i++ ){
					if( c[i] == elm ){
						return i;
					}
				}
				return this;
			},
			hasClass:function(classElem){
		      	let objetohasc;
		      	objetohasc=getelem(domel);
		      	if(objetohasc.classList.contains(classElem)){
					return this;
		      	}
			},
			addClass:function(classele){
		      	//write code below...
		      	let obj;let stringclass;let stringarr;let i;
				stringclass="";
				stringclass=classele;
		      	obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.add(stringarr[i]);
					}
				}
				else{
					obj.classList.add(classele);
				}
				return this;
			},
			removeClass:function(classele){
		      	//write code below...
				let obj; let stringclass; let stringarr; stringclass="";let i;
				stringclass=classele;
	  			obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.remove(stringarr[i]);
					}
				}
				else{
					obj.classList.remove(classele);
				}
				return this;
			},
			addAttrb:function(attr,value){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.setAttribute(attr,value);
						break;
		      	}
		      	return this;
			},
			getAttrb:function(attr){
				//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	let result;
		      	result=Array;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'id':
						obj=getelem(domel);
						result[i]=obj.getAttribute(attr);
						return result;
						break;
		      	}
				return this;
			},
			rmAttrb:function(attr){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.removeAttribute(attr);
						break;
		      	}
		      	return this;
			},
			data:function(attr){
			  	//write code below...
			  	let obj;
			  	let i;
			  	let value;
			  	obj=getelems(domel);
			  	if(arguments.length<2){
					for(i=0;i<obj.length;i++){
						result[i]=obj[i].getAttribute(attr);
					}
					return result;
			  	}
			  	else{
			  		value=arguments[1];
					for(i=0;i<obj.length;i++){
						obj[i].setAttribute(attr,value);
					}
					result=0;
			  	}
				return this;
			},
			toggleClass:function(classele){
			  	//write code below...
			  	let obj;
			  	obj=getelem(domel);
			  	obj.classList.toggle(classele);
			  	return this;
			},
			cursor:function(estilo){
		        let fila;
		      	switch(estilo){
		      		case 'auto':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'pointer':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'wait':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'text':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'initial':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'inherit':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'none':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
	      		}
	      		return this;
	      	},
	      	toggleDisplay: function(){
	        	let fila;
	            if (!document.getElementById){
	                return false;
	            }
	            fila=getelem(domel);
	            if(fila.style.display != "none"){
	              fila.style.display = "none";
	            }
	            else{
	              fila.style.display = "";
	            }
	            return this;
	        },
	        resetText: function(){
	          	let textcontent;
	          	textcontent=getelem(domel);
	          	textcontent.value='';
				return this;
	        },
	        val: function(){
	            let valor;
	            let args;
	            args=arguments;
	            if(args[0]==undefined){
	                valor=valobj(domel);
	                return valor;
	            }
	            else{
	            	setval(domel,args[0]);
	            }
	            return this;
	        },
	        version: function(){
	            glog(version());
	            return this;
	        },
	        intval: function(){
				let number;
				valor=valobj(domel);
				return parseInt(valor);
	        },
	        floatval: function(){
	        	let number;
				valor=valobj(domel);
				return parseFloat(valor);
	        },
		    gotodiv: function(){
		        let objeto;
		        objeto=getelem(domel);
		        objeto.scrollIntoView();
		        return this;
		    },
			smooth: function(target, options){
			    let start = window.pageYOffset,
			        opt={
			            duration: options.duration,
			            offset: options.offset || 0,
			            callback: options.callback,
			            easing: easeInOutQuad
			        },
			        distance = typeof target === 'string'
			            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
			            : target,
			        duration = typeof opt.duration === 'function'
			            ? opt.duration(distance)
			            : opt.duration,
			        timeStart, timeElapsed;
			    requestAnimationFrame(function(time){ timeStart = time; loop(time); });
			    function loop(time){
			        timeElapsed = time - timeStart;
			        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
			        if (timeElapsed < duration){
			        	requestAnimationFrame(loop)
			        }
			        else{
			        	end();
			        }
			    }
			    function end(){
			        window.scrollTo(0, start + distance);
			        if (typeof opt.callback==='function'){
			        	opt.callback();
			        }
			    }
			    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
			    function easeInOutQuad(t, b, c, d)  {
			        t /= d / 2
			        if(t < 1) return c / 2 * t * t + b
			        t--
			        return -c / 2 * (t * (t - 2) - 1) + b
			    }
			    return this;
			},
			submit:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onsubmit=function(){
		        	callbackfunc();
		        }
		        return this;
			},
	        click:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onclick=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        dblClick:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.ondblclick=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        keyup:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onkeyup=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        keydown:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onkeydown=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	change:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onchange=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	blur:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onblur=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
			not:function(ignomename){
				let control=getelems(domel + ':not(' + ignomename + ')');
				if(control!=undefined){
					return this;
				}
			},
			bind:function(fn,context){
				if(typeof fn==='function'){
					fn.bind(context);
				}
				return this;
			},
			trigger:function(el, eventName, options){
				let event;
				if (window.CustomEvent) {
					event = new CustomEvent(eventName, options);
				}
				else{
					event = document.createEvent(eventName);
					event.initCustomEvent(eventName, true, true, options);
				}
				el.dispatchEvent(event);
				return this;
			},
			on:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,callback);
				return this;
			},
			one:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,function(){
					control.removeEventListener(eventoCall,callback);
				});
				return this;
		    },
			off:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.removeEventListener(eventoCall,callback);
				return this;
			},
			get: function(stylesStr){
				let result;
				let aux,i;
				let objelem=getelem(domel);
				let style=window.getComputedStyle ? getComputedStyle(objelem,null) : objelem.currentStyle;
				result={};
				if(!Array.isArray(stylesStr)){
					aux=style[stylesStr];
					result[stylesStr]=aux;
				}
				else{
					let objeto=stylesStr;
					let indi;
					for(i=0;i<2;i++){
						indi=stylesStr[i];
						aux=style[indi];
						result[indi]=aux;
					}
				}
				return result;
			},
			set: function(styles){
				let elems;
				let i;
				if (typeof styles !== 'object') {
					throw new Error('Second parameter of this function should be an object');
				}
				elems=getCssElements(domel);
				if(elems.length === 0) {
					return false;
				}
				else{
					elems.forEach(function(elem) {
						for (let i in styles) {
							if (styles.hasOwnProperty(i)) {
								elem.style[i] = styles[i];
							}
						}
					});
				}
				return this;
			},
			extend:function(callback){
				//extiende las funcionalidades de la librería mediante la función interna extend
				genrl.fn.extend(g,callback);
			},
			css: function(style){
				//Hacer callback un argumento opcional
				let callbackCall;
				let callbackAux;
				let response;
				let dominter;
				let valaux;
				let valchildren;
				let valparent;
				let domelint;
				let objfinal=[{}];

				valaux=getValAux_();
				valchildren=getChildrenAux_();
				valparent=getParentAux_();
				//Identificar que el callback es uuna finción
				if(typeof arguments[1]==='function'){
					callbackCall=arguments[1];
					genrl.log("ES UNA FUNCION");
				}
				if(debugvar_(valaux)){
					domelint=valaux;
					genrl.log(domelint);
				}
				else{
					if(debugvar_(valchildren)){
						domelint=valchildren;
					}
					else{
						if(debugvar_(valparent)){
							domelint=valparent;
						}
					}
				}
				if(typeof style==='object'){
					genrl.log("ES UN OBJETO");
					if(Array.isArray(domelint)){
						if(style.length==undefined){
							genrl.log("CONFIRMADO OBJETO");
						}
						else{
							genrl.log("CONFIRMADO ARRAY");
							genrl.log(style);
							let max=parseInt(style.length);
							for(i=0;i<=max;i++){
								aux=style[i];
								aux_=g(domel).get(aux);
								if(aux_[aux]!=undefined){
									objfinal[aux]=aux_[aux];
								}
							}
							objfinal.length=i;
							return objfinal;
						}
						if(style.length>0){
							genrl.warn("ARRAY Cond 1");
							try{
								g(domel).set(style);
								return this;
							}
							catch(e){
								genrl.log("ERROR TRY CATCH 1");
								genrl.log(e);
							}
						}
					}
				}
				else{
					genrl.warn("STRING Cond 2");
					if(typeof style==='string'){
						genrl.log("Es un string");
						return g(domel).get(style);
					}
				}
				if(typeof callbackCall==='function'){
					callbackCall();
				}
				return this;
			},
		}
	}
}(window));
g.__proto__.getelem=function(id){
	let objeto;
	if(typeof id==='string'){
		objeto=document.querySelector(id);
		if(typeof objeto==='object'){
			return objeto;
		}
	}
};
g.__proto__.getelems=function(tag){
	let arrtags=[];
	if(tag!=undefined){
		arrtags=document.querySelectorAll(tag);
		return arrtags;
	}
	else{
		return -1;
	}
};
module.exports=g;
