var body = document.body;
body.onload = function () {dicografia(0); return false;}

var pagIndex = document.getElementById('index').getElementsByTagName('a')[0];
pagIndex.onclick = function () {dicografia('cerrar'); return false; }

var pag0 = document.getElementById('discos').getElementsByTagName('a')[0];
pag0.onclick = function () { return false; }

var pag1 = document.getElementById('discos').getElementsByTagName('a')[1];
pag1.onclick = function () {dicografia(0); return false;}

var pag2 = document.getElementById('discos').getElementsByTagName('a')[2];
pag2.onclick = function () {dicografia(1); return false;}

var pag3 = document.getElementById('discos').getElementsByTagName('a')[3];
pag3.onclick = function () {dicografia(2); return false;}

var boton_carro = document.getElementById('boton_carro').getElementsByTagName('a')[0];
boton_carro.onclick = carrito;


/*Nota para una mejor lectura del codigo
La construcion se fue realizando de abajo (la ultima funcion) hacia arriba (la primer funcion)
Si algo se ve fuera de contexto al principio es porque sirve mas a bajo durante la funcion probablemente en alguna sugunda alternativa
Administracion del tiempo:
3hs 7 dias
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
		//revisa el PDF para poner todos los datos como Nombre, Apellido, etc.
		
	validacion de datos <<<---- uy que plomo!!
*/

function realizar_compra() {
	console.log('realizar_compra');
}


