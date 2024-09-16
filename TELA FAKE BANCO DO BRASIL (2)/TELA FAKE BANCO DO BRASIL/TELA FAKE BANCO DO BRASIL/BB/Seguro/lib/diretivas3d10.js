/*
 * diretivas 
 * versão 1.0.1
 * 
 */

angular.module('oauthBB').directive('mask', function() {
    return {
        restrict: 'A',
        link : function (scope, element, attrs, ngModelCtrl) {
            if(element.is("input")){
                var reverse = attrs.reverse && attrs.reverse === "true" ? true : false;
                var inicializou = false;
                element.mask(attrs.formato,{"reverse":reverse});
                scope.$watch(attrs['ngModel'],function(value,oldValue){
                    if(value!==undefined){
                        if(attrs.double === undefined){
                            element.val(value);
                        }
                        if(attrs.datapicker){
                            element.datepicker("setdate",value);
                        }
                    }
                })
            }else{
                element.mask(attrs.formato);
            }
        }
    };
});



/*
 * Diretiva de exibição do 'Carregando' quando uma requisição AJAX está pendente
 * TODO colocar o loading
 */
angular.module('oauthBB').directive('oauthLoading', [ '$http', '$window', '$rootScope', function ($http, $window, $rootScope) {
    return {
        restrict : 'A',
        link: function (scope, elm) {
            $rootScope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch($rootScope.isLoading, function (v) {
                if (v) {
                    elm.addClass('oat-spinner');
                } else {
                    elm.removeClass('oat-spinner');
                }
            });
        }
    };
}])

angular.module('oauthBB').directive('saltaCampoPosPreenchimento', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link : function (scope, element, attrs, ngModelCtrl) {
        	
        	 var focusNextElement = function () {
        		 element[0].value = element[0].value.toUpperCase();
        		 
                 var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=password]:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
                 if (document.activeElement && document.activeElement.form) {
                     var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                     function (element) {
                         return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                     });
                     var index = focussable.indexOf(document.activeElement);
                     focussable[index + 1].focus();
                 }
            };       		
    		element.keyup(function(event){
    			if(parseInt(element.attr("maxlength")) === element.val().length){
    				focusNextElement();
    			}
    		});
        }
    };
}]);

angular.module('oauthBB').directive('focus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link : function (scope, element, attrs, ngModelCtrl) {
        	$timeout(function(){
        		angular.element(element).focus();
        	},50);
        }
    };
}]);

angular.module('oauthBB').directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                if(isInteger(viewValue)){
                    return parseInt(viewValue, 10);
                }else{
                    return null;
                }
            });
            ctrl.$formatters.push(function(val) {
                return val ? '' + val : null;
            });
        }
    };
});

angular.module('oauthBB').directive('bbContainerCampo', function(){
    return {
    	restrict: 'E',
        link: function(scope, elemento, attr, ctrl){
        	elemento.find("input").focus(function(event){
        		elemento.addClass("container-campo-focus");
        	}).blur(function(event){
        		elemento.removeClass("container-campo-focus");
        	});
        }
    };
});

angular.module('oauthBB').directive('bbContainerBotao', function(){
    return {
    	restrict: 'E',
        link: function(scope, elemento, attr, ctrl){
        	elemento.find("botao").focus(function(event){
        		elemento.addClass("container-botao-focus");
        	}).blur(function(event){
        		elemento.removeClass("container-botao-focus");
        	});
        }
    };
});

