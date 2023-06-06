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
        
      // Add checkbox for deleting all todos
      let deleteAllCheckbox = document.createElement("input");
      deleteAllCheckbox.setAttribute("type", "checkbox");
      deleteAllCheckbox.setAttribute("id", "deleteAllCheckbox");
      deleteAllCheckbox.addEventListener("change", () => {
        if (deleteAllCheckbox.checked) {
          this.deleteAll();
        }
      });
      document.getElementById("todos").appendChild(deleteAllCheckbox);
  
      this.items.map(elem => {
        let tag = document.createElement("li");
        if (elem.completed) tag.setAttribute("class", "checked");
        else tag.setAttribute("class", "");
        tag.setAttribute("id", elem.id);
  
        let text = document.createTextNode(elem.description);
        tag.appendChild(text);
  
        let span = document.createElement("SPAN");
        span.setAttribute("class", "close");
        span.setAttribute("onclick", `todoList.deleteCurrent(${elem.id})`)
        text = document.createTextNode("X");
        span.appendChild(text);
        tag.appendChild(span);
  
        let br = document.createElement("hr");
        tag.appendChild(br);
  
        text = document.createTextNode(`Priority: ${elem.priority}`);
        tag.appendChild(text);
  
        span = document.createElement("SPAN");
        span.setAttribute("class", "edit");
        span.setAttribute("onclick", `todoList.editCurrent(${elem.id})`)
        text = document.createTextNode("edit");
        span.appendChild(text);
        tag.appendChild(span);
  
        document.getElementById("todos").appendChild(tag);
      })
    }
  
    currentIndex(id) {
      let checkIndex = el => el.id === id;
      let currentId = this.items.findIndex(checkIndex);
      return currentId;
    }
  
    deleteCurrent(id) {
      this.items.splice(this.currentIndex(id), 1);
      if (this.fltr === "all") this.displayList();
      else this.sortList(this.fltr);
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
        if (this.fltr === "all") this.displayList();
        else this.sortList(this.fltr);
      }
    }
  
    sortList(pr) {
      if (pr != "all") {
        const sorter = this.items.filter(item => item.priority === pr);
        sorter.sort((a, b) => a.priority.localeCompare(b.priority));
        this.displayList(sorter);
        this.fltr = pr;
      } else {
        this.items.sort((a, b) => a.priority.localeCompare(b.priority));
        this.displayList();
        this.fltr = "all";
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
  