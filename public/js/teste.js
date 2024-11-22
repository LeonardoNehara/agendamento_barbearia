let calendar; // Variável global

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true,
        navLinks: true,
        events: [],
        eventClick: function(arg) {
            if (confirm('Deseja realmente excluir este evento?')) {
                arg.event.remove();
            }
        }
    });

    calendar.render();

    // Carregar agendamentos no calendário
    listarAgendamentosNoCalendario(calendar);
});


function listarAgendamentosNoCalendario(calendar, filtroBarbeiro = null) {
  app.callController({
      method: 'GET',
      url: base + '/getAgendamentos',
      params: { barbeiro: filtroBarbeiro }, // Passa o filtro como parâmetro
      onSuccess(res) {
          const agendamentos = res.ret.map(agendamento => ({
              id: agendamento.id,
              title: `${agendamento.cliente} - ${agendamento.servico}`,
              start: agendamento.datahora, // formato ISO 8601
              allDay: false
          }));

          calendar.removeAllEvents();
          calendar.addEventSource(agendamentos);
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

function filtrarPorBarbeiro() {
  const barbeiroSelect = document.getElementById('barbeiroSelect');
  const filtroBarbeiro = barbeiroSelect.value; // ID do barbeiro selecionado
  listarAgendamentosNoCalendario(calendar, filtroBarbeiro);
}



app.get('/getAgendamentos', (req, res) => {
  const filtroBarbeiro = req.query.barbeiro; // Parâmetro enviado pela requisição
  let query = 'SELECT * FROM agendamentos';
  const params = [];

  if (filtroBarbeiro) {
      query += ' WHERE barbeiro_id = ?';
      params.push(filtroBarbeiro);
  }

  // Execute a query com parâmetros
  database.execute(query, params, (err, result) => {
      if (err) {
          res.status(500).send({ error: "Erro ao buscar agendamentos" });
      } else {
          res.send({ ret: result });
      }
  });
});



