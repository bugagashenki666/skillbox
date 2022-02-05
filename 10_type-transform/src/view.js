window.viewStudents = {
    HEADER: `<thead>
        <tr>
          <th class="fio" role="button">ФИО</th>
          <th class="fac" role="button">Факультет</th>
          <th class="age" role="button">ДР и возраст</th>
          <th class="years" role="button">Годы обучения</th>
        </tr>
    </thead>`,

    controller: null,

    setController: function(controller) {
        this.controller = controller;
    },

    fioClick: function() {
        console.log('fioClick');
    },

    facClick: function() {
        console.log('facClick');
    },

    ageClick: function() {
        console.log('ageClick');
    },

    yearsClick: function() {
        console.log('yearsClick');
    },

    setHandler: function(object, event, observer) {
        object.addEventListener(event, observer);
    },

    showTable: function(container, studentsData) {
        container.innerHTML = this.renderStudentsTable(studentsData);
        this.setHandler(document.querySelector('.fio'), 'click', this.fioClick);
        this.setHandler(document.querySelector('.fac'), 'click', this.facClick);
        this.setHandler(document.querySelector('.age'), 'click', this.ageClick);
        this.setHandler(document.querySelector('.years'), 'click', this.yearsClick);
    },

    renderStudentsTable: function(studentsData) {
        const table = `<table class="table table-hover">` +
            this.renderHeader() +
            this.renderRows(studentsData) +
            `</table>`;
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

    showButtonNewStudent: function(container) {
        container.innerHTML = this.renderButtonNewStudent();
        this.setHandler(container.querySelector('.btn-new-student'), 'click', this.newStudentClick);
    },

    renderButtonNewStudent: function() {
        return `<button class="btn btn-primary btn-new-student">Создать студента</button>`;
    },

    newStudentClick: function() {
        console.log('newStudentClick');
        viewStudents.showFormNewStudent();
    },

    renderFormNewStudent: function() {
        return `<form>
									<div class="mb-3">
										<input type="text" class="new-first-name form-control" placeholder="Имя">
									</div>
									<div class="mb-3">
										<input type="text" class="new-patronymic form-control" placeholder="Отчество">
									</div>
									<div class="mb-3">
										<input type="text" class="new-last-name form-control" placeholder="Фамилия">
									</div>
									<div class="mb-3">
										<input type="date" class="new-born-date form-control" placeholder="дата рождения">
									</div>
									<div class="mb-3">
										<input type="number" class="new-start-year form-control" min="1960" max="2100" placeholder="Год начала обучения">
									</div>
									<div class="mb-3">
										<input type="text" class="new-facultet form-control" placeholder="Факультет">
									</div>
									<div class="mb-3">
										<button class="btn btn-primary btn-create-new-student">Создать</button>
									</div>
								</form>`;
    },

    showFormNewStudent: function() {
        let container = document.querySelector('.form-new-student-container');
        container.innerHTML = this.renderFormNewStudent();
        this.setHandler(container.querySelector('.btn-create-new-student'),
            'click', this.btnCreateStudentClick);
    },

    btnCreateStudentClick: function() {
        console.log('btnCreateStudentClick');
    },
};