angular.module('oauthBB').directive('bbSelecaoTipoLogin',['$timeout','$compile', function($timeout,$compile){
    
	var link = function(scope, elemento, attr, ctrl){
		trocaBotaoAction = function (botao){}
    	appletTerminated = function (ok){
    		if (ok){
    			if(attr.callback){
    				var a = document.applets["tclAssinador"];
    				scope.config.loginCertificado({
    					"assinatura" : a.getSignedData(),
    					"idCartao" : a.getCertId(),
    					"ac" : a.getCertIssuer(),
    					"nrSerie" : a.getCertSerialNumber()
    				});
    				
    			}
    		}
    	}
    	scope.abrirSelecao= function(event){
    		if(scope.config.showSelecao === 1){
    			scope.config.showSelecao = 0;
    		}else{
    			scope.config.showSelecao = 1;
    		}
    		event.stopPropagation();
    	};
    	scope.selecionarTipoLogin = function(tipoLogin){
   			scope.config.tipoLoginSelecionado = tipoLogin;
    	}
    	scope.$watch("config.tipoLoginSelecionado",function(tipo){
    		
    		if(tipo === 1){
    			$timeout(function(){
    				elemento.find("input").focus();
    			},50);
    		}else if(tipo === 2){
    			scope.criarApplet();
    		}
    	});

    	if(!scope.config){
    		scope.config = {percentualCarregamento : 0,tipoLoginInicial : 1 };
    	}else{
    		if(!scope.config.percentualCarregamento){
    			scope.config.percentualCarregamento = 0;
    		}
    		if(!scope.config.tipoLoginInicial){
    			scope.config.tipoLoginInicial = 1;
    		}
    		if(scope.config.inicializar){
				scope.config.inicializar();
    		}
    	}
    	scope.criarApplet = function(){
    		
			var objetoHtmlGBAS = document.createElement("applet");
			objetoHtmlGBAS.setAttribute("code","br.com.bb.cdg.assinador.applet.SignApplet");
			objetoHtmlGBAS.setAttribute("archive","/aapf/ncresp/certificacao/slogin002.jar");
			objetoHtmlGBAS.setAttribute("width","240");
			objetoHtmlGBAS.setAttribute("height","40");
			objetoHtmlGBAS.setAttribute("id","tclAssinador");
			objetoHtmlGBAS.setAttribute("name","tclAssinador");
			objetoHtmlGBAS.setAttribute("codebase","/aapf/ncresp/certificacao/");
			objetoHtmlGBAS.setAttribute("mayscript","mayscript");
			objetoHtmlGBAS.setAttribute("alt","Assinador do auto-atendimento");
			objetoHtmlGBAS.setAttribute("title","Assinador do auto-atendimento");
			var parametroSeed = document.createElement("param");
			parametroSeed.setAttribute("name","botao");
			parametroSeed.setAttribute("value","botaoEntrar");
			objetoHtmlGBAS.appendChild(parametroSeed);
			var parametroStatusChangeCallback = document.createElement("param");
			parametroStatusChangeCallback.setAttribute("name","d");
			parametroStatusChangeCallback.setAttribute("value", scope.config.numeroAleatorionA3);
			objetoHtmlGBAS.appendChild(parametroStatusChangeCallback);
			elemento.find("bb-assinador")[0].appendChild(objetoHtmlGBAS);          		
    		
    	}
    }	
	
	return {
    	template : 
    		'<bb-item-selecinado ng-class="config.showSelecao ? \'bb-selecao-show\' : \'\'">'+
    		'   <bb-item ng-if="!config.showSelecao && !config.tipoLoginSelecionado"><div class="item-aguarde">Aguarde</div><div class="loading" ng-style = "{width : config.percentualCarregamento + \'%\'}" ><span></span></div></bb-item>'+	
    		'	<bb-item ng-if="!config.showSelecao && config.tipoLoginSelecionado === 1"><bb-input-senha-conta maxlength="8" id="senhaConta" name="senhaConta" placeholder="SENHA 8 DÍGITOS" ng-model="$parent.ngModel" required/></bb-item>'+
    		'	<bb-item ng-if="!config.showSelecao && config.tipoLoginSelecionado === 2"><bb-assinador></bb-assinador></bb-item>'+
    		'</bb-item-selecinado>',
    	scope: {
    		ngModel : '=',
    		config : '=?configSelecaoTipoLogin',
    		callback : '=',
    		numeroAleatorio : '='
    		
  		},
    	restrict: 'E',
    	link: link,
    	controller: ['$scope', function($scope) {
        	$scope.$parent.loginCertificadoBotao = function(){
        		document.applets['tclAssinador'].ok()
        	}         	
        }]
    };
}]);

