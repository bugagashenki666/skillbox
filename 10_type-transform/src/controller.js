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
            if (start < 2000 ||
                start > now.getFullYear()) {
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

    commands: {
        CMD_INIT: 0,
        CMD_CREATE_STUDENT: 1,
        CMD_REPAINT_TABLE_STUDENTS: 2,
        CMD_ORDER_STUDENTS_BY_FIO: 3,
        CMD_ORDER_STUDENTS_BY_FAC: 4,
        CMD_ORDER_STUDENTS_BY_AGE: 5,
        CMD_ORDER_STUDENTS_BY_START: 6,
    },

    model: null,
    view: null,

    execute: function(cmd, cmdData = null, model = null, view = null) {
        switch (cmd) {
            case this.commands.CMD_INIT:
                this.model = model;
                this.view = view;
                view.setController(this);
                model.setController(this);
                view.showFilters(document.querySelector('.filter-container'));
                view.showTable(document.querySelector('.table-container'), cmdData);
                view.showButtonNewStudent(document.querySelector('.form-new-student-container'));
                return;
            case this.commands.CMD_CREATE_STUDENT:
                this.model.createStudent(cmdData);
                return;
            case this.commands.CMD_REPAINT_TABLE_STUDENTS:
                this.view.showTable(document.querySelector('.table-container'), cmdData);;
                return;
            case this.commands.CMD_ORDER_STUDENTS_BY_FIO:
                this.model.orderStudentsByFIO();
                return;
            case this.commands.CMD_ORDER_STUDENTS_BY_FAC:
                this.model.orderStudentsByFac();
                return;
            case this.commands.CMD_ORDER_STUDENTS_BY_AGE:
                this.model.orderStudentsByAge();
                return;
            case this.commands.CMD_ORDER_STUDENTS_BY_START:
                this.model.orderStudentsByStart();
                return;
        }
    },
};