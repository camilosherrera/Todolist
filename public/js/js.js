var nomServicios = [
                        {
                            servicio    :   "Trae todas las tareas",
                            urlServicio :   "getAllTask",
                            metodo      :   "GET"
                        },
                        {
                            servicio    :   "Crear una nueva tarea",
                            urlServicio :   "createTask",
                            metodo      :   "POST"
                        },
                        {
                            servicio    :   "Editar una tarea",
                            urlServicio :   "updateTask",
                            metodo      :   "PUT"
                        },
                        {
                            servicio    :   "Eliminar Tarea",
                            urlServicio :   "deleteTask",
                            metodo      :   "DELETE"
                        },
                        {
                            servicio    :   "Trae una sola tarea",
                            urlServicio :   "getTask",
                            metodo      :   "GET"
                        }
                    ];

var consumeServicios = function(tipo, val, callback)
{
    var servicio = {
                        url     : nomServicios[tipo - 1].urlServicio,
                        metodo  : nomServicios[tipo - 1].metodo,
                        datos   : ""
                    };
    if(tipo === 4 || tipo === 5)
    {
        servicio.url += "/" + val;
    }
    else
    {
        servicio.datos = val !== "" ? JSON.stringify(val) : "";
    }
    //Invocar el servicio...
    $.ajax(
    {
        url         : servicio.url,
        type        : servicio.metodo,
        data        : servicio.datos,
        dataType    : "json",
        contentType: "application/json; charset=utf-8"
    }).done(function(data)
    {
        callback(data);
    });
};


$(document).ready(function () {
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var todos = [];
        consumeServicios(1, "", function(data){
            todos = data;
        });
    }

    $('#formato').submit(function () {
        if ($('#tarea').val() !== "") {
            var id = "task-" + i;
            var mensaje = $('#tarea').val();

            var newToDo = {finish : false, task : "Nueva tarea"};
            consumeServicios(2, newToDo, function(data){
                todos.push(data);
            });
            localStorage.setItem(id, mensaje);
            $('#lista').append("<li class='task' id='" + id + "'>" + mensaje + "</li>");
            var task = $('#' + id );
            task.css('display', 'none');
            task.slideDown();
            $('#tarea').val("");
            i++;
        }
        return false;
    });






    $('#lista').on("click", "li", function (event) {
        self = $(this);
        id = self.attr('id');
        consumeServicios(4, "id", function(data){
            console.log("Eliminada, actualizar to-do");
        });
        self.slideUp('slow', function () {
        });

    });

});