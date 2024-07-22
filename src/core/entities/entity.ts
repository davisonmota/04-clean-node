import { UniqueEntityID } from "./unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  constructor(props: Props, id?: string){
    this._id = new UniqueEntityID(id)
    this.props = props
  }

  getId(): string {
    return this._id.getValue()
  }
}
