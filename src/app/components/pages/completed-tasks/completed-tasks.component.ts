import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
  newTask = "";
  taskList: any[] = [];
  initialTaskList:any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);


  ngOnInit() {
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

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      // console.log(result);
      this.initialTaskList = this.taskList =result.filter((task:any)=> task.completed === true);
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

  onDelete(task: any) {
    this.httpService.deleteTask(task.id).subscribe(() => {
      this.getAllTasks();
    });
  }
}
