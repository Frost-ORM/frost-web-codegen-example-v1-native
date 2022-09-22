import type { Club, ClubTypes } from "@frost-orm/frost-web-client/default";
import { FrostApp } from "../database/frost";

export function clubCard(club: ClubTypes["FullModel"], onStudentsListClick: (club:ClubTypes["FullModel"])=>any) {
  const card = document.createElement("ion-card");
  card.innerHTML = `
    <ion-card-header>
      <ion-card-title>${club.name}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <strong>Supervisor</strong>: ${club.supervisor?.name} <br/><br/>
      <strong>Room ID</strong>: ${club.roomId} <br/>
      <strong>Type</strong>: ${club.type} <br/>
      <strong># of Students</strong>: ${FrostApp.club.getConnectedKeys("members",club)?.length} <br/>
    </ion-card-content>

    <ion-item>
      <ion-button id="students-btn" fill="outline" slot="end">Students List</ion-button>
    </ion-item>
  `;

  let studentsListBtn = card.querySelector<HTMLButtonElement>("ion-button#students-btn");
  if (studentsListBtn) {
    studentsListBtn.onclick = ()=>{
      onStudentsListClick(club)
    }
  }
  return card;
}
