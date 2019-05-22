function click(){
    var raio = document.getElementById("raio").value;
    console.log(raio);
    circu = 2 * Math.PI * raio;
    raio = raio * raio;
    area = raio * Math.PI;
    var areaOUT = document.getElementById("areaOut");
    var circuOUT = document.getElementById("circuOut");
    
    
}

function teste(){
    document.write("oi");
}

function jack(){
    var raio = document.getElementById("raio").value;
    console.log(raio);
    circu = 2 * Math.PI * raio;
    raio = raio * raio;
    area = raio * Math.PI;
    var areaOUT = document.getElementById("areaOut");
    var circuOUT = document.getElementById("circuOut");
    areaOUT.value = area;
    circuOUT.value = circu;
}