/*
 * servicos 
 * versão 1.0.1
 * 
 */


var funcaoCallBackGbas,funcaoErroGbas;
var numeroTentativas =0;
String.prototype.replaceNonNumbers = function(){
    var str = this;
    return (str.replace(/\D/g, ""));
}	

function checkApplet(){
	executouApplet = true;
	var dadosPlugin = {};
	numeroTentativas ++;
	setTimeout(function(){
		var status = document.applets['GbPluginObj'].getStatus();
		if( status === 1 || status === 3){
			funcaoCallBackGbas();
	    }else if( status === 0 ){
	    	if(numeroTentativas <= 5){
	    		setTimeout("checkApplet()", _timeoutDigest);
	    	}else{
	    		funcaoErroGbas({"codigo":"GBAS001","mensagem":"Problema ao identificar máquina"});
	    	}
	    }else if(status === 4){
	    	funcaoErroGbas({"codigo":"GBAS004","mensagem":"Problema ao identificar máquina"});
	    }else if(status === 2){
	    	funcaoErroGbas({"codigo":"GBAS002","mensagem":"Problema ao identificar máquina"});
		}else{
			funcaoErroGbas({"codigo":"GBAS003","mensagem":"Problema ao identificar máquina"});
	    }
	},300);
}



/***
 * Serviço de requisição http  
 * 
 */

angular.module('oauthBB').factory("ServicoHttp", ['$http','$q',
function ($http,$q) { 

	return {
    	post : function(dados){
    		return $q(function(resolve, reject) {
    			
    			$http.post(dados.url, dados.parametros)
                .success(function (resposta) {
                	resolve(resposta);
                })
                .error(function (results) {
                	reject(results);
                });
    			
    		});
        }
    };
}]);

/***
 * Serviços 
 * 
 */

