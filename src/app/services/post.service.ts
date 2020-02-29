import { Post } from './../shared/post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  postUpdate = new Subject<{posts: Post[], postCount: number}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addPost(title: string, content: string, image: string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{ message: string, post: Post }>('http://localhost:4000/api/posts', postData)
      .subscribe((res) => {
      }, err => console.log(err))
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string, posts: Post[], maxPosts: number  }>('http://localhost:4000/api/posts' + queryParams)
      .subscribe(res => {
        this.posts = res.posts;
        this.postUpdate.next({posts: [...this.posts], postCount: res.maxPosts});
      })
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, post: Post }>('http://localhost:4000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = { 
        id: id, 
        title: title, 
        content: content, 
        imagePath: image
      }
    }
    this.http.put('http://localhost:4000/api/posts/' + id, postData)
            .subscribe(res => {  
                this.router.navigate(['/user/notesList']);
            })
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:4000/api/posts/' + postId);
  }

}
