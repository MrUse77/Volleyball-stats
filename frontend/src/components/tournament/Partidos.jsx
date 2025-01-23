const Partidos = ({ showTournamentHeader }) => {
  return (
    <table class="partidos">
      <thead>
        <tr>
          {showTournamentHeader && <th>Torneo</th>}
          <th>Equipos</th>
          <th>Puntaje</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {showTournamentHeader && <td>Torneo</td>}
          <td>Equipo A vs Equipo B</td>
          <td>2 - 1</td>
          <td>En Vivo</td>
          <td>
            <a href="#" class="btn-secondary">
              Ver Estadísticas
            </a>
          </td>
        </tr>
        <tr>
          {showTournamentHeader && <td>Torneo</td>}
          <td>Equipo C vs Equipo D</td>
          <td>3 - 0</td>
          <td>Finalizado</td>
          <td>
            <a href="#" class="btn-secondary">
              Ver Estadísticas
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Partidos;
