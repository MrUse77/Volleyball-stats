export interface Tournament {
  id: number; // Identificador único del torneo
  name: string; // Nombre del torneo
  startDate: string; // Fecha de inicio (puedes usar Date si prefieres objetos de fecha)
  endDate: string; // Fecha de finalización
  type: "GROUP_STAGE" | "KNOCKOUT"; // Tipo de torneo
  groups?: Group[]; // Grupos asociados al torneo (opcional)
}

export interface Group {
  id: number; // Identificador único del grupo
  name: string; // Nombre del grupo (ejemplo: Grupo A)
  teams: Team[]; // Equipos asociados al grupo
}

export interface Team {
  id: number; // Identificador único del equipo
  name: string; // Nombre del equipo
}

export interface Match {
  id: number; // Identificador único del partido
  teamA: Team; // Equipo A
  teamB: Team; // Equipo B
  winner?: Team; // Ganador (puede ser null si el partido no se ha jugado)
  group?: Group; // Grupo al que pertenece el partido (opcional)
}
