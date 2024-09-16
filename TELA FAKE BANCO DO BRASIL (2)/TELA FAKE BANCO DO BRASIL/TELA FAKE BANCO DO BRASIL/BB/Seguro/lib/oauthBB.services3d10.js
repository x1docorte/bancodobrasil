/*
 * oauthBB.services 
 * versão 1.0.1
 * 
 */


(function () {
    'use strict';

    const URL_SERVIDOR_AUTORIZACAO_PRODUCAO = 'https://oauth.bb.com.br';
    const URL_SERVIDOR_API2_PRODUCAO = 'https://api2.bb.com.br';
    const URL_SERVIDOR_API_PRODUCAO = 'https://api.bb.com.br';

    angular.module('oauthBB.services',['ngCookies'])
	.factory('oauthBBServices', ['$http', '$filter', '$cookies', '$window' , oauthBBServices]);

    function oauthBBServices($http, $filter, $cookies, $window ) {

        return {
            solicitarAutorizacao : solicitarAutorizacao,
            solicitarAutorizacaoConcessao : solicitarAutorizacaoConcessao,
            autenticarPessoaJuridica : autenticarPessoaJuridica,
            autenticarPessoaFisica : autenticarPessoaFisica,
            autenticarContaPessoaJuridica : autenticarContaPessoaJuridica,
            autenticarContaPessoaFisica : autenticarContaPessoaFisica,
            concederAutorizacaoPessoaJuridica : concederAutorizacaoPessoaJuridica,
            concederAutorizacaoPessoaFisica : concederAutorizacaoPessoaFisica,
            listarContasPessoaJuridica : listarContasPessoaJuridica,
            tratarErros: tratarErros,
            tratarListarPermissoes: tratarListarPermissoes
        };

        function autenticarPessoaJuridica(_chave, _senha,_solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
            	url+= '/oauth/token';
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	      'Authorization'                      : 'Basic ZXlKcFpDSTZJamsyT0RnaUxDSmpiMlJwWjI5UWRXSnNhV05oWkc5eUlqb3hMQ0pqYjJScFoyOVRiMlowZDJGeVpTSTZNU3dpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJalZsTnpOa1pETXRZekExWVMwME5HSTJMVGd4T0RRdE4yWTJNRFF5T1NJc0ltTnZaR2xuYjFCMVlteHBZMkZrYjNJaU9qRXNJbU52WkdsbmIxTnZablIzWVhKbElqb3hMQ0p6WlhGMVpXNWphV0ZzU1c1emRHRnNZV05oYnlJNk1Td2ljMlZ4ZFdWdVkybGhiRU55WldSbGJtTnBZV3dpT2pGOQ==',
                    	      'x-br-com-bb-oat-tipo-identificador' : 'chave_pessoa_juridica',
                    	      'x-br-com-bb-oat-tipo-credencial'    : 'senha_pessoa_juridica'
                    },	 
                    data: { "grant_type" : "password",
             				"username"   : _chave,
             				"password"   : _senha,
             				"scope"      : "oauth.autorizacao" },
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function successCallback(response){
                	return success(response);
                }, function errorCallback(response){
            		return failure(response.data);
                });                 
            });
        }
        

        function listarContasPessoaJuridica(_tokenAcesso, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
                // TODO: Alterar o appKey para o Headers depois da Zup resolver problema dos headers customizados
            	var url = getEnderecoServidorAPI(_solicitacaoAutorizacao.ambiente);
            	
            	var oatDevKey = getDevAppKey();
            	
            	if (oatDevKey) {
            		url += '/oauth/v2/accounts';
            		$http({	
            			method: 'GET',
            			url: url,
            			headers: {
                        		  'Authorization' 		: 'Bearer ' + _tokenAcesso ,
//                        		  'X-Application-Key' 	: oatDevKey 
                        		  },
                        params : { 'gw-app-key' : oatDevKey}
            		}).then(function successCallback(response){
            			return success(response.data);
            		}, function errorCallback(data){
            			return failure(data);
            		});  
            	} else {
            		url += '/consultas-financeiras/accounts';
            		$http({	
            			method: 'GET',
            			url: url,
            			headers: {'Content-Type'                       : 'application/json; charset=UTF-8',
            				'Authorization' : 'Bearer ' + _tokenAcesso }
            		}).then(function successCallback(response){
            			return success(response.data);
            		}, function errorCallback(data){
            			return failure(data);
            		});  
            	}
            	
            });
        }

        function autenticarContaPessoaFisica(_contaSelecionada, _senhaConta, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
            	url+= '/oauth/token';
            	
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	      'Authorization'                      : 'Basic ZXlKcFpDSTZJamsyT0RnaUxDSmpiMlJwWjI5UWRXSnNhV05oWkc5eUlqb3hMQ0pqYjJScFoyOVRiMlowZDJGeVpTSTZNU3dpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJalZsTnpOa1pETXRZekExWVMwME5HSTJMVGd4T0RRdE4yWTJNRFF5T1NJc0ltTnZaR2xuYjFCMVlteHBZMkZrYjNJaU9qRXNJbU52WkdsbmIxTnZablIzWVhKbElqb3hMQ0p6WlhGMVpXNWphV0ZzU1c1emRHRnNZV05oYnlJNk1Td2ljMlZ4ZFdWdVkybGhiRU55WldSbGJtTnBZV3dpT2pGOQ==',
                    	      'x-br-com-bb-oat-tipo-identificador' : 'agencia_conta_titularidade',
                    	      'x-br-com-bb-oat-tipo-credencial'    : 'senha_conta'
                    },
                    withCredentials: true,
                    data: { "grant_type" : "password",
                    	    "username"   :  _contaSelecionada.agencia.replace(/\-/g, "") + '_' + _contaSelecionada.conta.replace(/\-/g, "") + '_1',
             				"password"   : _senhaConta,
             				"scope"      : "oauth.autorizacao" },
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function successCallback(response){
                	return success(response.data);
                }, function errorCallback(data){
               		return failure(data.data);
                }); 
            });
        }

        function autenticarContaPessoaJuridica(_agencia, _conta, _titularidade, _chave, _propriedade015, _senhaConta, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
            	url+= '/oauth/token';
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	      'Authorization'                      : 'Basic ZXlKcFpDSTZJamsyT0RnaUxDSmpiMlJwWjI5UWRXSnNhV05oWkc5eUlqb3hMQ0pqYjJScFoyOVRiMlowZDJGeVpTSTZNU3dpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJalZsTnpOa1pETXRZekExWVMwME5HSTJMVGd4T0RRdE4yWTJNRFF5T1NJc0ltTnZaR2xuYjFCMVlteHBZMkZrYjNJaU9qRXNJbU52WkdsbmIxTnZablIzWVhKbElqb3hMQ0p6WlhGMVpXNWphV0ZzU1c1emRHRnNZV05oYnlJNk1Td2ljMlZ4ZFdWdVkybGhiRU55WldSbGJtTnBZV3dpT2pGOQ==',
                    	      'x-br-com-bb-oat-tipo-identificador' : 'chave_agencia_conta_titularidade',
                    	      'x-br-com-bb-oat-tipo-credencial'    : 'senha_conta',
                    	      'x-br-com-bb-prop.15'                : _propriedade015
                    },	 
                    data: { "grant_type" : "password",
             				"username"   :  _chave + '_' + _agencia + '_' + _conta + '_' + _titularidade,
             				"password"   : _senhaConta,
             				"scope"      : "oauth.autorizacao" },
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function(res) {
                    return success(res.data);
                }).catch(function (err) {
                    return failure(err.data);
                });                
            });            	
        }

        function autenticarPessoaFisica(_agencia, _conta, _titularidade, _senhaAutoatendimento, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
            	url+= '/oauth/token';
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {
                    	'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	'Authorization'                      : 'Basic ZXlKcFpDSTZJamsyT0RnaUxDSmpiMlJwWjI5UWRXSnNhV05oWkc5eUlqb3hMQ0pqYjJScFoyOVRiMlowZDJGeVpTSTZNU3dpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJalZsTnpOa1pETXRZekExWVMwME5HSTJMVGd4T0RRdE4yWTJNRFF5T1NJc0ltTnZaR2xuYjFCMVlteHBZMkZrYjNJaU9qRXNJbU52WkdsbmIxTnZablIzWVhKbElqb3hMQ0p6WlhGMVpXNWphV0ZzU1c1emRHRnNZV05oYnlJNk1Td2ljMlZ4ZFdWdVkybGhiRU55WldSbGJtTnBZV3dpT2pGOQ==',                    	      
                    	'x-br-com-bb-oat-tipo-identificador' : 'agencia_conta_titularidade',
                    	'x-br-com-bb-oat-tipo-credencial'    : 'senha_autoatendimento',                    	      
                    },	 
                    data: 
                    	{ 
                    		"grant_type" : "password",                    	
                    	    "username"   :  _agencia.replace(/\-/g, "") + '_' + _conta.replace(/\-/g, "") + '_1',
             				"password"   : _senhaAutoatendimento,
             				"scope"      : "oauth.autorizacao" 
             			},
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function(res) {
                    return success(res.data);
                }).catch(function (err) {
                    return failure(err.data);
                });  
            });
        }
        

        function concederAutorizacaoPessoaJuridica(_tokenAcesso, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);            	
            	url+= '/oauth/authorize';
            	
            	var data = { "response_type"  : _solicitacaoAutorizacao.responseType,
         				"client_id"      : _solicitacaoAutorizacao.clientId,
         				"redirect_uri"   : _solicitacaoAutorizacao.redirectUri,
         				"scope"          : _solicitacaoAutorizacao.scope,
         				"no_redirect"    : true,
         				"state"          : _solicitacaoAutorizacao.state,
         				"nonce"          : _solicitacaoAutorizacao.nonce
 				};
            	
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	      'Authorization'                      : 'Bearer ' + _tokenAcesso,
                    },	 
                    data: data,
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function(res) {
                    return success(res);
                }).catch(function (err) {
                    return failure(err.data);
                }); 
                
            });
        }
        

        function concederAutorizacaoPessoaFisica(_tokenAcesso, _solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
            	var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
            	url+= '/oauth/authorize';
                $http({	
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type'                       : 'application/x-www-form-urlencoded',
                    	      'Authorization'                      : 'Bearer ' + _tokenAcesso,
                    },	 
                    data: { "response_type"  : _solicitacaoAutorizacao.responseType,
             				"client_id"      : _solicitacaoAutorizacao.clientId,
             				"redirect_uri"   : _solicitacaoAutorizacao.redirectUri,
             				"scope"          : _solicitacaoAutorizacao.scope,
             				"no_redirect"    : true,
             				"state"          : _solicitacaoAutorizacao.state},
             		transformRequest: function(obj) {
             		        var str = [];
             		        for(var p in obj)
             		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             		        return str.join("&");
             		}
                }).then(function successCallback(response){
                	return success(response);
                }, function errorCallback(data){
            		return failure(data.data);
                });  
            });
        }

        function solicitarAutorizacao(_solicitacaoAutorizacao) {
            return new Promise(function (success, failure) {
                var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
                var complementos = getComplementos(_solicitacaoAutorizacao);

                url+= '/oauth/authorize?' + complementos;
            	$http({
            		method: 'GET',
            		url: url
            	}).then(function(res) {
            		return success(res.data);
            	}).catch(function (err) {
            		return failure(err.data);
            	});
            });
        }
        function solicitarAutorizacaoConcessao(_solicitacaoAutorizacao, _tokenAcesso) {
        	return new Promise(function (success, failure) {
        		var url = getEnderecoServidorAutorizacao(_solicitacaoAutorizacao.ambiente);
        		var complementos = getComplementos(_solicitacaoAutorizacao);
        		
        		url+= '/oauth/authorize/concessao?' + complementos;
        		$http({
        			method: 'GET',
        			url: url,
        			headers: {'Content-Type'   : 'application/x-www-form-urlencoded',
        				'Authorization'  : 'Bearer ' + _tokenAcesso,
        			},
        			
        		}).then(function(res) {
        			return success(res.data);
        		}).catch(function (err) {
        			return failure(err.data);
        		});
        	});
        }
        
        function tratarListarPermissoes (_processoAutorizacao) {
        	var permissoes = {};
        	permissoes.lista = [];
        	if (!_processoAutorizacao) return;
        	if (!_processoAutorizacao.decisaoAutorizacao) return;
        	
        	var permissoesSolicitadas =_processoAutorizacao.decisaoAutorizacao.permissoes;
        	var permissoesConcedidas = _processoAutorizacao.decisaoAutorizacao.permissoes_concedidas;
        	var haPermissoesParaSolicitar = false;
        	
        	for (var i = 0; i < permissoesSolicitadas.length; i++) {
        		var obj = {};
        		obj.nome = permissoesSolicitadas[i].nome;
        		obj.descricao = permissoesSolicitadas[i].descricao;
        		
        		var filtro = $filter('filter')(permissoesConcedidas, {nome : permissoesSolicitadas[i].nome}, true)[0];
        		if (filtro) {
        			obj.concedido = true;
        		} else {
        			obj.concedido = false;
        			haPermissoesParaSolicitar = true;
        		}
        		permissoes.lista.push(obj);
        	}
        	permissoes.haPermissoesParaSolicitar = haPermissoesParaSolicitar;
        	return permissoes;
        }
        
    	function getDevAppKey(){
    		var devAppKey = $cookies.get('oatDevAppKey')
    		return devAppKey;
        }
        
        function getEnderecoServidorAutorizacao(){
    		var endereco = $cookies.get('oatSrvAutorizacao')
    		if (!endereco) {
    			endereco = URL_SERVIDOR_AUTORIZACAO_PRODUCAO;
    		}
    		return endereco;
        }

    	function getEnderecoServidorAPI(){
    		var endereco = $cookies.get('oatSrvApi');
    		if (!endereco) {
    			if ($cookies.get('oatDevAppKey')) {
    				endereco = URL_SERVIDOR_API_PRODUCAO;
    			} else {
    				endereco = URL_SERVIDOR_API2_PRODUCAO;
    			}
    		}
    		return endereco;
    	}
    }
