import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
  newTask = "";
  taskList: any[] = [];
  initialTaskList:any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);


  ngOnInit() {
    this.stateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList = this.initialTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()));
      }else{
        this.taskList = this.initialTaskList;
      }
    })
    this.getAllTasks();
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      // console.log(result);
      this.initialTaskList = this.taskList = result.filter((task:any)=> task.important === true);
    });
  }

  onComplete(task: any) {
    task.completed = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}