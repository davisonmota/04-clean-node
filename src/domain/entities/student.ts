import { randomUUID } from "crypto"

export class Student {
  public id: string
  public name: string

  constructor(name: string, id: string = randomUUID()) {
    this.name=name
    this.id = id
  }
}