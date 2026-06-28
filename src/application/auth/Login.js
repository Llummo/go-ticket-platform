const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'goticket_super_secret_key_2026' 

class Login {
  constructor(userRepo) {
    this.userRepo = userRepo
  }

  async execute({ email, password }) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new Error('Credenciales incorrectas')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new Error('Credenciales incorrectas')

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    const { password: _, ...userData } = user.toObject()
    
    return { token, role: user.role, user: userData }
  }
}

module.exports = Login