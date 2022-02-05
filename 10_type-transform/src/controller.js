window.controllerStudents = {
    execute: function(model, view) {
        view.setController(this);
        view.showTable(document.querySelector('.table-container'), model.students);
        view.showButtonNewStudent(document.querySelector('.form-new-student-container'));
    },
};