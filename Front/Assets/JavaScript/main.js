function validarAdmin() {
    const senha = document.getElementById('senha').value;
    if (senha === 'Admin@Admin') {
      document.getElementById('loginAdmin').style.display = 'none';
      document.getElementById('painelAdmin').style.display = 'block';
      carregarDenuncias();
    } else {
      alert('Senha incorreta!');
    }
  }
  
  async function carregarDenuncias() {
    const response = await fetch('/api/denuncias');
    const denuncias = await response.json();
    const tbody = document.querySelector('#tabelaDenuncias tbody');
  
    denuncias.forEach(denuncia => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${denuncia.setor}</td>
        <td>${denuncia.data}</td>
        <td>${denuncia.descricao}</td>
        <td>${denuncia.anexo ? `<a href="/uploads/${denuncia.anexo}" target="_blank">Ver</a>` : 'Nenhum'}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
