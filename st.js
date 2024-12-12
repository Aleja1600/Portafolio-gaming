document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById("addProjectForm");
    const portfolioContainer = document.getElementById("portfolioContainer");

    // Cargar proyectos desde Local Storage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // funcionn para mostrar los proyectos
    const displayProjects = () => {
        portfolioContainer.innerHTML = ""; // Limpiar contenedor
        projects.forEach((project, index) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("portfolio-item");
            projectDiv.innerHTML = `
                <img src="${project.image}" alt="${project.name}" style="width: 100%; border-radius: 8px;">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            `;
            portfolioContainer.appendChild(projectDiv);

            // animacion de entrada
            setTimeout(() => {
                projectDiv.classList.add("loaded");
            }, 100);
        });

        // eliminar proyectos
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                projects.splice(index, 1);
                localStorage.setItem("projects", JSON.stringify(projects));
                displayProjects();
            });
        });
    };

    // suceso al enviar el formulario
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const projectName = document.getElementById("projectName").value;
        const projectDescription = document.getElementById("projectDescription").value;
        const projectImage = document.getElementById("projectImage").files[0];
        const reader = new FileReader();

        // lee la imagen seleccionada
        reader.onload = () => {
            projects.push({
                name: projectName,
                description: projectDescription,
                image: reader.result,
            });
            localStorage.setItem("projects", JSON.stringify(projects)); // guardado en Local Storage
            displayProjects();
            projectForm.reset(); // limpiar formulario
        };

        reader.readAsDataURL(projectImage);
    });

    // muestra los proyectos cargados
    displayProjects();
});
