const VALID_ROLES = ['cliente', 'organizador', 'admin']

class User {
  constructor({ id, email, name, role }) {
    this.id = id
    this.email = email
    this.name = name
    this.role = role
    this.validate()
  }

  validate() {
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error('El email no tiene un formato válido')
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('El nombre es requerido')
    }
    if (!VALID_ROLES.includes(this.role)) {
      throw new Error(`El rol debe ser uno de: ${VALID_ROLES.join(', ')}`)
    }
  }
}

module.exports = User