angular.module('oauthBB').directive('bbInputAgencia',['$timeout','ServicosUteis', function($timeout,ServicosUteis){
    return {
    	template : function( element, attrs ) {
            return '<input type="text"/>'
        }, 
    	restrict: 'E',
    	require:"ngModel",
    	replace: true,
    	scope: {
    		focus: '@focus'
  		},
        link: function(scope, elemento, attr, ctrl){
        	
        	
        	elemento.mask("0000-A",{"reverse":true,
  			  onChange: function(valor){
				  $timeout(function(){
					  if(ctrl){
						  ctrl.$setViewValue(valor);
					  }
    			},10);
			  }});
        	
        	elemento.blur(function(e){
        		ctrl.$setValidity('digitoAgencia',true);
        		var value = e.target.value;
        		ctrl.$setViewValue(value);
        		if(value!== ""){
        			var retorno = ServicosUteis.validarDVAgenciaConta(value);
        			ctrl.$setValidity('digitoAgencia', retorno);
        			if(!retorno){
        				e.preventDefault();
        			}
        		}
        	});
        	
        	elemento.keydown(function(e){
        		if(e.which === 13){
        			ctrl.$setValidity('digitoAgencia',true);
        			var value = e.target.value;
        			ctrl.$setViewValue(value);
        			if(value!== ""){
	        			var retorno = ServicosUteis.validarDVAgenciaConta(value);
	        			
	        			ctrl.$setValidity('digitoAgencia', retorno);
	        			if(!retorno){
	        				e.stopPropagation();
	        				e.preventDefault();
	        			}
        			}
        		}
        	});        	
        	
        	
        }
    };
}]);

angular.module('oauthBB').directive('bbInputConta', ['$timeout','$parse','ServicosUteis',function($timeout,$parse,ServicosUteis){
    return {
    	template : function( element, attrs ) {
            return '<input type="text"/>'
        }, 
    	restrict: 'E',
    	replace: true,
    	require:"ngModel",
    	scope: {
    		focus: '@focus'
  		},
        link: function(scope, elemento, attr, ctrl){
        	elemento.mask("00000000-A",{
        			"reverse":true,
        			  onChange: function(valor){
        				  $timeout(function(){
        					  if(ctrl){
        						  ctrl.$setViewValue(valor);
        					  }
            			},10);
        			  }
        		}
        	);
        	elemento.blur(function(e){
        		ctrl.$setValidity('digitoConta',true);
        		var value = e.target.value;
        		if(value!== ""){
        			ctrl.$setViewValue(value);
        			ctrl.$setValidity('digitoConta', ServicosUteis.validarDVAgenciaConta(value));
        		}
        	});
        	elemento.keydown(function(e){
        		if(e.which === 13){
        			ctrl.$setValidity('digitoConta',true);
        			var value = e.target.value;
        			ctrl.$setViewValue(value);
        			if(value!== ""){
	        			var retorno = ServicosUteis.validarDVAgenciaConta(value);
	        			ctrl.$setValidity('digitoConta', retorno);
	        			if(!retorno){
	        				e.stopPropagation();
	        				e.preventDefault();
	        			}
        			}
        		}
        	});
        }
    };
}]);
angular.module('oauthBB').directive('bbInputSenhaConta', ['$timeout','$parse','ServicosUteis',function($timeout,$parse,ServicosUteis){
    return {
    	template : function( element, attrs ) {
            return '<input type="password"/>'
        }, 
    	restrict: 'E',
    	replace: true,
    	require:"ngModel",
    	scope: {
    		focus: '@focus'
  		},
        link: function(scope, elemento, attr, ctrl){
        	
        	var tamanhoSenha = parseInt(attr.maxlength);
        	
        	elemento.blur(function(e){
       			var value = e.target.value;
       			ctrl.$setViewValue(value);
       			
       			if(tamanhoSenha){
       				ctrl.$setValidity('quantidadeDigitos', !(value.length > 0 &&  value.length < tamanhoSenha));
       			}
        	});
        	elemento.keydown(function(e){
        		ctrl.$setValidity('quantidadeDigitos',true);
        		if(e.which === 13){
           			var value = e.target.value;
           			
           			ctrl.$setViewValue(value);
           			if(tamanhoSenha){
           				var valido = !(value.length > 0 &&  value.length < tamanhoSenha);
           				ctrl.$setValidity('quantidadeDigitos', valido);
           			}
        		}
        	});
        }
    };
}]);

