// cart.js
export function initializeCart() {
  // Recupera o carrinho do localStorage ou inicia como objeto vazio
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Função para atualizar a badge com o total de itens
  function updateCartBadge() {
    const cartCountEl = document.getElementById('cart-count');
    const totalCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.textContent = totalCount;
  }

  // Seleciona todos os botões de adicionar produto
  const buttons = document.querySelectorAll('.addProduct');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtém os dados do produto a partir dos data attributes
      const productName = this.getAttribute('data-name');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      const productImg = this.getAttribute('data-img');

      // Se o produto já existe no carrinho, incrementa a quantidade; senão, cria um novo registro
      if (cart[productName]) {
        cart[productName].quantity += 1;
      } else {
        cart[productName] = {
          name: productName,
          price: productPrice,
          img: productImg,
          quantity: 1
        };
      }

      // Salva o carrinho atualizado no localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Atualiza a badge do carrinho
      updateCartBadge();
    });
  });

  // Atualiza a badge assim que a página carregar
  updateCartBadge();

  // Ao clicar no ícone, redireciona para a página do carrinho
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      window.location.href = 'cart.html';
    });
  }
}
