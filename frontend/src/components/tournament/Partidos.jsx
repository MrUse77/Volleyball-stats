const Partidos = ({ showTournamentHeader, matches }) => {
  console.log(matches.matches);
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
        {showTournamentHeader && <td>Torneo</td>}
        {matches ? (
          matches.matches.map((match) => (
            <tr>
              <td>
                {match.teamA} vs {match.teamB}
              </td>
              <td>
                {match.setA} - {match.setB}
              </td>
              <td>{match.state}</td>
              <td>
                <a href={`/match/${match.id}`} class="btn-secondary">
                  Ver Estadísticas
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={showTournamentHeader ? 5 : 4}>No hay partidos</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Partidos;