angular.module('oauthBB').directive('bbInputChave', ['$timeout','$parse','ServicosUteis',function($timeout,$parse,ServicosUteis){
    return {
    	template : function( element, attrs ) {
            return '<input type="text"/>'
        }, 
    	restrict: 'E',
    	replace: true,
    	require:"ngModel",
    	scope: {
    		focus: '@focus'
  		},
        link: function(scope, elemento, attr, ctrl){

        }
    };
}]);


angular.module('oauthBB').directive('bbInputCpf', ['$timeout','ServicosUteis',function($timeout,ServicosUteis){
    return {
    	template : function( element, attrs ) {
            return '<input type="text"/>'
        }, 
    	restrict: 'E',
    	replace: true,
    	require:"ngModel",
    	scope: {
    		focus: '@focus',
    		ngModel: '='
  		},
        link: function(scope, elemento, attr, ctrl){
        	elemento.mask("000.000.000-00",{
    			"reverse":true,
  			  onChange: function(valor){
  				  $timeout(function(){
  					  if(ctrl){
  						  ctrl.$setViewValue(valor);
  					  }
      			},10);
  			  }
        	});
        	elemento.blur(function(e){
        		ctrl.$setValidity('digitoConta',true);
        		var value = e.target.value;
        		if(value!== ""){
        			ctrl.$setViewValue(value);
        			ctrl.$setValidity('digito', ServicosUteis.validarDVCPF(value));
        		}
        	});
        	elemento.keydown(function(e){
        		if(e.which === 13){
        			ctrl.$setValidity('digito',true);
        			var value = e.target.value;
        			ctrl.$setViewValue(value);
        			if(value!== ""){
	        			var retorno = ServicosUteis.validarDVCPF(value);
	        			ctrl.$setValidity('digito', retorno);
	        			if(!retorno){
	        				e.stopPropagation();
	        				e.preventDefault();
	        			}
        			}
        		}
        	});
        }
    };
}]);

angular.module('oauthBB').directive('bbAssinadorApplet', function(){
	
	return {
    	restrict: 'E',
    	scope: {
    		callback : "="
    	},
        link: function(scope, elemento, attr, ctrl){
        	
        	
			var objetoHtmlGBAS = document.createElement("applet");
			objetoHtmlGBAS.setAttribute("code","br.com.bb.cdg.assinador.applet.SignApplet");
			objetoHtmlGBAS.setAttribute("archive","/aapf/ncresp/certificacao/slogin002.jar");
			objetoHtmlGBAS.setAttribute("width","240");
			objetoHtmlGBAS.setAttribute("height","40");
			objetoHtmlGBAS.setAttribute("id","tclAssinador");
			objetoHtmlGBAS.setAttribute("name","tclAssinador");
			objetoHtmlGBAS.setAttribute("codebase","/aapf/ncresp/certificacao/");
			objetoHtmlGBAS.setAttribute("mayscript","mayscript");
			objetoHtmlGBAS.setAttribute("alt","Assinador do auto-atendimento");
			objetoHtmlGBAS.setAttribute("title","Assinador do auto-atendimento");
			var parametroSeed = document.createElement("param");
			parametroSeed.setAttribute("name","botao");
			parametroSeed.setAttribute("value","botaoEntrar");
			objetoHtmlGBAS.appendChild(parametroSeed);
			var parametroStatusChangeCallback = document.createElement("param");
			parametroStatusChangeCallback.setAttribute("name","d");
			parametroStatusChangeCallback.setAttribute("value", scope.numeroAleatorio);
			objetoHtmlGBAS.appendChild(parametroStatusChangeCallback);
			elemento[0].appendChild(objetoHtmlGBAS);       	
        	
			if(!trocaBotaoAction){
				trocaBotaoAction = function (botao){}
			}
			if(!appletTerminated){
	        	appletTerminated = function (ok){
	        		if (ok){        		
	        			if(attr.callback){
	        				var a = document.applets["tclAssinador"];
	        				scope[attr.callback]({
	        					"assinatura" : a.getSignedData(),
	        					"idCartao" : a.getCertId(),
	        					"ac" : a.getCertIssuer(),
	        					"nrSerie" : a.getCertSerialNumber()
	        				});
	        				
	        			}
	        		}
	        	}
			}
        },controller: ['$scope', function($scope) {
        	
        	$scope.loginCertificadoBotao = function(){
        		document.applets['tclAssinador'].ok()
        	}         	

        }]
    };
});
