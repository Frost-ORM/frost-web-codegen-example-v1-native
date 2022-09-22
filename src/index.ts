import { Club, ClubTypes, CourseTypes, StudentTypes } from "@frost-orm/frost-web-client";
import { Subject } from "rxjs";
import { clubCard } from "./components/clubCard";
import { courseCard } from "./components/courseCard";
import { FrostApp } from "./database/frost";
import { addStudents, setData } from "./database/mock-data";
import { studentCard } from "./components/studentCard";
import './styles/index.scss';


const app = document.getElementById("app-root") as HTMLDivElement;

app.innerHTML = `
<div id="top">
  <ion-button id="mock-btn">Set Initial Mock Data</ion-button>
  <ion-button id="mock-students-btn">Add Mock Students Data</ion-button>
</div>
<main>
  <div id="lists-container">

    <div id="courses-container">
      <h2>Courses</h2>
      <div id="courses-list">
      </div>
    </div>

    <div id="clubs-container">
      <h2>Clubs</h2>
      <div id="clubs-list">
      </div>
    </div>
    
    <div id="students-container">
      <h2>Students</h2>
      <div id="students-list">
      </div>
    </div>

  </div>
</main>
`;

const mockBtn = document.getElementById("mock-btn") as HTMLButtonElement;
const mockStudentsBtn = document.getElementById(
	"mock-students-btn",
) as HTMLButtonElement;

/*
 * Sets The initial Mock Data (Clubs,Courses,Professors, Some Students)
 */
mockBtn.onclick = () => {
	setData();
};
/*
 * Adds Extra Mock Students Data
 */
mockStudentsBtn.onclick = () => {
	addStudents();
};




const clubsList = document.getElementById("clubs-list") as HTMLDivElement;
const coursesList = document.getElementById("courses-list") as HTMLDivElement;
const studentsList = document.getElementById("students-list") as HTMLDivElement;

export const studentsSubject = new Subject<StudentTypes["FullModel"][]>();
export let selected: {type:"club"|"course",id?:string} | undefined = undefined;


/*
 * When Clicked set the data in the selected variable
 * and Emit the new students list
 */
function handleStudentsListClick(data: ClubTypes["FullModel"] | CourseTypes["FullModel"]){
    selected = { type: ClubPredicate(data) ? "club":"course", id: data.id };
    studentsSubject.next(Object.values(( ClubPredicate(data)? data.members : data.students )?? []) as any);
}

/*
 * Courses Observer 
 * (No Constraints Passed , So it listens to all Courses) 
 * included with each course is the connected students and professor
 */
FrostApp.course.observeMany({
  include: {"professor":true, "students":true}
}).subscribe((data) => {
  console.log({data})
  /*
   * When the data changes the coursesList div is modified
   */
  coursesList.replaceChildren(...Object.values(data).map((course)=>courseCard(course,handleStudentsListClick)));


  /*
   * if the selected course changes then emit the new students list
   * if empty then emit an empty student list
   */
  if (selected && selected.type === "course" ) {
      if(!Object.values(data).length) studentsSubject.next([])
      else studentsSubject.next(Object.values(data[selected?.id]?.students ?? [] as any));
  }

});

/*
* Clubs Observer 
* (No Constraints Passed , So it listens to all Clubs) 
* included with each club is the connected students and supervisor
*/
FrostApp.club.observeMany({ include: {"supervisor":true, "members":true } }).subscribe(
  (data) => {
      /*
       * When the data changes the clubsList div is modified
       */
      clubsList.replaceChildren(...Object.values(data).map((club)=>clubCard(club,handleStudentsListClick)));
  

      /*
       * if the selected club changes then emit the new students list
       * if empty then emit an empty student list
       */
      if (selected && selected.type === "club" ) {
        if(!Object.values(data).length) studentsSubject.next([])
        else studentsSubject.next(Object.values(data[selected?.id]?.members ?? [] as any));
      }

  },
);

studentsSubject.subscribe((data) => {
  /*
   * When the data changes the studentsList div is modified
   */
  studentsList.replaceChildren(...data.map(studentCard));
});

function ClubPredicate(data:any):data is Club {
  return (data as Club).roomId !== undefined
}