export function initializeModal() {
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    document.body.appendChild(modalContainer);
  
    fetch("./modal.html")
      .then(response => response.text())
      .then(html => {
        modalContainer.innerHTML = html;
  
        const modal = document.getElementById("pizza-modal");
        const modalContent = modal.querySelector(".modal-content"); // Certifique-se de que o modal tem uma div para o conteúdo
        const modalImage = document.getElementById("modal-image");
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        
        // Criando o botão "X"
        const closeButton = document.createElement("button");
        closeButton.textContent = "✖";
        closeButton.id = "close-modal";
        closeButton.style.position = "absolute";
        closeButton.style.top = "-9px";
        closeButton.style.right = "-9px";
        closeButton.style.background = "red"; // Define a cor vermelha
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.fontSize = "18px";
        closeButton.style.cursor = "pointer";
        closeButton.style.padding = "5px 10px";
        closeButton.style.borderRadius = "50%";

        // Adiciona o botão ao modal-content para garantir que apareça dentro do modal
        modalContent.appendChild(closeButton);

        // Evento para fechar o modal ao clicar no "X"
        closeButton.addEventListener("click", () => {
          modal.style.display = "none";
        });

        // Evento para abrir o modal ao clicar na imagem
        document.querySelectorAll(".menu .card img").forEach(img => {
          img.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const name = card.querySelector("h3").textContent;
            const description = card.querySelector("p").textContent;
            const imageSrc = event.target.src;
  
            modalImage.src = imageSrc;
            modalTitle.textContent = name;
            modalDescription.textContent = description;
            modal.style.display = "flex";
          });
        });

        // Evento para fechar o modal ao clicar fora dele
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
      });
}

export default initializeModal;
