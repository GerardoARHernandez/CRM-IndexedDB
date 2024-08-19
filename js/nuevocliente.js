(function(){
    
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () =>{

        conectarDB();

        formulario.addEventListener('submit', validarCliente);    
    })

      

    function validarCliente(e){
        e.preventDefault();

        //Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' ||telefono === '' ||empresa === '' ) {
            imprimirAlerta('Todos los Campos son Obligatorios', 'error');

            return;
        }

        //Crear un objeto con la información

        const cliente = {
            nombre: nombre, //Como tienen el mismo nombre se puede usar uno solo como abajo:
            email,
            telefono,
            empresa
        }

        cliente.id = Date.now()

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){

        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function(){
           imprimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = function(){
            console.log('Cliente agregado');

            imprimirAlerta('El Cliente se agregó correctamente', 'exito')

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000);
        }
    }

    

})();