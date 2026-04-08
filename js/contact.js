const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form && status) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "Nachricht wird gesendet ...";

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                form.reset();
                status.textContent = "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.";
                return;
            }

            const result = await response.json().catch(() => null);

            if (result?.errors?.length) {
                status.textContent = result.errors.map((error) => error.message).join(" ");
            } else {
                status.textContent = "Beim Senden ist ein Fehler aufgetreten.";
            }
        } catch (error) {
            status.textContent = "Die Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.";
        }
    });
}