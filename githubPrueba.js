/**
 * Created by mazp on 18/11/15.
 */

// ESTO ES BASICO PARA PODER ENTRAR A LA API DEL GITHUB

var API_BASE_URL = "https://api.github.com";
var USERNAME = "marcelusDSA";
var PASSWORD = "marcelusDSA1";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});




//GET
// LISTA DE REPOSITORIO. COMO ACCION APRERAR UN BOTON CON ID Y LISTAR
$("#button_get_repos").click(function(e) {
    e.preventDefault();
    getRepos();
});

//METODO:
function getRepos() {
    var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
    $("#repos_result").text('');

    $.ajax({
        url : url,
        type : 'GET',
        crossDomain : true,
        dataType : 'json',
    }).done(function(data, status, jqxhr) {
        var repos = data;

        $.each(repos, function(i, v) {
            var repo = v;

            $('<br><strong> Name: ' + repo.name + '</strong><br>').appendTo($('#repos_result'));
            $('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
            $('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
            $('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
        });


    }).fail(function() {
        $("#repos_result").text("No repositories.");
    });

}


//GET
// SOLO UNA LISTA EN CONCRETO. RECOGEMOS UNU VALOR Y SE LO PASAMOS A LA URL Y APRETAMOS
//BPOTON PARA COMENZAR LA ACCTION.

$("#button_get_repo").click(function(e) {
    e.preventDefault();
    getRepo($("#repository_name").val());
});

//METODO:

function getRepo(repository_name) {
    var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
    $("#get_repo_result").text('');

    $.ajax({
        url : url,
        type : 'GET',
        crossDomain : true,
        dataType : 'json',
    }).done(function(data, status, jqxhr) {

        var repo = data;

        $("#get_repo_result").text('');
        $('<strong> Name: ' + repo.name + '</strong>').appendTo($('#get_repo_result'));
        $('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#get_repo_result'));
        $('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#get_repo_result'));
        $('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#get_repo_result'));

    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
    });

}


// CREAR,
// EN ESTE CASO TENEMOS DOS IMPUTS Y EL BOTON DE ACCION.

$("#button_to_create").click(function(e) {
    e.preventDefault();

//    SE CREA UN NEVO OBJETO REPOSITORIO


    var newRepo = new Object();
    newRepo.name = $("#repository_name_to_create").val();
    newRepo.description = $("#description_to_create").val();
    newRepo.homepage = "https://github.com";
    newRepo.private = false;
    newRepo.has_issues = true;
    newRepo.has_wiki = true;
    newRepo.has_downloads = true;

    //LE PASAMOS TODO UN OBJETO CON TODOS DOS ATRIBUTOS Y LOS QUE SON POR DEFECTO.
    createRepo(newRepo);
});

//METODO:


function createRepo(repository) {
    var url = API_BASE_URL + '/user/repos';

    //INTERPRETA JSON A DATOS.
    var data = JSON.stringify(repository);

    $("#create_result").text('');

    $.ajax({
        url : url,
        type : 'POST',
        crossDomain : true,
        dataType : 'json',
        data : data,
    }).done(function(data, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));
    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
    });

}

// EDIT
//EN ESTE CASO TENEMOS QUE TRES IMPUTS QUE DAR, NOMBRE, DESCRIPCION Y NOMBRE PARA PORDER
//GUARDAR LOS CAMBIOS.

$("#button_edit_repo").click(function(e) {
    e.preventDefault();

    var newRepo = new Object();
    newRepo.name = $("#repository_name_to_edit").val()
    newRepo.description = $("#description_to_edit").val()

    updateRepo(newRepo);
});
//METODO:

function updateRepo(repository) {
    var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository.name;
    var data = JSON.stringify(repository);

    $("#update_result").text('');

    $.ajax({
        url : url,
        type : 'PATCH',
        crossDomain : true,
        dataType : 'json',
        data : data,
        statusCode: {
            404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
        }
    }).done(function(data, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_result"));
    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
    });

}
