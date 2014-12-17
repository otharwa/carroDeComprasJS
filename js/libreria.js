/*
Crear Dom con seteos
====================
//Retorno : obj.dom

*** Errores conocidos: 
	- No esta especificado el caso de <input type='radius' />
	- Dificil acceso a los value de los input
	- Floja documentacion

Los unicos parametros fuera de los estandares son, "objetoId"  "etiqueta"  "list" y "texto"

*** Ejemplo de modo de uso 1:

var elemnt = cDom(
[
	{objetoId:'tilde', etiqueta:'input', type: 'checkbox', name:'cualquiera'},
	{objetoId:'contenedorGeneral', etiqueta:'div'},
	{objetoId:'campoNombre', etiqueta:'input', name:'nombre1'},
	{objetoId:'pais1', etiqueta:'select', name:'pais1', id:'pais1', list:['Argentia','Chile','Uruguay','Otro']}
]
);

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
//Todos estos if se pueden reemplazar con arguments (+ una lista de etiquetas admitidas )o con un Switch case
		for(var atributo in etiquetas[i] ){
			switch(atributo){
				case 'objetoId': break;
				case 'etiqueta': break;
				case 'onclick': break;
				//case 'name': break;
				case 'list': 
					if(etiquetas[i].etiqueta == 'select' && doms[objetoId].nodeName == 'LABEL'){
						for(var j=0; j < etiquetas[i].list.length; j++){
							option = document.createElement('option');
							option.setAttribute('value',etiquetas[i].list[j] );
							textOption = document.createTextNode( etiquetas[i].list[j] );
							
							option.appendChild(textOption);
							doms[objetoId].getElementsByTagName('select')[0].appendChild(option);
						}
					}
					break;
				case 'texto':
					if(etiquetas[i].etiqueta == 'input' || etiquetas[i].etiqueta == 'select' || etiquetas[i].etiqueta == 'textarea') {
						etiquetaLabel = document.createElement('label');
						etiquetaLabel.setAttribute('name',etiquetas[i].name);
						
						texto = document.createTextNode(etiquetas[i].texto);
						
						//Segun el orden, el texto quedara a la DERECHA o a la IZQUIERDA del elemento
						//en caso de usar doms[objetoId].childNodes[0] tambien se altera la posicion en este caso el texto esta en posicion 0
						etiquetaLabel.appendChild(texto);
						etiquetaLabel.appendChild(doms[objetoId]);
						
						doms[objetoId] = etiquetaLabel;
					}
					else {
						texto = document.createTextNode(etiquetas[i].texto);
						doms[objetoId].appendChild(texto);
					}
					break;
				default:
					if( doms[objetoId].nodeName == 'LABEL' )
						doms[objetoId].childNodes[1].setAttribute(atributo, etiquetas[i][atributo]);
					else
						doms[objetoId].setAttribute(atributo, etiquetas[i][atributo]);

					break;
			}
			
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