function carrito() {
	
	//colocar etiqueta form porque estoy usando input
	
	var caja = document.getElementById('caja');
	var discografia = document.getElementById('discografia');
	
	var boton_carro =  setTimeout(
			function () {
				var boton_carro_id =  document.getElementById('boton_carro').getElementsByTagName('a')[0];
				var boton_valor = boton_carro_id.getAttribute('id');	
				if (boton_valor == 'abrir') { boton_carro_id.setAttribute('id','cerrar'); }
				else { boton_carro_id.setAttribute('id','abrir'); }
				clearTimeout(boton_carro);
			}, 25);
	
	var detalleCompra = document.getElementById('detalleCompra');
	var disco_id2 = this.getAttribute('id');
	
	if (disco_id2=='abrir') {
		
		if (detalleCompra!=undefined) {caja.removeChild(detalleCompra);}
				
		detalleCompra = document.createElement('div');
		var caja_div = document.createElement('div');
		var elmt_tabla = document.createElement('table');
		var elmt_thead = document.createElement('thead');
		var elmt_th1 = document.createElement('th');
		var elmt_th2 = document.createElement('th');
		var elmt_th3 = document.createElement('th');
		var elmt_th4 = document.createElement('th');
		var elmt_tbody = document.createElement('tbody');
		
		detalleCompra.setAttribute('id','detalleCompra');
		
		var elmt_th1_txt = document.createTextNode('Portada');
		var elmt_th2_txt = document.createTextNode('Descripcion');
		var elmt_th3_txt = document.createTextNode('Cantidad');
		var elmt_th4_txt = document.createTextNode('Remover');
		
		elmt_th1.appendChild(elmt_th1_txt);
		elmt_th2.appendChild(elmt_th2_txt);
		elmt_th3.appendChild(elmt_th3_txt);
		elmt_th4.appendChild(elmt_th4_txt);
		
		caja.insertBefore(detalleCompra, discografia);
		detalleCompra.appendChild(caja_div);
		caja_div.appendChild(elmt_tabla);
		elmt_tabla.appendChild(elmt_thead);
		elmt_thead.appendChild(elmt_th1);
		elmt_thead.appendChild(elmt_th2);
		elmt_thead.appendChild(elmt_th3);
		elmt_thead.appendChild(elmt_th4);
		elmt_tabla.appendChild(elmt_tbody);
		
		for (var i in discos) {
			if (discos[i].estado == 1) {
				
				var elmt_tr = document.createElement('tr');
				var elmt_td1 = document.createElement('td');
				var elmt_td2 = document.createElement('td'); 
				var elmt_td3 = document.createElement('td'); 
				var elmt_td4 = document.createElement('td');
				var elmt_img = document.createElement('img');
				var elmt_input = document.createElement('input');
				var elmt_a = document.createElement('a');
				var elmt_a_img = document.createElement('img');
			
				elmt_img.setAttribute('src',ruta_tapas+discos[i].imagen);
				elmt_img.setAttribute('alt',discos[i].titulo);
				elmt_input.setAttribute('type','text');
				elmt_input.setAttribute('name','cantidad');
				elmt_input.setAttribute('id','cantidad');
				elmt_input.setAttribute('value',discos[i].cantidad);
				elmt_input.setAttribute('size','2');
				elmt_a.setAttribute('href','#');
				elmt_a.setAttribute('id',i);
				elmt_a_img.setAttribute('src',boton_remover_img);
				elmt_a_img.setAttribute('alt','remover');
				elmt_a.onclick = function () {
					this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
					var j = this.getAttribute('id');
					discos[j].cantidad = 0;
					discos[j].estado = 0;
					return false;
				}
				
				var elmt_td2_txt = document.createTextNode('Descripcion');
				
				elmt_tbody.appendChild(elmt_tr);
				elmt_tr.appendChild(elmt_td1);
				elmt_tr.appendChild(elmt_td2);
				elmt_tr.appendChild(elmt_td3);
				elmt_tr.appendChild(elmt_td4);
				elmt_td1.appendChild(elmt_img);
				elmt_td2.appendChild(elmt_td2_txt);
				elmt_td3.appendChild(elmt_input);
				elmt_td4.appendChild(elmt_a);
				elmt_a.appendChild(elmt_a_img);
			}//cierre - if (discos[i].estado == 1) {
		}//cierre - for (var i in discos) {
		
		var botonera_carrito_div = document.createElement('div');
		
		var boton_cerrar_carrito_span = document.createElement('span');
		var boton_cerrar_carrito_a = document.createElement('a');
		var boton_cerrar_carrito_img = document.createElement('img');
		var boton_actualizar_carrito_span = document.createElement('span');
		var boton_actualizar_carrito_a = document.createElement('a');
		var boton_actualizar_carrito_img = document.createElement('img');
		var boton_comprar_carrito_span = document.createElement('span');
		var boton_comprar_carrito_a = document.createElement('a');
		var boton_comprar_carrito_img = document.createElement('img');
		var boton_comprar_carrito_p = document.createElement('p');
		var boton_comprar_carrito_p_txt = document.createTextNode('Efectuar Compra');
		
		boton_cerrar_carrito_img.setAttribute('src',boton_cierre_img);
		boton_cerrar_carrito_img.setAttribute('alt','cerrar');
		boton_cerrar_carrito_img.setAttribute('id','cerrar')
		boton_actualizar_carrito_img.setAttribute('src',boton_actualizar_img);
		boton_actualizar_carrito_img.setAttribute('alt','actualizar');
		boton_actualizar_carrito_img.setAttribute('id','actualizar');
		boton_comprar_carrito_img.setAttribute('src',boton_adelante_img);
		boton_comprar_carrito_img.setAttribute('alt','siguiente');
		boton_comprar_carrito_img.setAttribute('id','realizar_compra');
		botonera_carrito_div.setAttribute('id','botonera_carrito_div');
		
		boton_cerrar_carrito_img.onclick = carrito;
		boton_actualizar_carrito_img.onclick = carrito;
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
		boton_comprar_carrito_a.appendChild(boton_comprar_carrito_img);
		boton_comprar_carrito_span.appendChild(boton_comprar_carrito_p);
		boton_comprar_carrito_p.appendChild(boton_comprar_carrito_p_txt);
		
	}else if (disco_id2=='actualizar') {
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
				var valor = fila[j].getElementsByTagName('input')[0].value;
			
				discos[id].cantidad = valor;
			}
		}
		
		var this_ = this;
		this_.setAttribute('src',boton_echo_img);
		console.log(this_.getAttribute('src'));
		
		var restablecer_boton = setTimeout(
				function () {
					this_.setAttribute('src',boton_actualizar_img); 
					clearTimeout(restablecer_boton);
				}, 600);
				
	}else if (disco_id2=='cerrar') { 
		
		var opacidad = 0.99;
		var ocultar = setInterval(
			function () {
				if (detalleCompra!=undefined) {
					opacidad = parseFloat((opacidad*0.98));
					if (opacidad<0.445) { opacidad = parseFloat((opacidad*0.89)); }
					detalleCompra.style.opacity = opacidad;
					
					if (opacidad<0.05) {
						clearInterval(ocultar);
						caja.removeChild(detalleCompra);
					}
				}
			},7);
			
	}else {
		this.setAttribute('id','cerrar');
		carrito('cerrar');
	}
	
	return false;
}

