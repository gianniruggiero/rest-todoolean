$(document).ready(function() {

  // READ
  readList();

  // CREA / al click sull'icona new aggiunge l'elemento digitato in input
  $(".wrapper").on("click", ".add-new", function(){
    addElement()
  });

  // CREA / all'ENTER digitato da tastiera
  $("#input-new-element").keyup(function(e){
    // controlla che sia stato digitato enter e l'inpunt di ricerca non sia vuota
    if (e.keyCode == 13 && !$("#input-new-element").val() =="" ) {
      // aggiunge un nuovo elemento alla lista
      addElement()
    }
  });

  // MODIFICA / all'ENTER digitato da tastiera
  $("#input_edit").keyup(function(e){
    // controlla che sia stato digitato enter e l'inpunt di ricerca non sia vuota
    if (e.keyCode == 13 && !$("#input_edit").val() =="" ) {
      // aggiunge un nuovo elemento alla lista
      editElement()
    }
  });


  // PATCH / al click sull'icona new aggiunge l'elemento digitato in input
  $(".wrapper").on("click", ".modifica", function(){
    var elm = $(this).parent();
    // recupero id dell'elemento dal data-attribute
    var id = elm.attr("id");
    var textInput = elm.children("#text-work").text();
    // apre la modale di modifica
    $(".edit_panel").addClass("active");
    // trasmette la stringa dell'elemento della lista digitato all'input della modale
    $("#input_edit").val(textInput);
    $("#input_edit").attr("data-id", id);
  });

  // click su Annulla della modale di modifica
  $(".btn-annulla").click(function(){
    $(".edit_panel").removeClass("active");
  });

  // click su Modifica
  $(".btn-modifica").click(function(){
     editElement();
  });

  // DELETE / evento click sull'icona per cancellare
  $(".wrapper").on ("click", ".delete", function (){
    // alert ("CLICK sul cestino");
    var elm = $(this).parent();
    // recupero id dell'elemento dal data-attribute
    var id = elm.attr("id");
    // DELETE chiamata Ajax
    $.ajax({
      "url":"http://157.230.17.132:3031/todos/" + id,
      "method": "DELETE",
      "success": function(data) {
      // per cancellare subito dal DOM e da video l'elemento
      elm.css("background", "red");
      readList();
      },
      "error": function(err) {
        alert ("ATTENZIONE: errore chiamata ajax!");
      }
    });
  });
  // UPDATE

// fine del document ready
});

function readList() {
  // pulisce la input
  $("#input-new-element").val("");
  // READ
  $.ajax({
    "url":"http://157.230.17.132:3031/todos",
    "method": "GET",
    "success": function(data) {
      // cancella la lista attuale
      $("#to-do-list").html("");
      render(data);
    },
    "error": function(err) {
      alert ("ATTENZIONE: errore chiamata ajax!");
    }
  });
}


function editElement() {
  $(".edit_panel").removeClass("active");
  // PATCH, modifica un elemento già presente nella lista
  var editedElement = $("#input_edit").val();

  if (editedElement != "") {
    var id = $("#input_edit").attr("data-id");
    // chiamata AJAX metodo PATCH
    $.ajax({
      "url":"http://157.230.17.132:3031/todos/" + id,
      "method": "PATCH",
      "data": {
        text: editedElement,
      },
      "success": function(data) {
        readList();
      },
      "error": function(err) {
        alert ("ATTENZIONE: errore chiamata ajax!");
      }
    });
  }
}

// funzione che riceve in argomento il risultato del GET alla chiamata Api e lo stampa a video
function render(data) {
  // seleziona  il template da utilizzare
  var source = $("#elm-template").html();
  // compila il template selezionato con Handlebars
  var template = Handlebars.compile(source);
  // ciclo che manipola il context per ogni elemento di data da stampare
  for (var i = 0; i < data.length; i++) {
    var liBckColor;
    if (i % 2 > 0) {
      // dispari
      liBckColor = "color1"
    } else {
      // pari
      liBckColor = "color2"
    }
    var context = {
      "id": data[i].id,
      "text": data[i].text,
      "bck-color": liBckColor
    };
    // compila il template con il context manipolato
    var html = template(context);
    // inietta il codice Html manipolato nel DOM
    $("#to-do-list").append(html);
  }
};


function addElement () {
  // CREATE aggiunge un nuovo elemento alla lista
  var newElement = $("#input-new-element").val();
  if (newElement != "") {
    $.ajax({
      "url":"http://157.230.17.132:3031/todos",
      "method": "POST",
      "data": {
        text: newElement,
      },
      "success": function(data) {
        readList();
      },
      "error": function(err) {
        alert ("ATTENZIONE: errore chiamata ajax!");
      },
    });
  }
}
