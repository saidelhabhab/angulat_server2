import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './service/user.service';
import { User } from './interface/user';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'crud_Api';

  public users : User[]= [];

  private user : User ={

    'name': 'said',
    'username': 'elhabhabsss',
    'email': 'said@april.biz',
    'address': {
      'street': 'said Light',
      'suite': 'said. 556',
      'city': 'said ggj',
      'zipcode': '955598-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'said.org',
    'company': {
      'name': 'said-Crona',
      'catchPhrase': 'said-layered client-server neural-net',
      'bs': 'said real-time e-markets'
    }
  }

  constructor(private modalService: NgbModule, private userService : UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.onCreateUser();
  }

  public open(modal: any): void {

  }


  integreRegex = /^\d+$/

  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/



  userForm = new FormGroup({

    fname : new FormControl('', [Validators.required, Validators.maxLength(32),Validators.minLength(3)]),

    lname : new FormControl('', [Validators.required, Validators.maxLength(32),Validators.minLength(3)]),

    age : new FormControl('', [Validators.required, Validators.min(18), Validators.max(60), Validators.pattern(this.integreRegex)]),

    mobile : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.integreRegex)]),

    email : new FormControl('', [Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]),

    password : new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),

    confirm_password : new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),

  })


  getControl(name: any): AbstractControl | null {

    return this.userForm.get(name)

  }




  registerFn(){

    console.log(this.userForm.value)

  }

  getUsers():void{
    const userX = this.userService.getUsers();
    lastValueFrom(userX).then((response) => {
      this.users = response;
      console.log(response);
      }).catch((error) => {
        this.users =[]
      });
  }

  onCreateUser():void{

    const userX = this.userService.createUser(this.user);
    lastValueFrom(userX).then((response) => {
      this.users = response;
      console.log(response);
      }).catch((error) => {
        this.users =[]
      });

  }



}
