var body = document.body;
body.onload = function () {discografia(0); return false;}

var pagIndex = gEID('index').getElementsByTagName('a')[0];
pagIndex.onclick = function () {discografia('cerrar'); return false; }

var pag0 = gEID('discos').getElementsByTagName('a')[0];
pag0.onclick = function () { return false; }

var pag1 = gEID('discos').getElementsByTagName('a')[1];
pag1.onclick = function () {discografia(0); return false;}

var pag2 = gEID('discos').getElementsByTagName('a')[2];
pag2.onclick = function () {discografia(1); return false;}

var pag3 = gEID('discos').getElementsByTagName('a')[3];
pag3.onclick = function () {discografia(2); return false;}

var boton_carro = gEID('boton_carro').getElementsByTagName('a')[0];
carrito.abrir = true;
boton_carro.onclick = carrito;

function cE(elemento) {return document.createElement(elemento);}
function gEID(elemento) {return document.getElementById(elemento);}
function cleanCaja(){ 
	contenido = document.body.childNodes[3].childNodes[1];
	if( contenido != undefined )
		document.body.childNodes[3].removeChild( contenido ); 

	return false; }


/*
# Nota para una mejor lectura del codigo
La construcion se fue realizando de abajo (la ultima funcion) hacia arriba (la primer funcion)
Si algo se ve fuera de contexto al principio es porque sirve mas a bajo durante la funcion probablemente en alguna sugunda alternativa
Administracion del tiempo:
3hs 8 dias
total: 21hs + correccion de horrores esteticos (500años de eternidad)
*/

/*
ToDo
	
	hacer fundido de descripcion de los discos
	
	ventana modal para el carrito de compras (ya que tengo que agregar la etiqueta form usarla como cuadro contendor)
		//es una padata en las bolas cambiar la estructura de los divs... tene quidado y hace backup 
		
	agregar datos visuales permanentes para el comprador (hoja en la que esta, cantidad de discos, subtotal)
	
	hacer parte de cheout (compra efectuada con resumen, ingreso de datos, y pago de la compra... con posibilidad de cancelar para seguir agregando)
		hacer que se bloquee el agregado de items durante el checkout (una variable y listo 0, 1)
	
	codigo feo y asqueroso, cuando lo empeze a escribir no conosia POO y no almacenaba los objetos en arrays


Hoo!!! Por dios, porque no tengo una funcion para el desvanecer cajas.	
*/

function subtotal(view){
	//Uso : subtotal();
	//Valores recividos : true, false
	//Default: true
	//Retorno : true -> false, imprime en pantalla - false -> valor number, costo 
	costo=parseFloat(0);
	unidades=parseInt(0);

	for(var i in discos){
		if(discos[i].estado == 1){ // esta activo ?
				costo = costo + parseFloat(discos[i].precio * discos[i].cantidad);
				unidades = parseInt(unidades + discos[i].cantidad);
		}
	}

	if( view != false ){
		//Escribir en pantalla
		subtotalD = document.getElementById('subtotal');
		subtotalD = subtotalD.getElementsByTagName('span')[0];
		subtotalD.innerHTML = costo;

		dicostotal = document.getElementById('dicostotal');
		dicostotal = dicostotal.getElementsByTagName('span')[0];
		dicostotal.innerHTML = unidades;

		return false;
	}
	else{
		return costo;
	}
}

// Cambiar el nombre de la seccion
function titulo( seccion, this_ ){
	seccion = new String(seccion);
	// Cambiar div "Actual :"
	ruta = document.getElementById('ruta');
	ruta = ruta.getElementsByTagName('span')[0];
	ruta.innerHTML = seccion;

	// Cambiar etiqueta <title>
	title = document.getElementsByTagName('title')[0];
	text = title.innerHTML;
	text = text.split(' \|');
	text[0] = seccion;
	title.innerHTML = text.join(' \|');
	
	//cleanCaja();
	return false;
}

