window.todoApp || (window.todoApp = {});

(function(){
  var template = '<li data-controller="TodosCtrl" ' +
                     'data-action="Show">' +
    '<div class="view">' +
      '<input class="edit" type="checkbox" />' +
      '<label data-bind="task"></label>' +
      '<button class="destroy"></button>' +
    '</div>' +
    '<input class="edit" value="{{}}" />' +
  '</li>';

  function Todo(args){
    this.task = args.task;
  }

  Todo.prototype.view = function(){
    return new DOMParser().parseFromString(
      template.replace(/\{\{\}\}/gm, this.task),
      "text/xml"
    ).firstChild;
  }

  todoApp.Todo = Todo;
})();
