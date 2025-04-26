export function setupToggleButton(buttonId, widget, activeClass = "bg-blue-300", inactiveClass = "bg-gray-900") {
    const button = document.getElementById(buttonId);

    if (!button) {
        console.warn(`Button with ID '${buttonId}' not found.`);
        return;
    }

    button.addEventListener("click", () => {
        widget.visible = !widget.visible;

        if (widget.visible) {
            button.classList.add(activeClass);
            button.classList.remove(inactiveClass);
        } else {
            button.classList.add(inactiveClass);
            button.classList.remove(activeClass);
        }
    });
}