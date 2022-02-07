window.modelStudents = {
    students: [{
            firstName: 'Гадя',
            patronymic: 'Петрович',
            lastName: 'Хренова',
            bornDate: new Date(2001, 10, 17),
            startYear: 2019,
            fac: "КВН",
        },
        {
            firstName: 'Гарри',
            patronymic: 'Джеймс',
            lastName: 'Поттер',
            bornDate: new Date(1980, 06, 31),
            startYear: 1997,
            fac: "Гриффиндор",
        },
        {
            firstName: 'Адольф',
            patronymic: 'Алоисович',
            lastName: 'Гутлер',
            bornDate: new Date(2002, 08, 12),
            startYear: 2018,
            fac: "факультет русофобии и немцефилии",
        },
    ],

    controller: null,

    setController: function(controller) {
        this.controller = controller;
    },

    createStudent: function(data) {
        this.students.push({
            firstName: data.fname,
            patronymic: data.patr,
            lastName: data.lname,
            bornDate: new Date(data.born),
            startYear: data.scratch,
            fac: data.facultet,
        });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, this.students);
    },
};