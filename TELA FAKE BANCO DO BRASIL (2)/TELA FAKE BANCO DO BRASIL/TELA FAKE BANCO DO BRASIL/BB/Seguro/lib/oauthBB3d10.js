/*
 * oauthBB 
 * versão 1.0.1
 * 
 */

(function () {
    'use strict';
    

    var oauthBB = angular.module('oauthBB',['oauthBB.services','oauthBB.values','ngRoute','ngMaterial','ngCookies']);

    oauthBB.config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;

        var selecaoPerfil = {
            templateUrl : 'views/selecaoPerfil.html',
            controller : 'selecaoPerfilCtrl',
            controllerAs : 'vm'
        };

        var autenticacaoPessoaJuridica = {
            templateUrl : 'views/autenticacaoPJ.html',
            controller : 'autenticacaoPessoaJuridicaCtrl',
            controllerAs : 'vm'
        };

        var autorizacaoPessoaJuridica = {
            templateUrl : 'views/autorizacaoPJ.html',
            controller : 'autorizacaoPessoaJuridicaCtrl',
            controllerAs : 'vm'
        };

        var autenticacaoPessoaFisica = {
            templateUrl : 'views/autenticacaoPF.html',
            controller : 'autenticacaoPessoaFisicaCtrl',
            controllerAs : 'vm'
        };

        var autorizacaoPessoaFisica = {
            templateUrl : 'views/autorizacaoPF.html',
            controller : 'autorizacaoPessoaFisicaCtrl',
            controllerAs : 'vm'
        };

        var autorizacaoConsultarPessoaFisica = {
            templateUrl : 'views/autorizacaoConsultarPF.html',
            controller : 'autorizacaoConsultarPessoaFisicaCtrl',
            controllerAs : 'vm'
        };

        $routeProvider
            .when('/', selecaoPerfil)
            .when('/autenticacao/pessoa-juridica', autenticacaoPessoaJuridica)
            .when('/autorizacao/pessoa-juridica',autorizacaoPessoaJuridica)
            .when('/autenticacao/pessoa-fisica', autenticacaoPessoaFisica)
            .when('/autorizacao/pessoa-fisica', autorizacaoPessoaFisica)
//            .when('/autorizacao/consultar/pessoa-fisica', autorizacaoConsultarPessoaFisica)
            .otherwise(selecaoPerfil);
    });
    
})();
