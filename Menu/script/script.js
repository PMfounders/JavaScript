var itemsList = document.querySelector('.plates');
var addItems = document.querySelector('.add-items');

var items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event) {
    event.preventDefault();
    var text = this.querySelector('[name=item]').value;
    var item = {
        text: text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function deleteItem(button) {
    var deleteConfirm = confirm('delete?');
    if (!deleteConfirm) {
        return;
    }
    var id = parseInt(button.closest('li').dataset.id);
    items.splice(id, 1);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function editItem(button) {
    var id = parseInt(button.closest('li').dataset.id);
    var label = button.closest('li').querySelector('label');
    var editText = prompt('Edit:', label.innerText);
    if (editText === null) {
        return;
    }
    items[id].text = editText;
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function editCheck(checkbox) {
    var id = parseInt(checkbox.closest('li').dataset.id);
    items[id].done = checkbox.checked;
    localStorage.setItem('items', JSON.stringify(items));
}

function populateList(plates, platesList) {
    platesList.innerHTML = plates.map(function (plate, index) {
        return `
            <li data-id="${index}">
                <input type="checkbox" id="item${index}" ` + (plate.done ? ' checked' : '') + ` onchange="editCheck(this)">
                <label for="item${index}">${plate.text}</label>
                <button class="button-item edit" onclick="editItem(this)">
                    <img src="icons/pencil.svg" width="15" height="15">
                </button>
                <button class="button-item delete" onclick="deleteItem(this)">
                    <img src="icons/trash.svg" width="15" height="15">
                </button> 
            </li>
        `
    }).join('');
}

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);