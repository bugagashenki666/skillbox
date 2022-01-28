(function(){
  function createAppTitle(title) {
		let appTitle = document.createElement('h2');
		appTitle.innerHTML = title;
		return appTitle;
	}

	function createTodoItemForm() {
		let form = document.createElement('form');
		let input = document.createElement('input');
		let btnWrapper = document.createElement('div');
		let btn = document.createElement('button');
		

		form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.placeholder = 'Введите название нового дела';
		btnWrapper.classList.add('input-group-append');
		btn.classList.add('btn', 'btn-primary');
		btn.textContent = 'Добавить дело';
		btn.disabled = true; 

		input.oninput = function() {
			if(input.value === '') {
				btn.disabled = true;
			}
			else {
				btn.disabled = false;
			}
		};

		btnWrapper.append(btn);
		form.append(input);
		form.append(btnWrapper);

		return {form, input, btn};
	}

	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		return list;
	}

	function createTodoItem(name, stateDone=false) {
		let item = document.createElement('li');

		let btnGroup = document.createElement('div');
		let doneBtn = document.createElement('button');
		let deleteBtn = document.createElement('button');

		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
		item.textContent = name;
		btnGroup.classList.add('btn-group', 'btn-group-sm');
		doneBtn.classList.add('btn', 'btn-success');
		doneBtn.textContent = 'Готово';
		deleteBtn.classList.add('btn', 'btn-danger');
		deleteBtn.textContent = 'Удалить';


		btnGroup.append(doneBtn);
		btnGroup.append(deleteBtn);
		item.append(btnGroup);
		let data = {todo_name:name, done:stateDone};
		if(stateDone === true) {
			item.classList.toggle('list-group-item-success');
		}
		
		return {
			item, 
			doneBtn,
			deleteBtn,
			data,
		};
	}

	function loadData(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	function saveData(key, data) {
		let necessaryData = [];
		for(let i = 0 ; i < data.length ; i++) {
			necessaryData.push(data[i].data);
		}
		localStorage.removeItem(key);
		localStorage.setItem(key, JSON.stringify(necessaryData));
	}

	function initTodoList(todoData, list, todoListData) {
		if(todoData === null) {
			return;
		}

		for(let i = 0 ; i < todoData.length ; i++) 
		{
			let todoItem = createTodoItem(todoData[i].todo_name, todoData[i].done);
			todoItem.deleteBtn.onclick = () => 
			{
				if(confirm('Вы уверены?')) 
				{
					for(let i = 0 ; i < todoListData.length ; i++) 
					{
						if(todoListData[i].item === todoItem.item) 
						{
							todoListData.splice(i, 1);
							break;
						}
					}
					todoItem.item.remove();
				}
			};

			todoItem.doneBtn.onclick = () => {
				todoItem.item.classList.toggle('list-group-item-success');
				todoItem.data.done = !todoItem.data.done;
			};

			list.append(todoItem.item);
			todoListData.push(todoItem);
		}
	}

	function createTodoApp(container, nav, initData=null, title='Мои дела') {
		let todoAppTitle = createAppTitle(title);
		let todoItemForm = createTodoItemForm();
		let todoList = createTodoList();
		let todoData = [];

		container.append(todoAppTitle);
		container.append(todoItemForm.form);
		container.append(todoList);

		if(initData === null) {
			initData = loadData(title);
		}

		initTodoList(initData, todoList, todoData);

		
		nav.onclick = () => {
			saveData(title, todoData);
		};

		todoItemForm.form.addEventListener('submit', function(e) {

			e.preventDefault();

			if(!todoItemForm.input.value) {
				return;
			}

			let todoItem = createTodoItem(todoItemForm.input.value);
			todoData.push(todoItem);

			todoItem.doneBtn.addEventListener('click', function() {
				todoItem.item.classList.toggle('list-group-item-success');
				todoItem.data.done = !todoItem.data.done;
				console.log(todoData);
			});

			todoItem.deleteBtn.addEventListener('click', function() {
				if(confirm('Вы уверены?')) {
					for(let i = 0 ; i < todoData.length ; i++) {
						if(todoData[i].item === todoItem.item) {
							todoData.splice(i, 1);
							break;
						}
					}
					todoItem.item.remove();
					console.log(todoData);
				}
			});

			todoList.append(todoItem.item);
			todoItemForm.input.value = '';
			todoItemForm.btn.disabled = true;
		});
	}

	window.createTodoApp = createTodoApp;
})();