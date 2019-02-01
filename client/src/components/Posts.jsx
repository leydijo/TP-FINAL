import React, { Component } from 'react';
import Products from '../components/Products';
import { getPosts } from '../../../backend/server';



class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }
componentDidMount() {
    getPosts()
      .then((res) => {
        this.setState({
          posts: res.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }
renderPosts = () => {
    const { posts } = this.state;
    return posts.map(post => {
      const { categories, items, id } = post;
      return (
        <Products
          key={id}
          categories={categories}
          items={items}
        />
      );
    });
  }
render() {
    const { loading } = this.state;
    return (
      <Container>
        {loading ? 'loading...' : this.renderPosts()}
      </Container>
    );
  }
}
export default Posts;