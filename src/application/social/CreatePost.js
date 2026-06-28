const Post = require('../../domain/Post')

class CreatePost {
  constructor(postRepo) {
    this.postRepo = postRepo
  }

  async execute({ id_user, id_event, content, rating }) {
    const post = new Post({ id_user, id_event, content, rating })

    const newPost = await this.postRepo.create(post)
    
    return { message: 'Publicación creada con éxito', post: newPost }
  }
}

module.exports = CreatePost