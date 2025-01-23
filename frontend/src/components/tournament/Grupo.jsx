export const Grupo = ({ tournament, group }) => {
  return (
    <div className="group-card">
      <h3>{group.group}</h3>
      <table>
        <thead>
          <tr>
            <th>Equipos</th>
          </tr>
        </thead>
        <tbody>
          {group.teams?.map((team) => (
            <tr key={team.name}>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href={`/tournament/${tournament.id}/group/${group.id}`}
        className="btn-secondary">
        Ver Grupo
      </a>
    </div>
  );
};
