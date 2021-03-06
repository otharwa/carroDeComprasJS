//esta cosa en realidad tiene que ser un objeto para crear formularios
// como cargar unos estilos de una forma simple




function realizar_compra() {
	//esta funcion carga el paso 2 de la compra.... luego de que el usuario apreto el boton "efectuar compra"
	//Aqui se carga el CheckOut
	
	
	
	//var detComp = gEID('detalleCompra').getElementsByTagName('form')[0];
	//detComp.removeChild( detComp.getElementsByTagName('table')[0] );
	//detComp.removeChild( detComp.getElementById('botonera_carrito_div') );
	
	var pasosRestantes = function(estado){
		//var estado es el numero de paso o limpiar para que no aparesca
		var priv = {
			pasos:['Estado','Detalle de Compra','Datos de Compra','Finalizado!!'],
			dom:[],
			div:false,
			cambiarA:function(estado){
				
				priv.div = cE('div');
				priv.div.setAttribute('id','pasosRestantes');
				var ul = cE('ul');
				priv.div.appendChild(ul);
				
				for(var i=0; i< priv.pasos.length ; i++){
					priv.dom[i] = cE('li');
					var p = cE('p');
					p.setAttribute('class','num');
					var p2 = cE('p');
					var numero = document.createTextNode(i+1);
					var texto = document.createTextNode(priv.pasos[i]);
										
					if(i == estado) priv.dom[i].setAttribute('class','aqui');
					
					ul.appendChild(priv.dom[i]);
					priv.dom[i].appendChild(p);
					priv.dom[i].appendChild(p2);
					
					p.appendChild(numero);
					p2.appendChild(texto);
				}
			}
		};
		
		priv.cambiarA(estado);
		
		return priv.div;
		//se puede hacer que return{cambiarA:funtion(numero){priv.cambiarA(numero)},crear:priv.crear()}
		//para alivianar recursos de procesamiento
	}
	
	var crearCarro = function(config){
		var botones = [];
		config = {
			titulo:'Datos de Contacto',
			formContacto:[
				{tipo:'text',formato:'texto',mostrar:'Nombre',namE:'nombre',requerido:true},
				{tipo:'text',formato:'texto',mostrar:'Apellido',namE:'apellido',requerido:true},
				{tipo:'text',formato:'texto',mostrar:'Ciudad',namE:'ciudad',requerido:true},
				{tipo:'text',formato:'texto',mostrar:'Provincia',namE:'prov',requerido:true},
				{tipo:'select',mostrar:'Pais',namE:'pais',option:['Argentina','Chile','Uruguay','otro']},
				{tipo:'textarea',formato:'texto',mostrar:'Direccion',namE:'direccion',requerido:true},
				{tipo:'text',formato:'cp',mostrar:'CodigoPostal',namE:'cp',requerido:true},
				{tipo:'text',formato:'tel',mostrar:'Telefono',namE:'tel',requerido:true},
				{tipo:'text',formato:'email',mostrar:'E-Mail',namE:'email',requerido:true}
			],
			extras:[]
		}
		var priv = {
			tabla1:['titulo','cantidad','costo c/u'],
			submitStatus:false,
			formulariosCompletosDOM:{titulos:[], count:0 },
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
				
				if(tipoDato == undefined) return false;
				console.log( this_);
				
				switch(tipoDato){
					case 'texto':
						 var check = /^[a-zA-Z\á\é\í\ó\ú]*$/;
					break;
					case 'cp':
						var check = /^[0-9]{4}$/;
					break;
					case 'tel':
						var check = /^[\d]*(S\/N)?$/;
					break;
					case 'email':
						var check = /^[\w\-\_\.]{3}[a-z0-9A-Z\-\_\.]*[@][\w]{3}[\w\-\_\.]*[\.]?[\w]{2,4}$/;
					break;
				}
				
				if(! check.test( this_.value ) )
					var erno = priv.mostrarError(this_.parentNode, "campo invalido");
				else if( erno != undefined ) {
					var tiemp = setTimeout( function(){ 
						priv.ocultar(erno); 
						clearTimeout(tiemp);
						this_.parentNode.style.border = "none"; 
					},1024);
				}else this_.parentNode.style.border = "none"; 
			},
			visualizar:function(){
				var form = gEID('detalleCompra').getElementsByTagName('form')[0];
				form.setAttribute('action','#');
				form.setAttribute('method','post');
				form.onsubmit = function(){ return false;};
				form.innerHTML = "";
				
				for(var i=0; i <= priv.formulariosCompletosDOM.count ; i++){
						form.appendChild(priv.formulariosCompletosDOM[i]);
				}
				
				var pasos = pasosRestantes(2);
				form.appendChild(pasos);
			},
			crear:function(){
				var inptS = [];
				
				var fieldset = cE('fieldset');
				var div = cE('div');
				var pTitulo = cE('p');
				
				fieldset.style.padding = "5px";
				fieldset.style.border = "2px solid white";
				fieldset.style.borderRadius = "7px";
				fieldset.style.textAlign = "left";
				
				div.style.width = "350px";
				div.style.display = "inline-block";
				div.style.margin = "20px";
				
				pTitulo.style.textAlign = 'center'
				pTitulo.style.paddingBottom = '15px';
				
				pTitulo.appendChild(document.createTextNode(config.titulo));
				div.appendChild(pTitulo);
				div.appendChild(fieldset);
				
				var posicion = priv.formulariosCompletosDOM.count++;
				priv.formulariosCompletosDOM[posicion] = div;
				priv.formulariosCompletosDOM.titulos[posicion] = config.titulo;
							
								
				for(var i=0; i< config.formContacto.length ;i++){
					var inpt = config.formContacto[i];
					var inptS = [];
										
					var label = cE('label');
					label.setAttribute('for',inpt.namE);
					label.innerHTML = inpt.mostrar;
										
					if(inpt.tipo == 'textarea') {
						inptS[i] = cE('textarea');
						//inptS[i].setAttribute('rows','15');
						//inptS[i].setAttribute('cols','80');
					}
					else if (inpt.tipo == 'select') 
						inptS[i] = cE('select');
					else {
						inptS[i] = cE('input');
						inptS[i].setAttribute('type',inpt.tipo);
					}
					inptS[i].setAttribute('name',inpt.namE); //cuando expanda el objeto a los checkbox --> inpt.namE+'[]'
					inptS[i].setAttribute('id',inpt.namE);
					inptS[i].style.border = "2px solid green";
					inptS[i].style.padding = "2px";
					
					label.appendChild( inptS[i] );
					 var vv = inptS[i];
					if( inpt.requerido == true  ) inptS[i].onchange = function(){ priv.validar( vv , inpt.formato); };
					
					if( inpt.tipo == 'select' ){
						for(var j in inpt.option ){
							var optionS = cE('option');							
							optionS.setAttribute('value',inpt.option[j]);
							optionS.innerHTML = inpt.option[j];
							
							inptS[i].appendChild(optionS);
						}	}
					
					fieldset.appendChild( label );
				} }
		};
		var pub = {
			crear:function(){priv.crear()},
			visualizar:function(){priv.visualizar()},
			config:config
		}
		return pub;
	}
	
	var carro = crearCarro();
	carro.crear(); //Genero 
	carro.conf.titulo = '';
	carro.conf.extras.push = cE('input');
	carro.crear();
	carro.visualizar();

	
	/*para generar varias instancias del formulario puedo hacer que
		1 carro.config --> te permite modificar los elementos de formulario
		2 carro.crear --> los crea con la configuracion anterior y los carga en un array
		3 carro.visualizar --> lee el array donde estan los formularios creados y los coloca en el general, para ser vistos
	*/
}

