const postsData = document.querySelector('.posts_data');
const getPostsButton = document.querySelector('.posts_load-button');
const subscribeButton = document.querySelector('.subscriber_button');
const subscriberPosts = document.querySelector('.subscriber_posts');
const subscriberNotify = document.querySelector('.notify');

class PostsObservers {
  posts = [];

  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !==observer);
  }

  emit(action, data) {
    this.observers.forEach(observer => {
      observer.update(action, data);
    });
  }

  getPosts = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (posts.status === 200) {
      this.posts = await posts.json();
    }

    this.emit('NEW_POSTS', this.posts);

    postsData.innerHTML = JSON.stringify(this.posts);
  }
}

const postObserver = new PostsObservers();
getPostsButton.addEventListener('click', postObserver.getPosts);

class SomeBlog {
  newPosts = [];

  update(action, data) {
    if (action === 'NEW_POSTS') {
      this.newPosts = data;

      subscriberPosts.innerHTML = JSON.stringify(this.newPosts);
    }
  }
}

const newsBlog = new SomeBlog();

subscribeButton.addEventListener('click', () => {
  postObserver.subscribe(newsBlog);
  subscriberNotify.innerText = 'Подписаны на Observer...';
});
