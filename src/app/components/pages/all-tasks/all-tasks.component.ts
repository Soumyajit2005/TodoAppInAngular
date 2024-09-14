import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from "../../page-title/page-title.component";
import { TaskListComponent } from "../../task-list/task-list.component";
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent {
  newTask = "";
  taskList:any[] = [];
  initialTaskList:any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      // console.log(value);
      if(value){
        this.taskList = this.initialTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()));
      }else{
        this.taskList = this.initialTaskList;
      }
    })
    this.getAllTasks();
  }
  addTask(){
    this.httpService.addTask(this.newTask).subscribe(()=>{
      console.log("Task added");
      this.newTask = "";
      this.getAllTasks();
    });
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      // console.log(result);
      this.initialTaskList = this.taskList =result;
    });
  }

  onComplete(task:any){
    task.completed = true;
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    }); 
  }
  onImportant(task:any){
    task.important = true;
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    });
  }

  onDelete(task:any){
    this.httpService.deleteTask(task).subscribe(()=>{
      this.getAllTasks();
    });
  }
}
