function imprime(){
    var nome = "tabela";
    var nome2 = "celulinha";
    var nome3 = "celulao";
    for(var i = 1;i<10;i++){
        document.write("<table border=" + 1 + " id=" + nome + ">");
        document.write("<thead>");
        document.write("<tr>");
        document.write("<td id =" + nome3 + ">Produtos de " + i + "</td>");
        document.write("</tr>");
        
        document.write("</thead>");
        document.write("<tbody>");
        
        for(var j=1; j<10;j++){
            document.write("<tr>");
            document.write("<td id =" + nome2 + ">" + i + "x" + j + "</td>");
            var resultado = j * i;
            document.write("<td>" + resultado + "</td>");
            document.write("</tr>");
        }
        
        document.write("</tbody>");
        
        document.write("</table>");
    }
    /*
    
    */
}