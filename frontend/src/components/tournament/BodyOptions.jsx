import React, { useState } from "react";
import { Grupo } from "./Grupo"; // Asegúrate de que la ruta sea correcta
import Partidos from "./Partidos";

const BodyOptions = ({ tournament, matches }) => {
  const groups = [
    ...tournament.groups,
    {
      id: "2",
      group: "B",
      teams: [
        { name: "Equipo 1" },
        { name: "Equipo 2" },
        { name: "Equipo 3" },
        { name: "Equipo 4" },
      ],
    },
  ];

  const [options, setOptions] = useState("groups");
  const changeOption = (option) => {
    setOptions(option);
  };

  return (
    <section>
      <div className="header-options">
        <button
          className={options === "groups" ? "active" : ""}
          onClick={() => changeOption("groups")}>
          <h2>Grupos</h2>
        </button>
        <button
          className={options === "matches" ? "active" : ""}
          onClick={() => changeOption("matches")}>
          <h2>Partidos</h2>
        </button>
      </div>
      <div className="body-options">
        {options === "groups" ? (
          groups ? (
            <div className="body-grid">
              {groups.map((group) => (
                <Grupo key={group.id} tournament={tournament} group={group} />
              ))}
            </div>
          ) : (
            <p>No hay grupos</p>
          )
        ) : (
          <Partidos showTournamentHeader={false} matches={matches} />
        )}
      </div>
    </section>
  );
};

export default BodyOptions;
