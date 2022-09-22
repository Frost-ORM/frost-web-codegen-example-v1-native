import type { Course, CourseIncludeAll, CourseTypes } from "@frost-orm/frost-web-client/generated";
import { FrostApp } from "../database/frost";


export function courseCard(course: CourseTypes['FullModel'], onStudentsListClick: (course:CourseTypes['FullModel'])=>any) {
  const card = document.createElement("ion-card");
  card.innerHTML = `
    <ion-card-header>
      <ion-card-title>${course.name}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <strong>Professor</strong>: ${course.professor?.name} <br/><br/>
      <strong>Difficulty Level</strong>: ${course.difficultyLevel} <br/>
      <strong>Department</strong>: ${course.department} <br/>
      <strong>Difficulty Level</strong>: ${course.duration} weeks <br/><br/>
      <strong># of Students</strong>: ${FrostApp.course.getConnectedKeys("students",course)?.length} <br/>
    </ion-card-content>

    <ion-item>
      <ion-button id="students-btn" fill="outline" slot="end">Students List</ion-button>
    </ion-item>

  `;

  let studentsListBtn = card.querySelector<HTMLButtonElement>("ion-button#students-btn");
  if (studentsListBtn) {
    studentsListBtn.onclick = ()=>{
      onStudentsListClick(course)
    }
  }
  return card;
}