//generador automatico de pasos para la seccion de Carrito
function navegacion(posActual){
	//Uso : navegacion(n);
	//Valores recividos : int > 0
	//Valores almacenados en : var posActual
	//Retorno :  objeto DOM para ser insertado donde corresponda
	var priv = {
		pasos:[
			{nombre: 'Estado', funcion: function(){ if( validacion_status == false ) console.log('boton sin funcion'); return false; } },
			{nombre: 'Datos de Compra', funcion: function(){ if( validacion_status == false ) {carrito.abrir = true; carrito(); } return false; } },
			{nombre: 'Finalizado!', funcion: function(){ if( validacion_status == false ) compra_finalizada(); return false; } }
		],
		dom:[],
		div:false,
		cambiarA:function(posActual){
			
			if(! (posActual >= 0)) { posActual = 0; }
			if( posActual == 0 ){ 
				posAnt = 0; 
				posSig = 1; 
			}
			else if( posActual >= ( priv.pasos.length - 1 ) ){ 
				posAnt = posActual - 1; 
				posSig = posActual; 
			}
			else {
				posAnt = posActual-1; 
				posSig = posActual+1; 
			}
				
			priv.div = cE('div');
			priv.div.setAttribute('id','pasosRestantes');
//Botones Atras y Siguiente
			var botones = cDom([
				{objetoId:'aAtras', etiqueta: 'a', href: '#', class: "atras", title: 'Paso Anterior' },
				{objetoId:'aSiguiente', etiqueta: 'a', href: '#', class: "siguiente", title: 'Paso Siguiente' },
				{objetoId:'div', etiqueta: 'div'}
			]);
			botones.aAtras.onclick = priv.pasos[posAnt].funcion;
			botones.aSiguiente.onclick = priv.pasos[posSig].funcion;

			botones.div.appendChild(botones.aAtras);
			botones.div.appendChild(botones.aSiguiente);
			priv.div.appendChild(botones.div);

//Indicativos de pasos
			var restantesDOM = cDom([
				{objetoId:'div', etiqueta:'div', id:'pasosRest'},
				{objetoId:'ulNumeros', etiqueta:'ul', id:'numeros'}
			]);
			restantesDOM.div.appendChild(restantesDOM.ulNumeros);
			priv.div.appendChild(restantesDOM.div);

//levanta datos desde el array priv.pasos
			for(var i=1; i<= priv.pasos.length ; i++){
				Li = cE('li');
				Num = cE('b');
				Txt = cE('span');
				var numero = document.createTextNode(i);
				var texto = document.createTextNode(priv.pasos[i-1].nombre);
									
				if(i == posActual) Num.setAttribute('class','aqui');
				
				Num.appendChild(numero);
				Txt.appendChild(texto);
				Li.appendChild(Num);
				Li.appendChild(Txt);
				restantesDOM.ulNumeros.appendChild(Li);
			}
		}
	};
	priv.cambiarA(posActual);
	
	return priv.div;
}//fin - function navegacion


function compra_finalizada(){
	titulo('Compra Finalizada');

	form = document.getElementById('detalleCompra');
	form = form.getElementsByTagName('form')[0];

	//borrar todo el contenido
	form.innerHTML = " "; 

	txtContn = document.createElement('div');
	texto = document.createTextNode('Gracias por su compra');

	domStyle(txtContn, {
		padding:'40px 0'
	});

	txtContn.appendChild(texto);
	form.appendChild(txtContn);

	return false; 
}


