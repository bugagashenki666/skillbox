window.viewStudents = {
    HEADER: `<thead class="table-dark">
        <tr>
          <th class="fio">ФИО</th>
          <th class="fac">Факультет</th>
          <th class="age">ДР и возраст</th>
          <th class="years">Годы обучения</th>
        </tr>
    </thead>`,

    fioClick: function() {

    },

    facClick: function() {

    },

    ageClick: function() {

    },

    yearsClick: function() {

    },

    setHandler: function(object, event, observer) {
        object.addEventListener(event, observer);
    },

    showTable: function(container, studentsData) {
        container.innerHTML = this.renderStudentsTable(container, studentsData);
        this.setHandler(document.querySelector('.fio'), 'click', this.fioClick);
        this.setHandler(document.querySelector('.fac'), 'click', this.facClick);
        this.setHandler(document.querySelector('.age'), 'click', this.ageClick);
        this.setHandler(document.querySelector('.years'), 'click', this.yearsClick);
    },

    renderStudentsTable: function(container, studentsData) {
        const table = `<table class="table table-striped">` +
            this.renderHeader() +
            this.renderRows(studentsData) +
            `</table`;
        return table;
    },

    renderHeader: function() {
        return this.HEADER;
    },

    renderRows: function(studentsData) {
        let result = '';
        for (const student of studentsData) {
            result += this.renderRow(student);
        }
        return result;
    },

    formatDate: function(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yyyy = date.getFullYear();

        return dd + '.' + mm + '.' + yyyy;
    },

    isEducated: function(checkedYear) {
        let now = new Date();
        if (checkedYear + 4 < now.getFullYear()) return "закончил";
        if (checkedYear + 4 === now.getFullYear() && now.getMonth() >= 8) return "закончил";
        return (now.getFullYear() - checkedYear) + " курс";
    },

    renderRow: function(studentData) {
        return `<tr>
								<td>${studentData.lastName} ${studentData.firstName} ${studentData.patronymic}</td>
								<td>${studentData.fac}</td>
								<td>${this.formatDate(studentData.bornDate)}
                                (${(new Date()).getFullYear() - studentData.bornDate.getFullYear()})</td>
								<td>${studentData.startYear}-${studentData.startYear + 4} 
										(${this.isEducated(studentData.startYear)})</td>
				</tr>`;
    },

    showFilter: function() {

    },

    showNewStudentForm: function() {

    },

    renderButtonNewStudent: function() {
        let btnNewStudent = `<button>Создать студента</button>`;
    },
};