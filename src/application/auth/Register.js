const bcrypt = require('bcrypt')

class Register {
  constructor(userRepo) {
    this.userRepo = userRepo
  }

  async execute({ email, name, password, role = 'cliente' }) {
    const existingUser = await this.userRepo.findByEmail(email)
    if (existingUser) throw new Error('El correo ya está registrado')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await this.userRepo.create({
      email,
      name,
      password: hashedPassword,
      role
    })

    const { password: _, ...userWithoutPassword } = newUser.toObject()
    return userWithoutPassword
  }
}

module.exports = Register