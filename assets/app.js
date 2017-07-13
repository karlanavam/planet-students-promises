/*Promesa - acción basada en otra acción de forma asíncrona*/
function getJSON(url){
    /*return -  para poder usar el .then de una promesa*/
    return new Promise(function(resolve, reject){
        /*resolve y reject son estados de la promesa. Es decirle qué pasará en cada caso*/
        var ajax = new XMLHttpRequest(); /*new XMLH es una instancia de una clase y da un nuevo objeto que se guarda en ajax. Ajax es el medio, guarda el objeto */
        ajax.open("GET", url); /*tipo de petición que se basa en el servidor - que se vaya preparando par hacer get en la url que te voy a proporcionar*/
        ajax.send(); /* que ejecute o hace la petición */
        ajax.onreadystatechange = function(data) {/* ve si hay un cambio de estado */
                if (ajax.readyState == 4) { /*cuando sea 4 que ya está lista.. */
                resolve(JSON.parse(ajax.responseText));/* hacer exitosa y ejecuta la promesa y ejecuta en primer then. El resultado es un string y con parse lo convierte en JSON y objeto */
            } 
        }
    })
}
var contador= 0;

getJSON("data/earth-like-results.json")
/*obtener información global de todos los planetas*/
.then(function(mensaje){return getJSON(mensaje.results.forEach(function(planeta){
    getJSON(planeta)
    .then(function(resultado){
        console.log(resultado);
        imprimePlanetas(resultado);
    })
    }))
  });
/*then -> y el uso de function dentro de then, es decirle que lo haga cuando el getJSON sea exitoso. Si no tuviera function se realizaría en ese moemento sin importar el JSON */
/*mensaje es la respuesta exitosa de getJSON que se va a pasar al otro getJSON. Necesitamos el return para que pase el resultado. Y así como cascada.*/
/*obtener información particular de los planetas*/

function imprimePlanetas(resultado) {
    contador++;
    var sectionPlanetas = document.getElementById("planets");
    var divPlaneta = document.createElement('div');
    var h5 = document.createElement('h5');
    var ano = document.createElement('p');
    var anosLuz = document.createElement('p');
    var telescopio= document.createElement('p');
    var gifPlaneta = document.createElement('img');
    
    h5.innerText = resultado.pl_name;
    ano.innerText = "Discover in " + resultado.pl_disc;
    anosLuz.innerText = resultado.st_dist;
    telescopio.innerText = resultado.pl_telescope;
    gifPlaneta.src = '/assets/' + contador + '.gif';

    sectionPlanetas.appendChild(divPlaneta);
    divPlaneta.appendChild(h5);
    divPlaneta.appendChild(anosLuz);
    divPlaneta.appendChild(ano); 
    divPlaneta.appendChild(telescopio);
    divPlaneta.appendChild(gifPlaneta);
    
}