//Atrapamos todos los elementos que vayan a interactuar con el JS
var input = document.getElementById("newTaskInput");
var button = document.getElementById("addTaskBtn");
var tbody = document.getElementById("tbody");
var counter = 0;

button.onclick = (event) => {
    event.preventDefault();//Eliminamos cualquier funcionalidad que pueda tener el botón por defecto

    if(input.value != ""){//Mientras el valor del input principal no esté vacío
        counter+=1;
        //Creamos el tr y los tds
        let tr = document.createElement("tr");
        tr.setAttribute("id", "t"+counter);

        let td1 = document.createElement("td");
        td1.classList.add("tarea");//Añadimos la clase que le da un width
        let intputTD = document.createElement("input");//Creamos el input que contendrá lo que pasemos por teclado
        intputTD.setAttribute("type", "text");
        intputTD.setAttribute("readonly", "readonly");//Para que no se pueda escribir
        intputTD.setAttribute("data-tarea", counter);//Para coincidir con su botón correspondiente
        intputTD.classList.add("inputText");//Para indentificarlo con el resto de inputs
        intputTD.value = input.value;//Le añadimos el contenido
        let span = document.createElement("span");
        span.textContent = "x";
        span.setAttribute("data-remove", "t"+counter);
        td1.appendChild(intputTD);//Lo añadimos al padre td
        td1.appendChild(span);

        let td2 = document.createElement("td");
        td2.classList.add("accion");//Añadimos la clase que le da un width
        let updateButton = document.createElement("button");
        updateButton.textContent = "Modificar";
        updateButton.classList.add("update");//Para indentificarlo con el resto de botones
        updateButton.setAttribute("data-tarea", counter);//Para coincidir con su input correspondiente
        td2.appendChild(updateButton);//Lo añadimos al padre td

        //Los añadimos al padre tr
        tr.appendChild(td1);
        tr.appendChild(td2);

        //Lo añadimos al padre tbody
        tbody.appendChild(tr);
        input.value ="";//Vaciamos el contenido del input principal

        //Llamamos a la función en cada click para que los nuevos botones tengan esta funcionalidad
        updateItem();
        removeItem();
    }
}

//Nos creamos una función para modificar el contenido
function updateItem(){
    var updateButton = document.querySelectorAll(".update");

    //recorremos todos los buttons de los tr
    updateButton.forEach((button) => {
        button.onclick = () => {//en el que hayamos hecho click
            document.querySelectorAll(".inputText").forEach((input) => {//Recorremos todos los inputs de los tr
                //Seleccionamos los data que tienen que coincidir
                let dataButton = button.getAttribute("data-tarea");
                let dataInput = input.getAttribute("data-tarea");

                if(input.classList.contains("open")){//Si un inputo contiene la clase abierto
                    input.setAttribute("readonly", "readonly");//Lo cierra para no escribir
                    input.classList.remove("open");//Le quita la clase
                    button.textContent = "Modificar";//Devuelve su texto original al botón
                }else{//de lo contrario
                    if(dataButton == dataInput){//Si los datas coinciden
                        input.removeAttribute("readonly");//Nos permite escribir en él
                        input.classList.add("open");//Le pone la clase abierto
                        button.textContent = "Guardar";//El contenido del botón 
                    }
                }

            });
        }
    });

}

function removeItem(){

    var span = document.querySelectorAll("[data-remove]");

    span.forEach((span) => {

        span.onclick = () => {

            var dataRemove = span.getAttribute("data-remove");

            document.querySelectorAll("tr").forEach((tr) => {

                if(dataRemove == tr.id){
                    tbody.removeChild(tr);
                }

            });
        }
    });
}