var currentFilter = "*";
var currentlyHighlightedButton = null;
window.onload = getFilterButtons;
function getFilterButtons() {
    currentlyHighlightedButton = document.getElementsByClassName("is_active")[0];
    let elem = document.getElementsByClassName("trending-filter");
    let buttons = elem[0].getElementsByTagName("a");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", filter);
    }
}
function filter(event) {
    currentlyHighlightedButton.classList.remove("is_active");
    currentlyHighlightedButton = event.target;
    event.target.classList.add("is_active");
    currentFilter = event.target.getAttribute("data-filter");
    console.log("Filtro actual: " + currentFilter);
    let items = document.getElementsByClassName("col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv");
    if (document.title == "Juegos - Lista Juegos") {
        if (currentFilter != "*") {
            for (let i = 0; i < items.length; i++) {
                if (items[i].getElementsByTagName("span")[0].getAttribute("data-PEGI") != currentFilter) {
                    items[i].style.display = "none";
                } else {
                    items[i].style.display = "block";
                }
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "block";
            }
        }
    } else if (document.title == "Jugadores - Lista Jugadores") {
        if (currentFilter != "*") {
            for (let i = 0; i < items.length; i++) {
                if (items[i].getElementsByClassName("category")[0].textContent != currentFilter) {
                    items[i].style.display = "none";
                } else {
                    items[i].style.display = "block";
                }
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "block";
            }
        }
    }
}