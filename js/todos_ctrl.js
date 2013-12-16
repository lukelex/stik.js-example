stik.register("TodosCtrl", "List", function($template, $courier, $viewBag){
  var tpl, todosElms, todos, footer;

  tpl       = $($template);
  todosElms = tpl.getElementById('todo-list');
  footer    = tpl.getElement('footer');

  function updateList(todo){
    $(todo.view()).inject(todosElms);

    stik.bindLazy();
    $courier.$send("bind-todo", todo);

    todosElms.setStyle("display", "block");

    toggleFooter();
  }

  function toggleFooter(){
    var todos = todosElms.getElements('li');

    if (todos.length > 0) {
      footer.setStyle("display", "block");
    } else {
      footer.setStyle("display", "none");
    }

    $viewBag.$render({
      todosSize: todos.length
    });
  }

  $courier.$receive("todo-created", updateList);
});

stik.register("TodosCtrl", "Show", function($template, $viewBag, $courier){
  var tpl = $($template);
  var label = tpl.getElement("label");

  $courier.$receive("bind-todo", function(todo){
    $viewBag.$render(todo);
  });

  label.addEvent("dblclick", function(event){
    event.target.getParent("li").addClass("editing");
  });
});

stik.register("TodosCtrl", "New", function($template, $courier){
  var tpl = $($template);
  var input = tpl.getElement("input");

  input.addEvent("keydown", function(event){
    if (event.key === "enter") {
      var newTodo = new todoApp.Todo({task: event.target.value});

      $courier.$send("todo-created", newTodo);

      input.set("value", "");
    }
  });
});
