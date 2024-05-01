const apiBaseUrl = 'http://localhost:8000/item';

function fetchItems() {
    fetch(`${apiBaseUrl}`)
        .then(response => response.json())
        .then(items => displayItems(items))
        .catch(error => console.error('Error:', error));
}

function saveItem() {
    const itemId = document.getElementById('itemId').value;
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `http://localhost:8000/item/update/${itemId}/` : `http://localhost:8000/item/create/`;

    const data = {
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        name: document.getElementById('name').value,
        amount: parseInt(document.getElementById('amount').value, 10)
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchItems();  // Refresh the list
        clearForm();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function editItem(itemId) {
    const item = document.getElementById(`item-${itemId}`);
    document.getElementById('itemId').value = itemId;
    document.getElementById('category').value = item.dataset.category;
    document.getElementById('subcategory').value = item.dataset.subcategory;
    document.getElementById('name').value = item.dataset.name;
    document.getElementById('amount').value = item.dataset.amount;
}

function deleteItem(itemId) {
    fetch(`${apiBaseUrl}/delete/${itemId}/`, {
        method: 'DELETE'
    })
    .then(() => fetchItems())
    .catch(error => console.error('Error:', error));
}

function displayItems(items) {
    const table = $('#itemsTable').DataTable();
    table.clear();
    items.forEach(item => {
        table.row.add([
            item.category,
            item.subcategory,
            item.name,
            item.amount,
            `<button class="btn btn-info" onclick="editItem(${item.id})">Edit</button>
             <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>`
        ]).draw(false);
    });
}

function clearForm() {
    document.getElementById('itemForm').reset();
    document.getElementById('itemId').value = '';
}

document.addEventListener('DOMContentLoaded', fetchItems);
