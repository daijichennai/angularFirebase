import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFirebase';
  courseJson: any[];
  courseKey: string;
  courseName: string;
  coursePrice: string;
  courseDesc: string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = this.db.list('courses');
    // console.log(this.itemsRef);

    // db.list('/pageMaster').valueChanges().subscribe(pageResult => {
    //   console.log(pageResult);
    // });
  }

  getCourse() {
    this.itemsRef = this.db.list('courses');
    return this.itemsRef.snapshotChanges();
  }

  ngOnInit()  {
    // this.db.list('/courses').valueChanges().subscribe(result => {
    //   this.courseJson = result;
    //   console.log(result);
    // });
    // this.db.list('/courses').valueChanges().subscribe(result => {
    //   this.courseJson = result;
    //   console.log(result);
    // });
    this.getCourse().subscribe(result => {
      // console.log(result);
      this.courseJson = result.map(item =>{
        return {
          $key: item.key,
          ...item.payload.val()
        }
      });
      console.log(this.courseJson);
      }
    );
    
  }

  addCourse() {
    // alert(this.courseName);
    this.itemsRef.push({
       courseName: this.courseName,
       coursePrice: this.coursePrice,
       courseDesc: this.courseDesc
    });
  }

  getDataByKey(obj) {
    // alert($key);
    this.courseKey = obj.$key;
    this.courseName = obj.courseName;
    this.coursePrice = obj.coursePrice;
    this.courseDesc = obj.courseDesc;
    // this.courseName = 'ask';
    // this.itemsRef.update($key, {
    //   courseName: this.courseName,
    //   coursePrice: this.coursePrice,
    //   courseDesc: this.courseDesc
    // });
  }

  update(){
    this.itemsRef.update(this.courseKey, {
      courseName: this.courseName,
      coursePrice: this.coursePrice,
      courseDesc: this.courseDesc
    });
  }

  onDelete($key) {
    // alert($key);
    if (confirm('Are you sure to delete this record ?')) {
      this.itemsRef.remove($key);
      // this.customerService.deleteCustomer($key);
      // this.showDeletedMessage = true;
      // setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  deleteEverything() {
    this.itemsRef.remove();
  }


}
