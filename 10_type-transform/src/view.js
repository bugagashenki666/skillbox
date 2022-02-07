window.formatDate = function(date, div = '.', order = 'asc') {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yyyy = date.getFullYear();
    if (order === 'asc') return dd + div + mm + div + yyyy;
    if (order === 'desc') return yyyy + div + mm + div + dd;
    return dd + div + mm + div + yyyy;
};

window.viewStudents = {
    HEADER: `<thead>
        <tr>
          <th class="fio" role="button">ФИО</th>
          <th class="fac" role="button">Факультет</th>
          <th class="age" role="button">ДР и возраст</th>
          <th class="years" role="button">Годы обучения</th>
        </tr>
    </thead>`,

    FORM_CREATE_STUDENT: `<form class="row mb-3">
									<fieldset>
										<legend>Новый студент</legend>
										<div class="mb-3 row">
                    	<label for="fname" class="col-sm-2 col-form-label">Имя*</label>
											<div class="col-sm-10 w-50">
												<input type="text" class="new-first-name form-control w-50" placeholder="Имя*" id="fname" name="fname" required>
											</div>
											<div class="col-sm-10 text-danger error-fname w-25">
											</div>
										</div>
										<div class="mb-3 row">
											<label for="patronymic" class="col-sm-2 col-form-label">Отчество*</label>
											<div class="col-sm-10 w-50">
												<input type="text" class="new-patronymic form-control w-50" placeholder="Отчество*" id="patronymic" name="patronymic" required>
											</div>
											<div class="col-sm-10 w-25 text-danger error-patronymic">
											</div>
										</div>
										<div class="mb-3 row">
											<label for="lname" class="col-sm-2 col-form-label">Фамилия*</label>
											<div class="col-sm-10 w-50">
												<input type="text" class="new-last-name form-control w-50" placeholder="Фамилия*" id="lname" name="lname" required>
											</div>
											<div class="col-sm-10 w-25 text-danger error-lname">
											</div>
										</div>
										<div class="mb-3 row">
											<label for="born" class="col-sm-2 col-form-label">Дата рождения*</label>
											<div class="col-sm-10 w-50">
												<input type="date" class="new-born-date form-control w-25" placeholder="дата рождения*" id="born" name="born" value="2000-01-01" min="1900-01-01" max="` + formatDate(new Date(), '-', 'desc') + `" required>
											</div>
											<div class="col-sm-10 w-25 text-danger error-born-date">
											</div>
										</div>
										<div class="mb-3 row">
											<label for="start" class="col-sm-2 col-form-label">Год начала обучения*</label>
											<div class="col-sm-10 w-50">
												<input type="number" class="new-start-year form-control w-25" name="start" min="2000" max="` + new Date().getFullYear() + `" placeholder="Год начала обучения*" id="start" value="2010" required>
											</div>
											<div class="col-sm-10 w-25 text-danger error-start-year">
											</div>
										</div>
										<div class="mb-3 row">
											<label for="fac" class="col-sm-2 col-form-label">Факультет*</label>
											<div class="col-sm-10 w-50">
												<input type="text" class="new-facultet form-control w-50" placeholder="Факультет*" id="fac" name="fac" required>
											</div>
											<div class="col-sm-10 w-25 text-danger error-fac">
											</div>
										</div>
										<div class="mb-3">
											<button type="submit" class="btn btn-primary mb-3 btn-create-new-student w-25 btn-lg">Создать</button>
										</div>
									</fieldset>
		</form>`,

    FILTERS: `<div class="input-group mb-5 p-3">
								<span class="input-group-text">ФИО, факультет, даты начала и окончания обучения</span>
								<input type="text" placeholder="ФИО" aria-label="fio" class="form-control filter-fio">
								<input type="text" placeholder="Факультет" aria-label="fac" class="form-control filter-fac">
								<input type="number" placeholder="дата начала обучения" aria-label="start" class="form-control filter-start" min="2000" max="` + new Date().getFullYear() + `">
								<input type="number" placeholder="дата окончания обучения" aria-label="finish" class="form-control filter-finish" min="2000" max="` + new Date().getFullYear() + `">
							</div>`,

    getValueName: function(amount) {
        let lastCharAmount = String(amount).substring(String(amount).length - 1, String(amount).length);
        if (5 <= amount && amount <= 20) return 'лет';
        if (lastCharAmount === '1') return 'год';
        if (2 <= lastCharAmount && lastCharAmount <= 4) return 'года';
        if ((5 <= lastCharAmount && lastCharAmount <= 9) ||
            lastCharAmount === '0') return 'лет';
    },

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

    isEducated: function(checkedYear) {
        let now = new Date();
        if (checkedYear + 4 < now.getFullYear()) return "закончил";
        if (checkedYear + 4 === now.getFullYear() && now.getMonth() >= 8) return "закончил";
        return (now.getFullYear() - checkedYear) + " курс";
    },

    renderRow: function(studentData) {
        let amountFullYears = (new Date()).getFullYear() - studentData.bornDate.getFullYear();
        return `<tr>
								<td>${studentData.lastName} ${studentData.firstName} ${studentData.patronymic}</td>
								<td>${studentData.fac}</td>
								<td>${formatDate(studentData.bornDate)}
                                (${amountFullYears} ${this.getValueName(amountFullYears)})</td>
								<td>${studentData.startYear}-${(studentData.startYear + 4)} 
										(${this.isEducated(studentData.startYear)})</td>
				</tr>`;
    },

    showFilters: function(container) {

        container.innerHTML = this.renderFilters();
        this.setHandler(container.querySelector('.filter-fio'), 'input', this.inputFilterFIO);
        this.setHandler(container.querySelector('.filter-fac'), 'input', this.inputFilterFac);
        this.setHandler(container.querySelector('.filter-start'), 'input', this.inputFilterStart);
        this.setHandler(container.querySelector('.filter-finish'), 'input', this.inputFilterFinish);
    },

    renderFilters: function() {
        return this.FILTERS;
    },

    inputFilterFIO: function() {
        console.log('inputFilterFIO');
    },

    inputFilterFac: function() {
        console.log('inputFilterFac');
    },

    inputFilterStart: function() {
        console.log('inputFilterStart');
    },

    inputFilterFinish: function() {
        console.log('inputFilterFinish');
    },

    showButtonNewStudent: function(container) {
        container.innerHTML = this.renderButtonNewStudent();
        this.setHandler(container.querySelector('.btn-new-student'), 'click', this.newStudentClick);
    },

    renderButtonNewStudent: function() {
        return `<button class="btn btn-primary btn-new-student btn-lg">Создать студента</button>`;
    },

    newStudentClick: function() {
        console.log('newStudentClick');

        viewStudents.showFormNewStudent();
    },

    renderFormNewStudent: function() {
        return this.FORM_CREATE_STUDENT;
    },

    showFormNewStudent: function() {
        let container = document.querySelector('.form-new-student-container');
        container.innerHTML = this.renderFormNewStudent();
        this.setHandler(container.querySelector('.btn-create-new-student'),
            'click', this.btnCreateStudentClick);
    },

    btnCreateStudentClick: function(event) {
        event.preventDefault();
        console.log('btnCreateStudentClick');
        let dataNewStudent = viewStudents.getNewStudentData();
        console.log(dataNewStudent);
        let error = viewStudents.controller.validator.validate(dataNewStudent);
        if (error.mistaken) {
            viewStudents.showMistakes(error);
            return;
        }
        viewStudents.controller.execute(viewStudents.controller.commands.CMD_CREATE_STUDENT,
            dataNewStudent);
        viewStudents.showButtonNewStudent(document.querySelector('.form-new-student-container'));
    },

    showMistakes: function(error) {
        if (error.fname) document.querySelector('.error-fname').textContent = error.fname;
        if (error.patronymic) document.querySelector('.error-patronymic').textContent = error.patronymic;
        if (error.lname) document.querySelector('.error-lname').textContent = error.lname;
        if (error.born) document.querySelector('.error-born-date').textContent = error.born;
        if (error.fac) document.querySelector('.error-fac').textContent = error.fac;
        if (error.start) document.querySelector('.error-start-year').textContent = error.start;
    },

    getNewStudentData: function() {
        let firstName = document.querySelector('.new-first-name');
        let patronymic = document.querySelector('.new-patronymic');
        let lastName = document.querySelector('.new-last-name');
        let newBorn = document.querySelector('.new-born-date');
        let start = document.querySelector('.new-start-year');
        let fac = document.querySelector('.new-facultet');
        return {
            fname: firstName.value,
            patr: patronymic.value,
            lname: lastName.value,
            born: newBorn.value,
            scratch: parseInt(start.value),
            facultet: fac.value,
        };
    },

};