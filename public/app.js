$(document).ready(function () {
  // LIST TODOS
  $.getJSON("/api/notes").then(addTodos);

  // CREATE note
  $(".saveLink").on("click", function (event) {
    event.preventDefault();
    var usrInput = $("#noteInput").val();
    var canvas = document.getElementById("canvasId");
    var blankCanvas = document.getElementById("blankCanvas");

    if (usrInput !== "" && canvas.toDataURL() !== blankCanvas.toDataURL()) {
      $.post("/api/notes", { title: usrInput, image: event.target.href })
        .then(function (newTodo) {
          $("#noteInput").val("");
          var canvas = document.getElementById("canvasId");
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);

          addTodo(newTodo);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      alert("Please provide a title and a painting for your note");
    }
  });

  // DELETE TODO
  $(".list").on("click", "span", function (event) {
    // look for spans that are dinamically added
    event.stopPropagation();
    removeTodo($(this).closest("li"));
  });
});

function addTodos(todos) {
  //list todos on the page
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  // list todo
  var newTodo = $(`
    <li class="note">
      <h3>${todo.title} <span>X</span></h3>
      <img src=${todo.image}>
    </li>`);
  newTodo.data("id", todo._id);
  $(".list").append(newTodo);
}

function removeTodo(todo) {
  // remove todo
  var clickedId = todo.data("id");
  var deleteUrl = "/api/notes/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl,
  })
    .then(function (data) {
      todo.remove();
    })
    .catch(function (err) {
      console.log(err);
    });
}