function realizar_compra() {
	titulo('Confirmar Compra');
	//esta funcion carga el paso 2 de la compra.... luego de que el usuario apreto el boton "efectuar compra"
	//Aqui se carga el CheckOut
	
	
	
	//var detComp = gEID('detalleCompra').getElementsByTagName('form')[0];
	//detComp.removeChild( detComp.getElementsByTagName('table')[0] );
	//detComp.removeChild( detComp.getElementById('botonera_carrito_div') );
	

//Crear DOMs del formulario
	var formulario1 = cDom([
		{objetoId:'div', etiqueta:'div',},
		{objetoId:'titulo', etiqueta:'p', texto:'Datos de Contacto'},
		{objetoId:'fieldset', etiqueta:'fieldset'},
		{objetoId:'nombre', etiqueta:'input', type:'text', name:'nombre1', id:'nombre1', texto:'Nombre', 'data-valid': 'texto'},
		{objetoId:'apellido', etiqueta:'input', type:'text', name:'apellido1', id:'apellido1', texto:'Apellido', 'data-valid': 'texto'},
		{objetoId:'ciudad', etiqueta:'input', type:'text', name:'ciudad1', id:'ciudad1', texto:'Ciudad', 'data-valid': 'texto'},
		{objetoId:'provincia', etiqueta:'input', type:'text', name:'provincia1', id:'provincia1', texto:'Provincia', 'data-valid': 'texto'},
		{objetoId:'pais', etiqueta:'select', name:'pais1', id:'pais1', texto:'Pais', list:['Argentina','Chile','Uruguay','Otro']},
		{objetoId:'direccion', etiqueta:'textarea', name:'direccion1', id:'nombre1', texto:'Direccion',rows:'2', cols:'20', 'data-valid': 'texto'},
		{objetoId:'cp', etiqueta:'input', type:'text', name:'cp1', id:'cp1', texto:'CodigoPostal', 'data-valid': 'cp'},
		{objetoId:'telefono', etiqueta:'input', type:'text', name:'telefono1', id:'telefono1', texto:'Telefono', 'data-valid': 'tel'},
		{objetoId:'email', etiqueta:'input', type:'text', name:'email1', id:'email1', texto:'E-Mail', 'data-valid': 'email'}
	]);
	/*
		Lalala !! Que linda que es la vida cuando las cosas hacen lo que tienen que hacer, 
		y cuando tu codigo te facilita la vida en ves de complicarla.

		Aguante 'data-valid' !!
	*/
	var formulario2 = cDom([
		{objetoId:'div', etiqueta:'div',},
		{objetoId:'titulo', etiqueta:'p', texto:'Datos de Entrega'},
		{objetoId:'tilde', etiqueta:'input', type:'checkbox', name:'tilde', id:'tilde', texto:'¿Los mismos datos que el contacto?'},
		{objetoId:'fieldset', etiqueta:'fieldset'},
		{objetoId:'nombre', etiqueta:'input', type:'text', name:'nombre2', id:'nombre2', texto:'Nombre', 'data-valid': 'texto'},
		{objetoId:'apellido', etiqueta:'input', type:'text', name:'apellido2', id:'apellido2', texto:'Apellido', 'data-valid': 'texto'},
		{objetoId:'ciudad', etiqueta:'input', type:'text', name:'ciudad2', id:'ciudad2', texto:'Ciudad', 'data-valid': 'texto'},
		{objetoId:'provincia', etiqueta:'input', type:'text', name:'provincia2', id:'provincia2', texto:'Provincia', 'data-valid': 'texto'},
		{objetoId:'pais', etiqueta:'select', name:'pais1', id:'pais2', texto:'Pais', list:['Argentina','Chile','Uruguay','Otro']},
		{objetoId:'direccion', etiqueta:'textarea', name:'direccion2', id:'nombre2', texto:'Direccion', rows:'2', cols:'20', 'data-valid': 'texto'},
		{objetoId:'cp', etiqueta:'input', type:'text', name:'cp2', id:'cp2', texto:'CodigoPostal', 'data-valid': 'cp'},
		{objetoId:'telefono', etiqueta:'input', type:'text', name:'telefono2', id:'telefono2', texto:'Telefono', 'data-valid': 'tel'},
		{objetoId:'email', etiqueta:'input', type:'text', name:'email2', id:'email2', texto:'E-Mail', 'data-valid': 'email'}
	]);
	
	var botonSiguiente = cDom([
		{objetoId:'botonSiguiente', etiqueta:'input', type:'submit', value:'Siguiente'}
	]);

//Los nombres de los campos requeridos, deben coincidir con los nombres de los objetos formulario ( objetoId )
	var camposRequeridos = {
		nombre:'texto',
		apellido:'texto',
		ciudad:'texto',
		provincia:'texto',
		direccion:'texto',
		cp:'cp',
		telefono:'tel',
		email:'email'
	};
	
	
	var crearCarro = function(config){
		var botones = [];
		var priv = {
			tabla1:['titulo','cantidad','costo c/u'],
			submitStatus:false,
			formulariosCompletosDOM:[],
			mostrarError:function(this_ , texto){
				var doms = []
				doms[0] = cE('div');
				doms[1] = document.createTextNode( texto );
				var sty = doms[0].style;
				sty.border = "3px solid red";
				sty.borderRadius = "7px";
				sty.backgroundColor = "white";
				sty.color = "black";
				sty.padding = "10px";
				sty.position = "absolute";
				//sty.width = "150px";
				sty.top = "-8px";
				sty.right = "-170px";
				
				this_.appendChild(doms[0]);
				doms[0].appendChild(doms[1]);
				
				priv.submitStatus = false;
				
				this_.style.border = "2px solid red";
				this_.style.borderRadius = "4px";
				
				var tiemp = setTimeout( function(){ 
						priv.ocultar(doms[0]); 
						clearTimeout(tiemp); 
					},3060);
				
				return doms[0];
			},
			ocultar:function( this_ ){
				var op = 0.9;
				var desva = function(){
					op = op-0.1;
					this_.style.opacity = op;
					if(op > 0.1) setTimeout(desva,1);
					else this_.parentNode.removeChild(this_);
				};
				desva();
				priv.submitStatus = true;
			},
			validar:function(this_ , tipoDato){
				
				if( ! isNaN(tipoDato) ) return false;
				if( ! isNaN(this_) ) return false;

				switch(tipoDato){
					case 'texto': check = /[a-zA-Z\á\é\í\ó\ú\ ]?/; 
						break;
					case 'cp': check = /^[0-9]{4}$/; 
						break;
					case 'tel':	check = /^[\d]*(S\/N)?$/;
						break;
					case 'email': check = /^[\w\-\_\.]{3}[a-z0-9A-Z\-\_\.]*[@][\w]{3}[\w\-\_\.]*[\.]?[\w]{2,4}$/;
						break;
				}
				if(! check.test( this_.value ) ){
					var erno = priv.mostrarError(this_.parentNode, "campo invalido");
					validacion_status = true;
				}
				else {
					this_.parentNode.style.border = "none"; 
					validacion_status = false;
				}
			},
			visualizar:function(){
				var form = gEID('detalleCompra').getElementsByTagName('form')[0];
				form.setAttribute('action','#');
				form.setAttribute('method','post');
				form.onsubmit = function(){ return false;};
				form.innerHTML = "";
				
				for(var i=0; i < priv.formulariosCompletosDOM.length ; i++){
						form.appendChild(priv.formulariosCompletosDOM[i]);
				}
				
				var pasos = navegacion(2); 
				form.appendChild(pasos);
			},
			crear:function(){

				//Formulario num 1
				
				priv.formulariosCompletosDOM.push(formulario1.div);
				
				formulario1.div.appendChild(formulario1.titulo);
				formulario1.div.appendChild(formulario1.fieldset);
				
				for(var obj in formulario1){
					if( obj != 'div' && obj != 'titulo' && obj != 'fieldset'){
						formulario1.fieldset.appendChild(formulario1[obj]);
						domStyle(formulario1[obj],{
							border: 'none',
							padding: '2px'});
						
					}	}
				
				//Formulario num 2
				
				priv.formulariosCompletosDOM.push(formulario2.div);
				
				formulario2.div.appendChild(formulario2.titulo);
				formulario2.div.appendChild(formulario2.tilde);
				formulario2.div.appendChild(formulario2.fieldset);
				
				formulario2.tilde.onclick = function(){ 
					if(this.childNodes[1].checked) {
						formulario2.fieldset.style.opacity = 0.5;
						
						for(var obj in formulario2){
							if( obj != 'div' && obj != 'titulo' && obj != 'fieldset' && obj != 'tilde' ){
								var input_ = formulario2[obj].childNodes[1];
								input_.setAttribute('disabled','disabled');
						}	}
					}
					else {
						formulario2.fieldset.style.opacity = 1;
						
						for(var obj in formulario2){
							if( obj != 'div' && obj != 'titulo' && obj != 'fieldset' && obj != 'tilde' ){
								var input_ = formulario2[obj].childNodes[1];
								input_.removeAttribute('disabled');
						}	}
					}
				}
				
				for(var obj in formulario2){
					if( obj != 'div' && obj != 'titulo' && obj != 'fieldset' && obj != 'tilde' ){
						formulario2.fieldset.appendChild(formulario2[obj]);
						domStyle(formulario2[obj],{
							border: 'none',
							padding: '2px'});
							
						/*var this_ = formulario2[obj].childNodes[1];
						var tipo = formulario2[obj].childNodes[1].getAttribute('type');
						formulario2[obj].onchange = function(){ priv.validar(this_, tipo); }*/
					}	}
				
				domStyle([formulario2.fieldset, formulario1.fieldset ],{
					padding: "5px",
					border: "2px solid white",
					borderRadius: "4px",
					textAlign: "left"
				});
				domStyle([formulario2.div, formulario1.div ],{
					width: "350px",
					display: "inline-block",
					margin: "20px"
				});
				domStyle([formulario2.titulo, formulario1.titulo ],{
					textAlign: 'center',
					paddingBottom: '15px'
				});
				
	/* No entiendo que hace esto aca, ni como funciona, pero si lo quito deja de andar la validacion de datos
		Facking code !! :P
	*/
				for(var campo in camposRequeridos){
					//var regla = camposRequeridos[campo];
					
					var campo1 = formulario1[campo].childNodes[1];
					var campo2 = formulario2[campo].childNodes[1];
					//console.log(campo);
					if(formulario1[campo]) 
						campo1.onchange = function(){ regla = this.getAttribute('data-valid'); priv.validar(this,regla ); };
					if(formulario2[campo]) 
						campo2.onchange = function(){ regla = this.getAttribute('data-valid'); priv.validar(this, regla ); };
				}
			}
		};

		var pub = {
			crear:function(){priv.crear()},
			visualizar:function(){priv.visualizar()},
			config:config
		}
		return pub;
	}
	
	var carro = crearCarro();
	carro.crear();
	carro.visualizar();
}

