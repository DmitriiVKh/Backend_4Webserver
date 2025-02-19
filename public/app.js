document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const newTitle = prompt("Введите новое название:", title);
    if (newTitle !== null) {
      edit({ id, title: newTitle }).then(() => {
        const listItem = event.target.closest("li");
        listItem.querySelector("span").innerText = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}
