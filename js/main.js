$(document).ready(function() {

  // READ
  $.ajax({
    "url":"http://157.230.17.132:3031/todos",
    "method": "GET",
    "success": function(data) {
      render(data);
    },
    "error": function(err) {
      alert ("ATTENZIONE: errore chiamata ajax!");
    }
  });

  // CREA / al click sull'icona new aggiunge l'elemento digitato in input
  $(".wrapper").on("click", ".add-new", function(){
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
          console.log(data);
          var tempElement = [];
          data.push(tempElement);
          render(data);
        },
        "error": function(err) {
          alert ("ATTENZIONE: errore chiamata ajax!");
        },
      });
    }
  });

  // DELETE / evento click sulla X per cancellare
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
      elm.remove;
      },
      "error": function(err) {
        alert ("ATTENZIONE: errore chiamata ajax!");
      }
    });
  });


  // UPDATE

  // funzione che riceve in argomento il risultato del GET alla chiamata Api e lo stampa a video
  function render(data) {
    console.log(data);
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

});