function carrito( accion ){ //Paso 1
	titulo('Carrito');

	//Esta es la parte dinamica del carro de compras, donde el usuario puede ver y modificar sus acciones
	
	//colocar etiqueta form porque estoy usando input <--- y esto que significa ? no me voy a poner a reescribir esta funcion si ya anda
	
	var caja = gEID('caja'); //aca definitivamente no conocia el uso de objetos :( - que embole
	var discografia = gEID('discografia');

	var boton_carroTime =  setTimeout(
			function () {
				var boton_carro_id =  gEID('boton_carro').getElementsByTagName('a')[0];
				var boton_valor = boton_carro_id.getAttribute('id');	
				if (boton_valor == 'abrir' || carrito.abrir == true ) { boton_carro_id.setAttribute('id','cerrar'); carrito.abrir = false; }
				else { boton_carro_id.setAttribute('id','abrir'); carrito.abrir = true; }
				clearTimeout(boton_carroTime);
			}, 25);
	
	var detalleCompra = gEID('detalleCompra');
	//var disco_id2 = this.getAttribute('id');
	disco_id2 = 'abrir'; 
	//if (disco_id2=='abrir' || carrito.abrir == true ) {
	if ( carrito.abrir == true ) {
		
		if (detalleCompra!=undefined) caja.removeChild(detalleCompra);
		
		if (discografia!=undefined) caja.removeChild(discografia);
				
		detalleCompra = cE('div');
		var caja_div = cE('form');
		var elmt_tabla = cE('table');
		var elmt_thead = cE('thead');
		var elmt_th1 = cE('th');
		var elmt_th2 = cE('th');
		var elmt_th3 = cE('th');
		var elmt_th4 = cE('th');
		var elmt_th5 = cE('th');
		var elmt_tbody = cE('tbody');
		
		detalleCompra.setAttribute('id','detalleCompra');
		caja_div.setAttribute('method','post');
		caja_div.setAttribute('action','#');
		caja_div.onsubmit = function(){ return false; }
		
		var elmt_th1_txt = document.createTextNode('Portada');
		var elmt_th2_txt = document.createTextNode('Descripcion');
		var elmt_th3_txt = document.createTextNode('Cantidad');
		var elmt_th4_txt = document.createTextNode('SubTotal');
		var elmt_th5_txt = document.createTextNode('Remover');
		
		elmt_th1.appendChild(elmt_th1_txt);
		elmt_th2.appendChild(elmt_th2_txt);
		elmt_th3.appendChild(elmt_th3_txt);
		elmt_th4.appendChild(elmt_th4_txt);
		elmt_th5.appendChild(elmt_th5_txt);
		
		caja.appendChild(detalleCompra);
		detalleCompra.appendChild(caja_div);
		caja_div.appendChild(elmt_tabla);
		elmt_tabla.appendChild(elmt_thead);
		elmt_thead.appendChild(elmt_th1);
		elmt_thead.appendChild(elmt_th2);
		elmt_thead.appendChild(elmt_th3);
		elmt_thead.appendChild(elmt_th4);
		elmt_thead.appendChild(elmt_th5);
		elmt_tabla.appendChild(elmt_tbody);
		
		for (var i in discos) {
			if (discos[i].estado == 1) {
				
				var elmt_tr = cE('tr');
				var elmt_td1 = cE('td');
				var elmt_td2 = cE('td'); 
				var elmt_td3 = cE('td'); 
				var elmt_td4 = cE('td');
				var elmt_td5 = cE('td');
				var elmt_img = cE('img');
				var elmt_input = cE('input');
				var elmt_a = cE('a');
				var elmt_a_img = cE('img');
			
				elmt_img.setAttribute('src',ruta_tapas+discos[i].imagen);
				elmt_img.setAttribute('alt',discos[i].titulo);
				elmt_input.setAttribute('type','text');
				elmt_input.setAttribute('name','cantidad');
				elmt_input.setAttribute('id','cantidad');
				elmt_input.setAttribute('value',discos[i].cantidad);
				elmt_input.setAttribute('size','2');

				//Click en boton actualizar
				elmt_input.onchange = function(){
					idItem = this.parentNode.parentNode.getElementsByTagName('a')[0].getAttribute('id');
					discos[idItem].cantidad = this.value;

					//actualizar subtotal
					this.parentNode.parentNode.getElementsByTagName('td')[3].innerHTML = '$' + parseFloat(discos[idItem].cantidad * discos[idItem].precio );

					carrito.abrir = null;
					subtotal(true);
					carrito();
				}
				elmt_a.setAttribute('href','#');
				elmt_a.setAttribute('id',i);
				elmt_a_img.setAttribute('src',boton_remover_img);
				elmt_a_img.setAttribute('alt','remover');

				//Click en cruz eliminar
				elmt_a.onclick = function () {
					j = this.getAttribute('id');
					this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
					discos[j].cantidad = 0;
					discos[j].estado = 0;
					return false;
				}
				
				var elmt_td2_txt = document.createTextNode('Descripcion');
				var discoSubTotal = parseFloat( discos[i].cantidad * discos[i].precio );
				discoSubTotal = document.createTextNode('$'+ discoSubTotal); 
				
				elmt_tbody.appendChild(elmt_tr);
				elmt_tr.appendChild(elmt_td1);
				elmt_tr.appendChild(elmt_td2);
				elmt_tr.appendChild(elmt_td3);
				elmt_tr.appendChild(elmt_td4);
				elmt_tr.appendChild(elmt_td5);
				elmt_td1.appendChild(elmt_img);
				elmt_td2.appendChild(elmt_td2_txt);
				elmt_td3.appendChild(elmt_input);
				elmt_td4.appendChild(discoSubTotal);
				elmt_td5.appendChild(elmt_a);
				elmt_a.appendChild(elmt_a_img);
			}//cierre - if (discos[i].estado == 1) {
		}//cierre - for (var i in discos) {
		
		var botonera_carrito_div = cE('div');
		
		var boton_cerrar_carrito_span = cE('span');
		var boton_cerrar_carrito_a = cE('a');
		var boton_cerrar_carrito_img = cE('img');
		var boton_actualizar_carrito_span = cE('span');
		var boton_actualizar_carrito_a = cE('a');
		var boton_actualizar_carrito_img = cE('img');
		var boton_comprar_carrito_span = cE('span');
		var boton_comprar_carrito_a = cE('a');
		var boton_comprar_carrito_img = cE('img');
		/*var boton_comprar_carrito_p = cE('span');
		var boton_comprar_carrito_p_txt = document.createTextNode('Efectuar Compra');*/
		
		boton_cerrar_carrito_img.setAttribute('src',boton_cierre_img);
		boton_cerrar_carrito_img.setAttribute('alt','cerrar');
		boton_cerrar_carrito_img.setAttribute('id','cerrar');
		boton_actualizar_carrito_img.setAttribute('src',boton_actualizar_img);
		boton_actualizar_carrito_img.setAttribute('alt','actualizar');
		boton_actualizar_carrito_img.setAttribute('id','actualizar');
		/*boton_comprar_carrito_img.setAttribute('src',boton_adelante_img);
		boton_comprar_carrito_img.setAttribute('alt','siguiente');
		boton_comprar_carrito_img.setAttribute('id','realizar_compra');*/
		botonera_carrito_div.setAttribute('id','botonera_carrito_div');
		boton_comprar_carrito_a.setAttribute('class', "siguiente");
		boton_comprar_carrito_a.setAttribute('title', "Efectuar Compra");
		
		boton_cerrar_carrito_img.onclick = carrito;
		boton_actualizar_carrito_img.onclick = function(){ 
			carrito.abrir = null; 
			carrito();
		}; 
		boton_comprar_carrito_a.onclick = realizar_compra;
				
		caja_div.appendChild(botonera_carrito_div);
		
		botonera_carrito_div.appendChild(boton_cerrar_carrito_span);
		boton_cerrar_carrito_span.appendChild(boton_cerrar_carrito_a);
		boton_cerrar_carrito_a.appendChild(boton_cerrar_carrito_img);
		
		botonera_carrito_div.appendChild(boton_actualizar_carrito_span);
		boton_actualizar_carrito_span.appendChild(boton_actualizar_carrito_a);
		boton_actualizar_carrito_a.appendChild(boton_actualizar_carrito_img);
		
		botonera_carrito_div.appendChild(boton_comprar_carrito_span);
		boton_comprar_carrito_span.appendChild(boton_comprar_carrito_a);
		//boton_comprar_carrito_a.appendChild(boton_comprar_carrito_img);
		//boton_comprar_carrito_a.appendChild(boton_comprar_carrito_p_txt);
		
	//}else if (disco_id2=='actualizar') {
	}else if ( carrito.abrir == null) {
		/*
		Carga array de las filas de los productos
		obtiene el "Id del productos desde los elementos a (que son las etiquetas para eliminar)
		obtiene el Valor desde el campo input
		usa esos datos para actualizar el array discos ubicado en array.js
		Cambia el estado del boton actualizar un instante y lo restablece
		*/
		var fila = detalleCompra.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		
		for (var j in fila) { 
			if(!isNaN(fila)){
				var id = fila[j].getElementsByTagName('a')[0];
				id = id.getAttribute('id');
				valor = fila[j].getElementsByTagName('input')[0].value;
			
				//discos[id].cantidad = valor;
			}
		}
		
		var this_ = gEID('actualizar');
		this_.setAttribute('src',boton_echo_img);
		
		var restablecer_boton = setTimeout(
				function () {
					this_.setAttribute('src',boton_actualizar_img); 
					clearTimeout(restablecer_boton);
				}, 600);
				
	//}else if (disco_id2=='cerrar') { 
	}else if (carrito.abrir == false ) {
		
		var opacidad = 0.99;
		var ocultar = function () {
				if (detalleCompra!=undefined) {
					opacidad = parseFloat((opacidad-0.01));
					detalleCompra.style.opacity = opacidad;

					if (opacidad<0.05) {
						clearTimeout(cron);
						caja.removeChild(detalleCompra);
					} else var cron = setTimeout(ocultar,1); 	
				}	};
		ocultar();
			
	}else {
		//this.setAttribute('id','cerrar');
		carrito.abrir = false;
		carrito();
	}
	
	return false;
}

