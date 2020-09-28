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

  // DELETE / evento click sulla X per cancellare

  // CREATE aggiunge un nuovo elemento alla lista

  // UPDATE

  // funzione che riceve in argomento il risultato del GET alla chiamata Api e lo stampa a video
  function render(data) {
    // seleziona  il template da utilizzare
    var source = $("#elm-template").html();
    // compila il template selezionato con Handlebars
    var template = Handlebars.compile(source);
    // ciclo che manipola il context per ogni elemento di data da stampare
    for (var i = 0; i < data.length; i++) {
      var context = {
        "id": data[i].id,
        "text": data[i].text,
      };
      // compila il template con il context manipolato
      var html = template(context);
      // inietta il codice Html manipolato nel DOM
      $("#to-do-list").append(html);
    }
  };

});