function descripcion_disco(){
	
	var disco_id = this.getAttribute('id');

	var caja = document.getElementById('caja');
	var detalleDisco = document.getElementById('detalleDisco');
	
	if (disco_id!='cerrar') {
		
		if (detalleDisco!=undefined) { head.removeChild(detalleDisco); }
		
		//Creacion de los elementos
		
		var detalleDisco = document.createElement('div');
		var caja_div = document.createElement('div');
		var caja_h2 = document.createElement('h2');
		var imag = document.createElement('img');
		var caja_p = document.createElement('p');
		
		var botonera = document.createElement('div');
		var caja_precio = document.createElement('span');var txt_precio = document.createTextNode('Precio: '+discos[disco_id].precio+'$');
		var boton_agregar = document.createElement('img');
		var boton_cerrar = document.createElement('img');
		var caja_hidden = document.createElement('input');
		
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
				};
		}else {
			boton_agregar.setAttribute('src',boton_agregar2_img);
			boton_agregar.setAttribute('alt','Agregado Al Carrito');
		}

				
	}else{ 
		var opacidad = 0.99;
		var ocultar = setInterval(
			function () {
					opacidad = parseFloat(opacidad*0.99);
					if (opacidad<0.5) { opacidad = parseFloat((opacidad*0.89)); }
					detalleDisco.style.opacity = opacidad;
					
					if (opacidad<0.05) {
						clearInterval(ocultar);
						caja.removeChild(detalleDisco); 
					}
			},1);
			
			
	}

	return false;
}

function dicografia(pagina){
//para agregar o quitar imagenes, hacerlo desde el array discos[] en array.js	

//configuracion

	//var pagina = 0;
	var imgXfila=3;
	var filas=2;
	
//fin-configuracion

	
	var comienzo = (pagina * (imgXfila * filas));
	var cont_filas = 1;
	var count_img = 0;
	
	var caja = document.getElementById('caja');
	var discografia = document.getElementById('discografia');
	
	if (pagina!='cerrar') {

		if (discografia!=undefined) {caja.removeChild(discografia);}

		discografia = document.createElement('ul');
		discografia.setAttribute('id','discografia');
		caja.appendChild(discografia);
		

	for (var i in discos) {
	
	if ((cont_filas <= filas) || (count_img < imgXfila)) {	
		var modulo = i / imgXfila;
		var redondeo = Math.floor(modulo);
		var fin = Math.ceil(modulo);
		
		var j= parseInt(i) + comienzo;
		
		if (modulo == redondeo) {
			var li1 = document.createElement('li');
			var ul2 = document.createElement('ul');
			ul2.setAttribute('class','clearfix');
			
			discografia.appendChild(li1);
			li1.appendChild(ul2);
			
			cont_filas++;
			count_img = 1;
		}else{ count_img++; }
	
		if(discos[j]!=undefined){
			var li3 = document.createElement('li');
			var span1 = document.createElement('span');
			var imagen = document.createElement('img');
			var h2 = document.createElement('h2');
		
			imagen.src=ruta_tapas+discos[j].imagen;
			imagen.alt=discos[j].titulo;
			imagen.setAttribute('id',j)
			imagen.onclick = descripcion_disco;
			h2.innerHTML = discos[j].titulo;
		
			ul2.appendChild(li3);
			
			if (discos[j].oferta==1) {
				var oferta2 = document.createElement('h2');
				var oferta2_txt = document.createTextNode('Oferta Especial');
				
				oferta2.setAttribute('id','oferta_especial');
				
				li3.appendChild(oferta2);
				oferta2.appendChild(oferta2_txt);

				var limpiar_oferta = setTimeout(
					function () {						
						var opa = 0.99;
						
						var opacar_oferta = setInterval(
							function () {
								opa = parseFloat(opa*0.99);
								if (opa<0.5) { opa = parseFloat(opa*0.89); }
								
								var oferta_h2 = document.getElementById('oferta_especial'); //Redundancia para evitar errores
								
								if (oferta_h2!=undefined) {
									oferta2.style.opacity = opa;
								
									if (opa<0.01) {
										clearInterval(opacar_oferta);
	
										oferta_h2.parentNode.removeChild(oferta_h2);
									}
								}else {clearInterval(opacar_oferta); clearTimeout(limpiar_oferta); }
								},7);
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
		var ocultar = setInterval(
			function () {
					opacidad = parseFloat(opacidad*0.99);
					if (opacidad<0.5) { opacidad = parseFloat((opacidad*0.89)); }
					discografia.style.opacity = opacidad;
					
					if (opacidad<0.05) {
						clearInterval(ocultar);
						caja.removeChild(discografia);
					}
			},7);
		
		} //cierre -- if (pagina!='cerrar')
	
	return false;
}