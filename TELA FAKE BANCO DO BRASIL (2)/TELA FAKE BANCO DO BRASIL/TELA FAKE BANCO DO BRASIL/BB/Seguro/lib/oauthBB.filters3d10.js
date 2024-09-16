/*
 * oauthBB.filters 
 * versão 1.0.1
 * 
 */

angular.module('oauthBB').filter('mod11CalculaDigito', function () {
    return function (dadoBruto) {
        if (!dadoBruto) { return ''; }

        var valorBruto = dadoBruto.toString().trim().replace(/^\+/, '');

        if (valorBruto.match(/[^0-9]/)) {
            return valorBruto;
        }
        if (valorBruto.length > 1) {
	        var x10 = true;
		    var soma = 0;
		    var mult = 2;
		    var limMult = 9;
		    var dig;
		    
		    for(var i=valorBruto.length-1; i>=0; i--){
		      soma += (mult * parseInt(valorBruto.charAt(i)));
		      if(++mult > limMult) mult = 2;
		    }
		    dig = ((soma * 10) % 11) % 10;
		    
		    if(dig == 10) dig = "X";
		    
        }else{
        	valorBruto;
        }

        return valorBruto + "-" + dig;
    };
});
