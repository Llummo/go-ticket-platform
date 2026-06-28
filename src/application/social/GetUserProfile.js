class GetUserProfile {
  constructor(userRepo, postRepo) {
    this.userRepo = userRepo
    this.postRepo = postRepo
  }

  async execute(userId) {
    if (!userId) throw new Error('El ID del usuario es requerido')

    const user = await this.userRepo.model.findById(userId).select('-password')
    if (!user) throw new Error('Usuario no encontrado')

    const posts = await this.postRepo.findByUser(userId)

    return {
      profile: user,
      activity: posts
    }
  }
}

module.exports = GetUserProfile