function descripcion_disco(){
	//titulo('Descripcion');

	disco_id = this.getAttribute('data-id');
	if( disco_id == undefined )
		disco_id = this.getAttribute('id');


	var caja = gEID('caja');
	var detalleDisco = gEID('detalleDisco');
	
	if (disco_id!='cerrar') {
		
		if (detalleDisco!=undefined)
			head.removeChild(detalleDisco);

		titulo( discos[disco_id].titulo );
		
		//Creacion de los elementos
		
		var detalleDisco = cE('div');
		var caja_div = cE('div');
		var caja_h2 = cE('h2');
		var imag = cE('img');
		var caja_p = cE('p');
		
		var botonera = cE('div');
		var caja_precio = cE('span');var txt_precio = document.createTextNode('Precio: '+discos[disco_id].precio+'$');
		var boton_agregar = cE('img');
		var boton_cerrar = cE('img');
		var caja_hidden = cE('input');
		
		var txt_titulo_disco = document.createTextNode(discos[disco_id].titulo);
		var txt_descripccion_disco = document.createTextNode(discos[disco_id].titulo);
		var txt_precio = document.createTextNode('Precio: '+discos[disco_id].precio+'$');
		
		//Insercion de Elementos
		
		caja.appendChild(detalleDisco);
		detalleDisco.appendChild(caja_div);
		
		caja_div.appendChild(caja_h2);
		caja_div.appendChild(imag);
		caja_div.appendChild(caja_p);
		
		caja_div.appendChild(botonera);
		botonera.appendChild(caja_precio);
		botonera.appendChild(boton_agregar);
		botonera.appendChild(boton_cerrar);
		
		caja_h2.appendChild(txt_titulo_disco);
		caja_p.appendChild(txt_descripccion_disco);
		caja_precio.appendChild(txt_precio);

		//Seteo de los elementos
		
		detalleDisco.setAttribute('id','detalleDisco');
		
		imag.setAttribute('src',ruta_tapas+discos[disco_id].imagen);
		imag.setAttribute('alt',discos[disco_id].titulo);
		
		caja_precio.setAttribute('id','precio');
		botonera.setAttribute('id','botonera');
		botonera.class = 'clearfix';
		
		boton_cerrar.setAttribute('id','cerrar');
		boton_cerrar.setAttribute('src',boton_cierre_img);
		boton_cerrar.setAttribute('alt','cerrar');
		boton_agregar.setAttribute('id','boton_agregar');
		
		boton_cerrar.onclick = descripcion_disco;
		
		if (discos[disco_id].estado == 0) {
		
			boton_agregar.setAttribute('src',boton_agregar1_img);
			boton_agregar.setAttribute('alt','Agregar');
			boton_agregar.onclick = function () {
					discos[disco_id].estado = 1;
					boton_agregar.setAttribute('src',boton_agregar2_img);
					boton_agregar.setAttribute('alt','Agregado Al Carrito');

					subtotal(true);
				};
		}else {
			boton_agregar.setAttribute('src',boton_agregar2_img);
			boton_agregar.setAttribute('alt','Agregado Al Carrito');
		}

				
	}else{ 
		titulo('Discografía');

		var opacidad = 0.99;
		var ocultar = function () {
					opacidad = parseFloat(opacidad-0.1);
					detalleDisco.style.opacity = opacidad;
					
					if (opacidad<0.05) {
						clearTimeout(cron);
						caja.removeChild(detalleDisco); 
					} else var cron = setTimeout(ocultar,1);
				};
		ocultar();
	}
	return false;
}

