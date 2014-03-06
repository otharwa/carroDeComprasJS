/*
Crear Dom con seteos
====================
*** Errores conocidos: 
	- No esta especificado el caso de <input type='radius' />
	- Dificil acceso a los value de los input
	- 

Los unicos parametros fuera de los estandares son, "objetoId"  "etiqueta" y "list"

*** Ejemplo de modo de uso 1:

var elemnt = cDom(
[
	{objetoId:'tilde', etiqueta:'input', type: 'checkbox', name:'cualquiera'},
	{objetoId:'contenedorGeneral', etiqueta:'div'},
	{objetoId:'campoNombre', etiqueta:'input', name:'nombre1'},
	{objetoId:'pais1', etiqueta:'select', name:'pais1', id:'pais1', list:['Argentia','Chile','Uruguay','Otro']}
]
);

elemnt.contenedorGeneral.onclick = function(){alert('Hola Mundo')}

**** Ejemplo de modo de uso 2: Se pueden empujar los elementos a un objeto ya existente especificandolo en el segundo parametro

cDom(
[
	{objetoId:'tildeNueva', etiqueta:'input', type: 'checkbox', name:'cualquiera'},
	{objetoId:'contenedorGeneralNuevo', etiqueta:'div'},
],
objetoConDomsAnteriores
);
 
*/
function cDom(etiquetas, elementFromPush_){ 
//Entran etiquetas salen DOMs (Elementos de html)

	var doms = {};
	var retorno = true;
	
	for(var i=0; i < etiquetas.length; i++){
		var objetoId = etiquetas[i].objetoId;
		
		doms[objetoId] = document.createElement( etiquetas[i].etiqueta );
		
		if(etiquetas[i].id) doms[objetoId].setAttribute('id',etiquetas[i].id);
		if(etiquetas[i].class) doms[objetoId].setAttribute('class',etiquetas[i].class);
		if(etiquetas[i].name) doms[objetoId].setAttribute('name',etiquetas[i].name);
		if(etiquetas[i].value) doms[objetoId].setAttribute('value',etiquetas[i].value);
		if(etiquetas[i].src) doms[objetoId].setAttribute('src',etiquetas[i].src);
		if(etiquetas[i].alt) doms[objetoId].setAttribute('alt',etiquetas[i].alt);
		if(etiquetas[i].method) doms[objetoId].setAttribute('method',etiquetas[i].method);
		if(etiquetas[i].action) doms[objetoId].setAttribute('action',etiquetas[i].action);
		if(etiquetas[i].for) doms[objetoId].setAttribute('for',etiquetas[i].for);
		if(etiquetas[i].cols) doms[objetoId].setAttribute('cols',etiquetas[i].cols);
		if(etiquetas[i].rows) doms[objetoId].setAttribute('rows',etiquetas[i].rows);
		
		if(etiquetas[i].type && etiquetas[i].etiqueta == 'input' ) doms[objetoId].setAttribute('type',etiquetas[i].type);
		
//Solo para los campos input, select y textarea

		if(etiquetas[i].etiqueta == 'input' || etiquetas[i].etiqueta == 'select' || etiquetas[i].etiqueta == 'textarea') {
			var etiquetaLabel = document.createElement('label');
			etiquetaLabel.setAttribute('name',etiquetas[i].name);
			
			var texto = document.createTextNode(etiquetas[i].texto);
			
			//Segun el orden, el texto quedara a la DERECHA o a la IZQUIERDA del elemento
			//en caso de usar doms[objetoId].childNodes[0] tambien se altera la posicion en este caso el texto esta en posicion 0
			
			etiquetaLabel.appendChild(texto);
			etiquetaLabel.appendChild(doms[objetoId]);
			
			doms[objetoId] = etiquetaLabel;
		}
	
//Si la etiqueta es Select, cargar los elementos option

		else if(etiquetas[i].etiqueta == 'select'){
			for(var j=0; j < etiquetas[i].list.length; j++){
				var option = document.createElement('option');
				option.setAttribute('value',etiquetas[i].list[j]);
				
				doms[objetoId].appendChild(option);
			}
		}
	
//Si tiene texto para insertar

		if(etiquetas[i].texto && etiquetas[i].etiqueta != 'input' && etiquetas[i].etiqueta != 'select' && etiquetas[i].etiqueta != 'textarea') {
			var texto = document.createTextNode(etiquetas[i].texto);
			doms[objetoId].appendChild(texto);
		}
		
		if(elementFromPush_) {
			elementFromPush_.push(doms[objetoId]);
			retorno = false;
		}
	}

	if(retorno) return doms;
}

/*
Cargar estilos a los elementos
==============================

Se puede ingresar un elemento individual, un Array, u Objeto

*** Ejemplo de modo de uso 1:

domStyle(doms.contenedorGeneral, {
	backgroundColor: 'red',
	margin:'5px'
});
*/

function domStyle(elemento, estilo){ 
	if( !isNaN(elemento.length) ){
		for(var a=0; a < elemento.length; a++){
			for(var propiedad in estilo){
				elemento[a].style[propiedad] = estilo[propiedad] ;
			}
		}
	}else if( isNaN(elemento.length) && !isNaN(elemento.localName) ){
		for(var elemt in elemento){
			for(var propiedad in estilo){
				elemento[elemt].style[propiedad] = estilo[propiedad] ;
			}
		}
	}
	else{
		for(var propiedad in estilo){
			elemento.style[propiedad] = estilo[propiedad] ;
		}
	}
}