window.controllerStudents = {
    validator: {
        validate: function(data) {
            error = {
                mistaken: false,
                fname: '',
                patronymic: '',
                lname: '',
                born: '',
                fac: '',
                start: '',
            };
            let start = new Date(data.scratch);
            let now = new Date();
            let born = new Date(data.born);
            if (data.fname.trim() === '') {
                error.fname = 'Имя не может быть пустым';
                error.mistaken = true;
            }
            if (data.patr.trim() === '') {
                error.patronymic = 'Отчество является обязательным для заполнения';
                error.mistaken = true;
            }
            if (data.lname.trim() === '') {
                error.lname = 'Фамилия обязательна для заполнения';
                error.mistaken = true;
            }
            if (data.facultet.trim() === '') {
                error.fac = 'Факультет обязателен для заполнения';
                error.mistaken = true;
            }
            if (start.getFullYear() < 2000 ||
                start.getFullYear() > now.getFullYear()) {
                error.start = "год начала обучения должен быть не менее 2000 и не более " + now.getFullYear() + ". вы ввели " + start.getFullYear();
                error.mistaken = true;
            }
            if (born < new Date(1900, 0, 1) || born > new Date()) {
                error.mistaken = true;
                error.born = "Дата рождения не должна быть раньше 01.01.1900 и позднее " + formatDate(now) + ". вы ввели " + formatDate(start);
            }
            return error;
        }
    },


    execute: function(model, view) {
        view.setController(this);
        view.showTable(document.querySelector('.table-container'), model.students);
        view.showButtonNewStudent(document.querySelector('.form-new-student-container'));
    },

    createNewStudent: function(data) {

    },
};