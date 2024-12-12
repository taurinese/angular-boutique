import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbstractFormComponent} from '../../tools/abstract-form';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../entities/product';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent{

  //service = inject(ProductService)

  constructor(private service: ProductService, private router: Router, route: ActivatedRoute) {
    super();

    route.data.subscribe(({product}) => {
      if(product) this.form.patchValue(product)
      else this.form.reset({
        id: 0,
    })
    })
  }



  form : FormGroup = new FormGroup({
    id: new FormControl(0),
    img: new FormControl(""),
    alt: new FormControl("", {validators: [Validators.required]}),
    titre: new FormControl("", {validators: [Validators.required]}),
    description: new FormControl("", {validators: [Validators.required]}),
    price: new FormControl(0, {validators: [Validators.required]}),
    quantity: new FormControl(0, {validators: [Validators.required]})
  })


  pics: string[] = new Array(3)
    .fill(0)
    .map((v,i) => `pic${(i+1).toString().padStart(2,'0')}.png`)

  onSubmit$() {
    console.log("form submitted", this.form.value)
    this.service[this.form.value.id ? 'update' : 'save'](this.form.value).subscribe(() => this.router.navigate(['/home']))
  }
}
