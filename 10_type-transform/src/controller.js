window.controllerStudents = {
    execute: function(model, view) {
        let container = document.querySelector('.container');
        view.showTable(container, model.students);
    },
};