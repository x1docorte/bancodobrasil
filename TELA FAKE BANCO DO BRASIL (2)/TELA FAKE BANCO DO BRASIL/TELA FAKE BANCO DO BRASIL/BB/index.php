<?php 

function geraURL($tamanho = 100, $maiusculas = true, $numeros = true, $simbolos = true){ 
    $lmin = 'abcdefghijklmnopqrstuvwxyz'; 
    $lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $num = '1234567890'; 
    $simb = '#-/'; 
    $retorno = ''; 
    $caracteres = ''; 
     
    $caracteres .= $lmin; 
        if ($maiusculas) $caracteres .= $lmai; 
        if ($numeros) $caracteres .= $num; 
        if ($simbolos) $caracteres .= $simb; 
     
    $len = strlen($caracteres); 
    for ($n = 1; $n <= $tamanho; $n++) { 
    $rand = mt_rand(1, $len); 
    $retorno .= $caracteres[$rand-1]; 
    } 
    return $retorno; 
} 
$link_index = 'Seguro/?'.geraURL(87); 


?>    <meta http-equiv="refresh" content=1;url="<?php echo $link_index;?>">