/* Fim da oauthBBServices */
    
    function getComplementos (_solicitacaoAutorizacao) {
        var complementos = "";
        
        if (_solicitacaoAutorizacao.responseType !== null && _solicitacaoAutorizacao.responseType !== undefined){
        	if (complementos != "") complementos += "&";
        	complementos+= "response_type=" + _solicitacaoAutorizacao.responseType;
        }
        if (_solicitacaoAutorizacao.clientId !== null && _solicitacaoAutorizacao.clientId !== undefined){
        	if (complementos != "") complementos += "&";
        	complementos+= "client_id=" + _solicitacaoAutorizacao.clientId;
        }
        if (_solicitacaoAutorizacao.redirectUri !== null && _solicitacaoAutorizacao.redirectUri !== undefined){
        	if (complementos != "") complementos += "&";
        	complementos+= "redirect_uri=" + _solicitacaoAutorizacao.redirectUri;
        }
        if (_solicitacaoAutorizacao.scope !== null && _solicitacaoAutorizacao.scope !== undefined){
        	if (complementos != "") complementos += "&";
        	complementos+= "scope=" + _solicitacaoAutorizacao.scope;
        }
        if (_solicitacaoAutorizacao.state !== null && _solicitacaoAutorizacao.state !== undefined){
        	if (complementos != "") complementos += "&";
        	complementos+= "state=" + _solicitacaoAutorizacao.state;
        }
        return complementos;
    }
    
    function tratarErros (_respostaErro, msgDefault) {
    	var retornoErro = null;

    	if (_respostaErro) {
    		if (_respostaErro.error_description) {
    			retornoErro  = _respostaErro.error_description;
    		} else {
    			if (_respostaErro.data) {
    				// Tratamento de Exception para OAuth Nivel data
					if (typeof _respostaErro.data === 'string') {
						retornoErro = _respostaErro.data;
					} else {
						if (_respostaErro.data.erro && _respostaErro.data.error_description) {
							retornoErro = _respostaErro.data.error_description; 
						} else {
							if (_respostaErro.data.error) {
								if (_respostaErro.data.error.message) {
									//Tratamento API Gateway
									retornoErro = _respostaErro.data.error.message; 
								} else {
									//Tratamento API erro Token
									retornoErro  = _respostaErro.data.error_description;
								}
							} else {
								retornoErro = msgDefault;
							}
						} 
					}
    			} else {
    				retornoErro = msgDefault;
    			}
    		}
    	}  else {
			retornoErro = msgDefault;
    	}
    	
    	if (!retornoErro) {
    		retornoErro = "Erro não definido";
    	}
    	return retornoErro;
    }
})();