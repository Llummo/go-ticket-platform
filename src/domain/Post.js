class Post {
  constructor({ id, id_user, id_event, content, rating, created_at }) {
    if (!id_user) throw new Error('El autor de la publicación es requerido')
    if (!id_event) throw new Error('El evento es requerido')
    if (!content || content.trim().length === 0) throw new Error('El contenido del post no puede estar vacío')
    if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
      throw new Error('La calificación debe estar entre 1 y 5')
    }

    this.id = id
    this.id_user = id_user
    this.id_event = id_event
    this.content = content
    this.rating = rating || null 
    this.created_at = created_at || new Date()
  }
}

module.exports = Post