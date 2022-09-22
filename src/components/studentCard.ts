import type { Student, StudentTypes } from "@frost-orm/frost-web-client/generated";
import { FrostApp } from "../database/frost";


export function studentCard(student: StudentTypes["FullModel"]) {
  const card = document.createElement("ion-card");

  card.innerHTML = `
    <ion-card-header>
      <ion-card-title>${student.name}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <strong>ID</strong>: ${student.id} <br/><br/>
      <strong>Year</strong>: ${student.year} <br/><br/>
      <strong>Email</strong>: ${student.email} <br/><br/>
      <strong>DOB</strong>: ${student.birthday} <br/><br/>
      <strong>Club</strong>: ${FrostApp.student.getConnectedKeys("club",student)?.[0] ?? "None"} <br/><br/>
      <strong># of Courses</strong>: ${FrostApp.student.getConnectedKeys("courses",student)?.length || "None"} <br/><br/>
    </ion-card-content>
    <ion-item>
      <ion-button id="delete-btn" fill="outline" slot="end">Delete</ion-button>
    </ion-item>

  `;
  let deleteBtn = card.querySelector<HTMLButtonElement>("ion-button#delete-btn");
  deleteBtn.onclick = ()=>{
    FrostApp.student.delete(student)
  }

  return card;
}
