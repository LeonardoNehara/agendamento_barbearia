let calendar; // Variável global para o calendário

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Inicializa o calendário
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true,
        navLinks: true,
        events: [],

        // Quando o evento for clicado
        eventClick: function(arg) {
            // Abre a modal de visualização com os dados do evento
            const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarAgendamentoModal"));

            // Preenche os dados da modal
            document.getElementById("visualizarAgendamento_cliente").innerText = arg.event.title.split(' - ')[0]; // Cliente
            document.getElementById("visualizarAgendamento_servico").innerText = arg.event.title.split(' - ')[1]; // Serviço
            document.getElementById("visualizarAgendamento_datahora").innerText = arg.event.start.toLocaleString(); // Data e Hora

            // Exibe a modal
            visualizarModal.show();
        }
    });

    calendar.render();

    // Carregar barbeiros dinamicamente
    carregarBarbeiros();

    // Carregar agendamentos no calendário inicialmente
    listarAgendamentosNoCalendario(calendar);
});

// Função para carregar barbeiros e preencher o select
function carregarBarbeiros() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            let options = '<option value="">Todos os Barbeiros</option>';
            barbeiros.forEach(barbeiro => {
                options += `<option value="${barbeiro.id}">${barbeiro.nome}</option>`;
            });
            document.getElementById('barbeiroSelect').innerHTML = options;
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao carregar barbeiros!"
            });
        }
    });
}

// Função para listar agendamentos no calendário
function listarAgendamentosNoCalendario(calendar, filtroBarbeiro = null) {
  app.callController({
      method: 'GET',
      url: base + '/getAgendamentos',
      params: { barbeiro: filtroBarbeiro },
      onSuccess(res) {

          // Verifique a estrutura correta da resposta antes de tentar mapear
          if (res[0].success === true && res[0].ret && Array.isArray(res[0].ret)) {
              const agendamentos = res[0].ret.map(agendamento => ({
                  id: agendamento.id,
                  title: `${agendamento.cliente} - ${agendamento.servico}`,
                  start: agendamento.datahora.replace(' ', 'T'),
                  allDay: false
              }));

              calendar.removeAllEvents(); // Remove eventos existentes
              calendar.addEventSource(agendamentos); // Adiciona novos eventos
          } else {
              console.error('Estrutura de resposta inesperada:', res); // Exibe o erro no console
              Swal.fire({
                  icon: "error",
                  title: "Erro!",
                  text: "Erro ao listar agendamentos no calendário! Estrutura inesperada."
              });
          }
      },
      onFailure() {
          Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Erro ao listar agendamentos no calendário!"
          });
      }
  });
}



// Função para filtrar agendamentos por barbeiro
function filtrarPorBarbeiro() {
    const barbeiroSelect = document.getElementById('barbeiroSelect');
    const filtroBarbeiro = barbeiroSelect.value; // ID do barbeiro selecionado
    listarAgendamentosNoCalendario(calendar, filtroBarbeiro);
}