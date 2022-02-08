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

    orderStudentsByFIO: function() {
        let result = this.students.slice();
        result.sort(
            (a, b) => {
                let str2 = `${b.lastName} ${b.firstName} ${b.patronymic}`;
                let str1 = `${a.lastName} ${a.firstName} ${a.patronymic}`;
                if (str2 < str1) return 1;
                if (str2 > str1) return -1;
                return 0;
            });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, result);
    },

    orderStudentsByFac: function() {
        let result = this.students.slice().sort(
            (a, b) => {
                let str1 = a.fac;
                let str2 = b.fac;
                if (str2 < str1) return 1;
                if (str2 > str1) return -1;
                return 0;
            });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, result);
    },

    orderStudentsByAge: function() {
        let result = this.students.slice().sort(
            (a, b) => {
                return b.bornDate - a.bornDate;
            });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, result);
    },

    orderStudentsByStart: function() {
        let result = this.students.slice().sort(
            (a, b) => {
                return b.startYear - a.startYear;
            });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, result);
    },

    filter: function(filter) {
        const fio = filter.fio;
        const fac = filter.fac;
        const start = filter.start;
        const finish = filter.finish;

        let result = this.students.
        slice().
        filter(
            function(studs) {
                let fullName = `${studs.lastName} ${studs.firstName} ${studs.patronymic}`;
                if (fio !== '')
                    if (!fullName.toLowerCase().includes(fio)) return false;
                if (fac !== '')
                    if (!studs.fac.toLowerCase().includes(fac)) return false;
                if (start !== null)
                    if (start !== studs.startYear) return false;
                if (finish !== null)
                    if (finish !== studs.startYear + 4) return false;
                return true;
            });
        this.controller.execute(this.controller.commands.CMD_REPAINT_TABLE_STUDENTS, result);
    },
};