class TodoList {
  constructor() {
    this.items = [];
    this.count = 0;
    this.lister = document.querySelector('ul');
    this.fltr = "all";
  }

  addItem() {
    let todo = document.getElementById("inp").value;
    let priorityGet = document.getElementById("priority").value;

    if (todo && priorityGet) {
      var item = {
        id: this.count,
        description: todo,
        priority: priorityGet,
        completed: false
      }

      this.items.push(item);

      document.getElementById("inp").value = "";

      this.displayList();

      this.count++;
    } else {
      alert("Type something");
    }
  }

  displayList() {
    let remove = document.getElementById("todos");
    while (remove.hasChildNodes()) {
      remove.removeChild(remove.firstChild);
    }

    this.changeInfo();

    let deleteAllCheckbox = document.createElement("button");
    deleteAllCheckbox.setAttribute("type", "button");
    deleteAllCheckbox.setAttribute("id", "deleteAllCheckbox");
    deleteAllCheckbox.innerHTML = 'Delete All';
    deleteAllCheckbox.style.padding = '10px 40px';
    deleteAllCheckbox.style.margin = '20px 0';
    deleteAllCheckbox.style.borderRadius = '10px';
    deleteAllCheckbox.style.backgroundColor = 'rgb(2, 25, 70)';

    deleteAllCheckbox.addEventListener("click", () => {
      this.deleteAll();
    });
    document.getElementById("todos").appendChild(deleteAllCheckbox);

    this.sortAndDisplayList();
  }

  sortAndDisplayList() {
    let sortedItems;
    if (this.fltr !== "all") {
      sortedItems = this.items.filter(item => item.priority === this.fltr);
    } else {
      sortedItems = [...this.items];
    }

    sortedItems.sort((a, b) => a.priority.localeCompare(b.priority));

    sortedItems.forEach(elem => {
      let tag = document.createElement("li");
      if (elem.completed) tag.setAttribute("class", "checked");
      else tag.setAttribute("class", "");
      tag.setAttribute("id", elem.id);

      let text = document.createTextNode(elem.description);
      tag.appendChild(text);

      let span = document.createElement("SPAN");
      span.setAttribute("class", "close");
      span.setAttribute("onclick", `todoList.deleteCurrent(${elem.id})`);
      text = document.createTextNode("X");
      span.appendChild(text);
      tag.appendChild(span);

      let br = document.createElement("hr");
      tag.appendChild(br);

      text = document.createTextNode(`Priority: ${elem.priority}`);
      tag.appendChild(text);

      span = document.createElement("SPAN");
      span.setAttribute("class", "edit");
      span.setAttribute("onclick", `todoList.editCurrent(${elem.id})`);
      text = document.createTextNode("edit");
      span.appendChild(text);
      tag.appendChild(span);

      let doneButton = document.createElement("button");
      doneButton.setAttribute("type", "button");
      doneButton.setAttribute("class", "done-btn");
      doneButton.setAttribute("onclick", `todoList.markDone(${elem.id})`);
      doneButton.innerHTML = "Done";
      tag.appendChild(doneButton);

      let undoneButton = document.createElement("button");
      undoneButton.setAttribute("type", "button");
      undoneButton.setAttribute("class", "undone-btn");
      undoneButton.setAttribute("onclick", `todoList.markUndone(${elem.id})`);
      undoneButton.innerHTML = "Undone";
      tag.appendChild(undoneButton);

      document.getElementById("todos").appendChild(tag);
    });
  }

  currentIndex(id) {
    let checkIndex = el => el.id === id;
    let currentId = this.items.findIndex(checkIndex);
    return currentId;
  }

  deleteCurrent(id) {
    this.items.splice(this.currentIndex(id), 1);
    this.displayList();
  }

  deleteAll() {
    this.items = [];
    this.displayList();
  }

  editCurrent(id) {
    let newVal = prompt("Add the new value of this to-do:", this.items[this.currentIndex(id)].description);

    if (newVal === null || newVal === "") {
      alert("No new value added. Keeping the old value.");
    } else {
      this.items[this.currentIndex(id)].description = newVal;
      this.displayList();
    }
  }

  sortList(pr) {
    this.fltr = pr;
    this.displayList();
  }

  markDone(id) {
    const index = this.currentIndex(id);
    if (index !== -1) {
      this.items[index].completed = true;
      this.displayList();
    }
  }

  markUndone(id) {
    const index = this.currentIndex(id);
    if (index !== -1) {
      this.items[index].completed = false;
      this.displayList();
    }
  }

  handleItemClick(check) {
    if (check.target.tagName === 'LI') {
      check.target.classList.toggle('checked');
      this.items[check.target.id].completed = !this.items[check.target.id].completed;
      console.log(this.items[check.target.id]);
    }
  }

  changeInfo() {
    document.getElementById("inf").innerHTML = this.items.length;
  }
}

const todoList = new TodoList();

document.getElementById("addBtn").addEventListener("click", () => {
  todoList.addItem();
});

todoList.lister.addEventListener('click', (check) => {
  todoList.handleItemClick(check);
}, false);