function discografia(pagina){
//para agregar o quitar imagenes, hacerlo desde el array discos[] en array.js	

//configuracion

	//var pagina = 0; -> variable de paginacion 
	var imgXfila=3;
	var filas=2;
	
//fin-configuracion
	if(pagina > 0 ){
		txt = 'Pagina '+(pagina + 1) ;
		titulo( txt );
	}
	else {
		titulo('Discografía');
	}

	var comienzo = (pagina * (imgXfila * filas));
	var cont_filas = 1;
	var count_img = 0;
	
	var caja = gEID('caja');
	var discografia = gEID('discografia');
	var detalleCompra = gEID('detalleCompra');
	
	if (pagina!='cerrar') {
		
		if (discografia!=undefined) caja.removeChild(discografia);
		if (detalleCompra!=undefined) caja.removeChild(detalleCompra); //--> de haber echo todo con objetos podria haber echo carrito.cerrar()

		discografia = cE('ul');
		discografia.setAttribute('id','discografia');
		caja.appendChild(discografia);
		

	for (var i in discos) {
	
	if ((cont_filas <= filas) || (count_img < imgXfila)) {	
		var modulo = i / imgXfila;
		var redondeo = Math.floor(modulo);
		var fin = Math.ceil(modulo);
		
		var j= parseInt(i) + comienzo;
		
		if (modulo == redondeo) {
			var li1 = cE('li');
			var ul2 = cE('ul');
			ul2.setAttribute('class','clearfix');
			
			discografia.appendChild(li1);
			li1.appendChild(ul2);
			
			cont_filas++;
			count_img = 1;
		}else{ count_img++; }
	
		if(discos[j]!=undefined){
			var li3 = cE('li');
			var span1 = cE('span');
			var imagen = cE('img');
			var h2 = cE('h2');
		
			imagen.src=ruta_tapas+discos[j].imagen;
			imagen.alt=discos[j].titulo;
			imagen.setAttribute('data-id',j)
			imagen.onclick = descripcion_disco;
			h2.innerHTML = discos[j].titulo;
		
			ul2.appendChild(li3);
			
			if (discos[j].oferta==1) {
				var oferta2 = cE('h2');
				var oferta2_txt = document.createTextNode('Oferta Especial');
				
				oferta2.setAttribute('id','oferta_especial');
				
				li3.appendChild(oferta2);
				oferta2.appendChild(oferta2_txt);

				var limpiar_oferta = setTimeout(
					function () {						
						var opa = 0.99;
						
						var opacar_oferta = function () {
								opa = parseFloat(opa-0.1);
								
								var oferta_h2 = gEID('oferta_especial'); //Redundancia para evitar errores
								
								if (oferta_h2!=undefined) {
									oferta2.style.opacity = opa;
								
									if (opa<0.05) {
										clearTimeout(cron);
	
										oferta_h2.parentNode.removeChild(oferta_h2);
									}else var cron = setTimeout(opacar_oferta,1);
								}else  clearTimeout(limpiar_oferta); 
								};
						opacar_oferta();
						clearTimeout(limpiar_oferta);
					},10000);
			}
		
			li3.appendChild(span1);
			span1.appendChild(imagen);
			li3.appendChild(h2);
		
		}//cierre -- if(discos[j]!=undefined)
	}//cierre -- armado de las filas
	}//cierre -- for (var i in discos)
	}else {
		var opacidad = 0.99;
		var ocultar = function () {
					opacidad = parseFloat(opacidad-0.01);
					
					if (opacidad<0.05) {
						clearTimeout(cron);

						discografia.parentNode.removeChild(discografia);
					} else var cron = setTimeout(ocultar,1);
			};
		ocultar();
		
		} //cierre -- if (pagina!='cerrar')
	
	return false;
}