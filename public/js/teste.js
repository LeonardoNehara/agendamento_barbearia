eventClick: function(arg) {
    console.log('Evento clicado:', arg.event);

    document.getElementById('editar_id').value = arg.event.id;
    document.getElementById('editar_nome_completo').value = arg.event.title.split(' - ')[0];
    document.getElementById('editar_telefone').value = arg.event.extendedProps.telefone.replace(/[^\d]/g, '');

    const barbeiroID = arg.event.extendedProps.barbeiro;
    const servicoID = arg.event.extendedProps.servico;
    console.log('Barbeiro ID:', barbeiroID, 'Serviço ID:', servicoID);

    document.getElementById('editar_barbeiro').value = barbeiroID; // Deve coincidir com o ID no select
    document.getElementById('editar_servico').value = servicoID; // Deve coincidir com o ID no select

    // Exibe a modal
    const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarAgendamentoModal"));
    visualizarModal.show();
}
