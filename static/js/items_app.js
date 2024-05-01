const apiBaseUrl = "http://localhost:8000/item"; // No trailing slash

function editItem(itemId) {
  fetch(`${apiBaseUrl}/${itemId}/`) // This should likely be `/item/${itemId}/` based on standard REST practices
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((item) => {
      document.getElementById("itemId").value = item.id;
      document.getElementById("category").value = item.category;
      document.getElementById("subcategory").value = item.subcategory;
      document.getElementById("name").value = item.name;
      document.getElementById("amount").value = item.amount;
    })
    .catch((error) => console.error("Error:", error));
}

function deleteItem(itemId) {
  console.log("Attempting to delete item with ID:", itemId);
  if (confirm("Are you sure you want to delete this item?")) {
    fetch(`${apiBaseUrl}/delete/${itemId}/`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // If no JSON is expected
      })
      .then(() => {
        $("#itemsTable").DataTable().ajax.reload();
      })
      .catch((error) => console.error("Error:", error));
  }
}

$(document).ready(function () {
  const table = $("#itemsTable").DataTable({
    ajax: {
      url: "/items/",
      dataSrc: "",
      error: function (xhr, status, error) {
        console.error("Error fetching data:", error);
      },
    },
    columns: [
      { data: "category" },
      { data: "subcategory" },
      { data: "name" },
      { data: "amount" },
      {
        data: "id",
        render: function (data) {
          return `<button class="btn btn-info" onclick="editItem('${data}')">Edit</button>
                  <button class="btn btn-danger" onclick="deleteItem('  ${data}')">Delete</button>`;
        },
      },
    ],
  });
});
