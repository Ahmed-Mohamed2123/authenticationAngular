import { Post } from './../../../shared/post';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  imagePreview: any;
  formCreate: FormGroup;
  private mode = 'create';
  post: Post;
  private postId: string;

  constructor(
    private postService: PostService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, { validators: [Validators.required] })
    });
    
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData['_id'], 
            title: postData['title'], 
            content: postData['content'],
            imagePath: postData['imagePath'],
          };
          this.formCreate.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post['imagePath'],
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formCreate.patchValue({ image: file });
    this.formCreate.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.formCreate.invalid) {
      return;
    }
    if (this.mode === 'create')  {
      this.postService.addPost(
        this.formCreate.value.title,
        this.formCreate.value.content,
        this.formCreate.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.formCreate.value.title,
        this.formCreate.value.content,
        this.formCreate.value.image
      )
    }
    this.formCreate.reset();
  }

}