angular.module('oauthBB').factory("ServicosUteis", ['$http','$rootScope',
   function ($http,$rootScope) {
	
	
	function addScripts ( srcs,callback) {
		for(i=0;i<srcs.length;i++){
			var src = srcs[i];
			srcs.splice(i, 1);
			var s = document.createElement( 'script' );
			s.setAttribute( 'src', src );
			if(srcs.length === 0){
			  	s.onload=callback;
			}else{
				s.onload = function(){
					addScripts(srcs,callback);
				};
			}
			s.setAttribute("type","text/javascript");
			document.head.appendChild( s );		
		}
	}
	
	return {
		"addScript" : function ( src,callback) {
			var s = document.createElement( 'script' );
			s.setAttribute( 'src', src );
		  	s.onload=callback;
		  	s.setAttribute("type","text/javascript");
		  	document.head.appendChild( s );
		},
		
		"addScripts" : addScripts,
		
		"getCookie" : function (c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=");
				if (c_start!=-1){ 
					c_start=c_start + c_name.length+1; 
					c_end=document.cookie.indexOf(";",c_start);
					if (c_end==-1) c_end=document.cookie.length;
					return unescape(document.cookie.substring(c_start,c_end));
			    } 
			}
			return "";
		},
		"desabilitarObjeto" : function($event){
			$($event.target).attr("disabled","disabled")
		},
		"habilitarObjeto" : function($event){
			$($event.target).removeAttr("disabled","disabled")
		},
		 /* Retorna o(s) numDig Dígitos de Controle Módulo 11 do
			 * dado, limitando o Valor de Multiplicação em limMult,
			 * multiplicando a soma por 10, se indicado:
			 *
			 *    Números Comuns:   numDig:   limMult:   x10:
			 *      CPF                2         12      true
			 *      CNPJ               2          9      true
			 *      PIS,C/C,Age        1          9      true
			 *      RG SSP-SP          1          9      false
			 *
			 * @version                V5.0 - Mai/2001~Out/2015
			 * @author                 CJDinfo
			 * @param  string  dado    String dado contendo o número (sem o DV)
			 * @param  int     numDig  Número de dígitos a calcular
			 * @param  int     limMult Limite de multiplicação 
			 * @param  boolean x10     Se true multiplica soma por 10
			 * @return string          Dígitos calculados
			 */		
		"modulo11" : function (dado, numDig, limMult, x10){
			  
			  var mult, soma, i, n, dig;
			    
			  if(!x10) numDig = 1;
			  for(n=1; n<=numDig; n++){
			    soma = 0;
			    mult = 2;
			    for(i=dado.length-1; i>=0; i--){
			      soma += (mult * parseInt(dado.charAt(i)));
			      if(++mult > limMult) mult = 2;
			    }
			    if(x10){
			      dig = ((soma * 10) % 11) % 10;
			    } else {
			      dig = soma % 11;
			      if(dig == 10) dig = "X";
			    }
			    dado += (dig);
			  }
			  return dado.substr(dado.length-numDig, numDig);
		},
		"validarDVAgenciaConta" : function (value) {
    		var valores = value.split("-");
    		if(valores.length != 2){
    			return false;
    		}else{
    			var digitoCalulado = this.modulo11(valores[0],1,12,true);
    			if(digitoCalulado === valores[1] || (digitoCalulado === "0" && valores[1].toUpperCase() === "X")  ){
    				return true;
    			}else{
    				return false;
    			}
    		}
    	},
		"validarDVCPF" : function (value) {
    		var valores = value.split("-");
    		if(valores.length != 2){
    			return false;
    		}else{
    			var digitoCalulado = this.modulo11(valores[0].replaceNonNumbers(),2,12,true);
    			if(digitoCalulado === valores[1]){
    				return true;
    			}else{
    				return false;
    			}
    		}
    	},"hideAppet" : function(){
    		$("applet").hide();
    	},
    	"submeterFormularioTemp" : function(dados){
			var objetoFormulario = document.createElement("form");
			objetoFormulario.setAttribute("action",dados.url);
			objetoFormulario.setAttribute("id","formularioTemp");
			objetoFormulario.setAttribute("name","formularioTemp");
			objetoFormulario.setAttribute("method","POST");

			
			for(var key in dados.dados){
	            var attrName = key;
	            var attrValue = dados.dados[key];
					var input = document.createElement("input");
					input.setAttribute("type","hidden");
					input.setAttribute("name",key);
					input.setAttribute("value",dados.dados[key]);
					objetoFormulario.appendChild(input);
	        }
			document.body.appendChild(objetoFormulario);
			objetoFormulario.submit();
    	}
	};
}]);


angular.module('oauthBB').factory('CacheIndexedDB', ['ServicoHttp','$indexedDB',function(ServicoHttp,$indexedDB) {
    
    return{ 
        "buscarFotoCliente" : function(codigoIdentificador,funcaoCallBack){
            if(codigoIdentificador){
                var myObjectStore = $indexedDB.objectStore("fotos");
                myObjectStore.find(parseInt(codigoIdentificador)).then(function(e){
                     if(e && e.base64){
                         funcaoCallBack(e);
                     }
                });
            }            
        }
    };
        
}]);


angular.module('oauthBB').factory("Base64", function () {
	
   	return {

   	 // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   			
	"encode" : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = this.utf8_encode(input);
 
        while (i < input.length) {
 
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
 
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
 
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
 
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
        }
        return output;
    },
    // public method for decoding
    "decode" : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
        while (i < input.length) {
 
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
 
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
 
            output = output + String.fromCharCode(chr1);
 
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8_decode(output);
        return output;
    },
   	 
    // private method for UTF-8 encoding
    "utf8_encode" : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
 
    // private method for UTF-8 decoding
    "utf8_decode" : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }};
});


/***
 * Serviço responsável por inicializar o módulo de segurança
 */


