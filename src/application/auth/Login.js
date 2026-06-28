class Login {
  constructor(userRepo) {
    this.userRepo = userRepo
  }

  async execute({ email, role }) {
    const user = await this.userRepo.findByEmailAndRole(email, role)
    if (!user) return null
    return { token: `${role}-token-xyz`, role, user }
  }
}

module.exports = Login
