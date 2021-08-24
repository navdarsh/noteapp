import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notepage',
  templateUrl: './notepage.component.html',
  styleUrls: ['./notepage.component.scss'],
})
export class NotepageComponent implements OnInit {
  updateAt = -1;
  currentUser: any = [];
  allUsers: any = [];
  notes = {
    title: null,
    detail: null,
  };
  viewNotes:any = {}
  constructor(private activeroute: ActivatedRoute,private route: Router) {}

  ngOnInit(): void {
    let user: any;
    this.activeroute.paramMap.subscribe((params) => {
      user = params.get('name');
    });
    console.log(user);
    this.allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    this.currentUser = this.allUsers.filter(
      (ele: any) => ele.name.toLowerCase() === user
    );
    console.log(this.currentUser);
  }

  addNotes() {
    const modal = document.getElementById('addNote');
    if (modal) modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('addNote');
    if (modal) modal.style.display = 'none';
    this.resetFields();
  }

  resetFields() {
    this.notes = {
      title: null,
      detail: null,
    };
    this.updateAt = -1;
  }

  removeNote(i: any,event:any) {
    event.stopPropagation();
    this.currentUser[0]['notes'].splice(i, 1);
    console.log(this.currentUser);
    this.updateListing();
  }

  editNote(i: any,event:any) {
    event.stopPropagation();
    this.updateAt = i;
    this.notes = JSON.parse(JSON.stringify(this.currentUser[0]['notes'][i]));
    this.addNotes();
  }

  viewNote(i:any){
    this.viewNotes = this.currentUser[0]['notes'][i];
    const modal = document.getElementById('noteView');
    if (modal) modal.style.display = 'block';
  }

  updateNote(){
    if (this.notes.title && this.notes.detail) {
      this.currentUser[0]['notes'][this.updateAt] = this.notes;
      this.updateListing();
      this.closeModal();
    }
  }

  saveNote() {
    if (this.notes.title && this.notes.detail) {
      this.currentUser[0]['notes'].push(this.notes);
      this.updateListing();
      this.closeModal();
    }
  }

  updateListing() {
    console.log(this.currentUser);
    let atIndex = null;
    this.allUsers.forEach((element: any, index: any) => {
      if (
        element.name.toLowerCase() === this.currentUser[0].name.toLowerCase()
      ) {
        atIndex = index;
      }
    });
    if (atIndex) this.allUsers[atIndex] = this.currentUser[0];
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
  }

  resetState(){
    if(confirm('Are you sure you want to logout')) this.route.navigateByUrl('login');
  }

  closeViewModal(){
    const modal = document.getElementById('noteView');
    if (modal) modal.style.display = 'none';
    this.viewNotes = {};
  }
}