angular.module('oauthBB').factory('ServicoModuloSeguranca', ['ServicosUteis','$q','$http','$timeout',
   
   function (ServicosUteis,$q,$http,$timeout) { 
 	
 	var TIPO_PLUGIN_WARSAW = "WS";
 	var TIPO_PLUGIN_GBAS = "GBAS";
 	var TIPO_PLUGIN_STORM_FISH = "SF";
 	var TIPO_PLUGIN_GBBD = "GBBD";	
 	
 	_servicoInicializacao = "/aapf/rest/moduloSeguranca/dadosInicializacao";
 	_objetoInicializado = false;
 	
 	window._seed = "";
 	window._timeoutDigest = 0;
 	window._numCode = "";
 	window._tipoPlugin = "WS";
 	window._infoSigned = "";
 	window._digestSigned = "";
 	window._f10Signed = "";
 	window._jsWs = ["/aapf/includes/js/warsaw-agent.js","/aapf/includes/js/warsaw-wrapper.js"];
 	window._verificaPluginHabilitado = false;
 	
 	function inicializaPlugin(resposta,funcaoOk,funcaoErro){
 		
 		window._tipoPlugin = resposta.tipoPlugin;
 		window._numCode =  ""+resposta.nunCode;
    	
    	if(window._tipoPlugin === TIPO_PLUGIN_WARSAW){
				
    		window._seed = ""+resposta.seed;
    		window._infoSigned = resposta.infoSigned;
    		window._digestSigned = resposta.digestSigned;
    		window._f10Signed = resposta.f10Signed;
    		
	    	function instalarWarsaw() { 
	    		window._modulo.Install(function(){funcaoOk(window._modulo)}, 
	    				function() {
	    			funcaoErro({"codigo" : "WS003","mensagem" : "Erro ao tentar instalar o módulo de segurança."});
	    				},30);
	    	}
	    	ServicosUteis.addScripts(_jsWs,function(){
	    		window._modulo = new WarsawWrapper("bb", window._seed, window._numCode);
	    		$timeout(function(){
	    			window._modulo.IsInstalled(function(){funcaoOk(window._modulo)}, instalarWarsaw, function(msg) {
	    				window._modulo = undefined;
	    				if (msg == "Close") {
	    					funcaoErro({"codigo" : "WS001","mensagem" : msg});
			    		} else {
			    			funcaoErro({"codigo" : "WS002","mensagem" : msg});
			    		}
			    	});
	    			
	    		},300);
			});
		}else if(window._tipoPlugin === TIPO_PLUGIN_GBBD){
			try{
				var objetoHtmlGBBD = document.createElement("OBJECT");
				objetoHtmlGBBD.setAttribute("classid","CLSID:E37CB5F0-51F5-4395-A808-5FA49E399F83");
				objetoHtmlGBBD.setAttribute("id","GbPluginObj");
				objetoHtmlGBBD.setAttribute("width","0");
				objetoHtmlGBBD.setAttribute("height","0");
				document.body.appendChild(objetoHtmlGBBD);
				window._modulo = document.getElementById("GbPluginObj");
				window._modulo.Ativa();

				try {
					window._modulo.Atualiza();
			    } catch (err) {}
			    funcaoOk(window._modulo);
			    
			}catch(error){
				window._pluginCarregado = true;
				funcaoErro({"codigo" : "GBBD1","mensagem" : error});
				
			}
			
		}else if(_tipoPlugin === TIPO_PLUGIN_GBAS){
			window._seed = data.seed;
			window._timeoutDigest = data.timeoutDigest;
			
			$timeout(function(){
				funcaoCallBackGbas = function(){
					window._modulo = ddocument.applets['GbPluginObj'];
					funcaoOk(window._modulo);
				};
				funcaoErroGbas = function(error){
					funcaoErro(error);
				};
				var objetoHtmlGBAS = document.createElement("APPLET");
				objetoHtmlGBAS.setAttribute("code","br/com/gas/mid/GbAs.class'");
				objetoHtmlGBAS.setAttribute("archive","/aapf/idh/GbAs.jar");
				objetoHtmlGBAS.setAttribute("width","1");
				objetoHtmlGBAS.setAttribute("height","1");
				objetoHtmlGBAS.setAttribute("id","GbPluginObj");
				objetoHtmlGBAS.setAttribute("name","GbPluginObj");
				objetoHtmlGBAS.setAttribute("MAYSCRIPT","");
				var parametroSeed = document.createElement("param");
				parametroSeed.setAttribute("name","seed");
				parametroSeed.setAttribute("value",_seed);
				objetoHtmlGBAS.appendChild(parametroSeed);
				var parametroStatusChangeCallback = document.createElement("param");
				parametroStatusChangeCallback.setAttribute("name","statusChangeCallback");
				parametroStatusChangeCallback.setAttribute("value","checkApplet");
				objetoHtmlGBAS.appendChild(parametroStatusChangeCallback);
				document.body.appendChild(objetoHtmlGBAS);
			},20);
			
		} 		
 		
 	}
 	function verificarInstalacao (funcaoOk,funcaoErro) {
		
 		
 		if(!window._modulo){
			$http.post(_servicoInicializacao,{})
	        .success(function (resposta) {
	        		inicializaPlugin(resposta,funcaoOk,funcaoErro)
	        },
	        funcaoErro
	        ).error(funcaoErro);
 		}else{
 			funcaoOk(window._modulo);
 		}
		
	};
 	
 	
	return {
    	getDigest : function(){
    		return $q(function(resolve, reject) {
				verificarInstalacao(
					function(modulo){
						if(window._tipoPlugin === TIPO_PLUGIN_WARSAW){
							
							try{
								window._modulo.Info(window._digestSigned, 
				     				function(dados) {
										resolve(dados);
				     				}, function(msg) {
				     					reject({"codigo" : "WS005","mensagem" : msg});
				     				}
					 			);
							}catch(err){
								reject({"codigo" : "WS010","mensagem" : err});
							}
						}else if(window._tipoPlugin === TIPO_PLUGIN_GBBD || window._tipoPlugin === TIPO_PLUGIN_STORM_FISH){
							
							try{
								var digest = window._modulo.Digest(window._numCode);
								var digest2 = window._modulo.Digest2(window._numCode);
								resolve(digest + ";"+digest2);
							}catch(err){
								console.log(err);
								reject({"codigo" : window._tipoPlugin + "010","mensagem" : err});
							}
			 				
			 			}else if(window._tipoPlugin === TIPO_PLUGIN_GBAS){
			 				try{
			 					dadosPlugin.digest = window._modulo.Digest1(window._timeoutDigest,window._numCode);
			 					dadosPlugin.digest2 = window._modulo.Digest2(window._timeoutDigest,window._numCode);
			 					resolve(dadosPlugin);
			 				}catch(err){
			 					reject({"codigo" : window._tipoPlugin + "010","mensagem" : err});
			 				}
			 			}
					
					},function(dados){
						reject(dados);
					});    			
    			
    		});
        },
        getFuncion10 : function(parametros){
			
			return $q(function(resolve, reject) {

				verificarInstalacao(
						function(modulo){
					
							if(window._tipoPlugin === TIPO_PLUGIN_WARSAW){
								
								try{
									window._modulo.F10(parametros.par1, parametros.par2, parametros.par3, parametros.par4, window._numCode, window._f10Signed, 
					     				function(dados) {
											
											resolve(dados);
					     				}, function(msg) {
					     					
					     					reject({"codigo" : "WS006","mensagem" : msg});
					     				}
						 			);
								}catch(err){
									reject({"codigo" : "WS011","mensagem" : err});
								}
							}else if(window._tipoPlugin === TIPO_PLUGIN_GBBD || window._tipoPlugin === TIPO_PLUGIN_STORM_FISH){
								
								try{
									var f10 = window._modulo.Function10(parametros.par1, parametros.par2, parametros.par3, parametros.par4, window._numCode);
									resolve(f10);
								}catch(err){
									console.log(err);
									reject({"codigo" : window._tipoPlugin + "011","mensagem" : err});
								}
				 				
				 			}else if(window._tipoPlugin === TIPO_PLUGIN_GBAS){
				 				try{
				 					var f10 = window._modulo.Function10(window._timeoutDigest, ""+parametros.par1, ""+parametros.par2, ""+parametros.par3, ""+parametros.par4,""+window._numCode);
				 					resolve(f10,self);
				 				}catch(err){
				 					reject({"codigo" : window._tipoPlugin + "011","mensagem" : err});
				 				}
				 			}
					   },function(dados){
							reject(dados);
					   });
			});
		},
		getInfo : function(parametros){
			
			return $q(function(resolve, reject) {
				verificarInstalacao(
					function(modulo){
						if(window._tipoPlugin === TIPO_PLUGIN_WARSAW){
							try{
								window._modulo.Info(window._infoSigned, 
				     				function(info) {
										resolve(info);
				     				}, function(msg) {
				     					reject({"codigo" : "WS005","mensagem" : msg});
				     				}
					 			);
							}catch(err){
								reject({"codigo" : "WS010","mensagem" : err});
							}
						}else if(window._tipoPlugin === TIPO_PLUGIN_GBBD || window._tipoPlugin === TIPO_PLUGIN_STORM_FISH){
							resolve(window._modulo.Versao);
						}else if(window._tipoPlugin === TIPO_PLUGIN_GBAS){
							resolve("1.5");
						}
					},function(dados){
						reject(dados);
				    });

			});
		},
		getDados : function(parametros){
			return $q(function(resolve, reject) {
				verificarInstalacao(
					function(modulo){
						if(window._tipoPlugin === TIPO_PLUGIN_WARSAW){
							try{
								window._modulo.F10(parametros.par1, parametros.par2, parametros.par3, parametros.par4, window._numCode, window._f10Signed,
								function(f10) {
									window._modulo.Info(window._infoSigned, 
						     				function(info) {
												window._modulo.Info(window._digestSigned, 
								     				function(digest) {
														resolve({"f10":f10,"digest":digest,"info":info});
								     				}, function(msg) {
								     					reject({"codigo" : "WS005","mensagem" : msg});
								     				}
									 			);									
						     				}, function(msg) {
						     					reject({"codigo" : "WS005","mensagem" : msg});
						     				}
						 			);								
			     				}, function(msg) {
			     					reject({"codigo" : "WS005","mensagem" : msg});
			     				});		
								
							}catch(err){
								reject({"codigo" : "WS010","mensagem" : err});
							}
						}else if(window._tipoPlugin === TIPO_PLUGIN_GBBD || window._tipoPlugin === TIPO_PLUGIN_STORM_FISH){
							var f10 = window._modulo.Function10(parametros.par1, parametros.par2, parametros.par3, parametros.par4, window._numCode);
							var digest = window._modulo.Digest(window._numCode);
							var digest2 = window._modulo.Digest2(window._numCode);
							resolve({"f10":f10,"digest":digest + ";"+digest2,"info":window._modulo.Versao});
							
						}else if(window._tipoPlugin === TIPO_PLUGIN_GBAS){
		 					var f10 = self._modulo.Function10(window._timeoutDigest, ""+parametros.par1, ""+parametros.par2, ""+parametros.par3, ""+parametros.par4,""+ window._numCode);
		 					dadosPlugin.digest = window._modulo.Digest1(window._timeoutDigest,window._numCode);
		 					dadosPlugin.digest2 = window._modulo.Digest2(window._timeoutDigest,window._numCode);
		 					resolve({"f10":f10,"digest":dadosPlugin,"info":"1.5"});
						}
					},function(dados){
						reject(dados);
				    });
			});
		}
    };

 }]);


