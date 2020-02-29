import { Post } from './../../../shared/post';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  posts: Post[] = [];
  totalPost = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.posts = postData.posts;
      this.totalPost = postData.postCount;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    })
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

}
