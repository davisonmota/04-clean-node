export class Slug {
  readonly value: string

  constructor(value: string) {
    this.value = value
  }
  
  static createFromText(value: string): Slug {
    const slugText = value
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w]+/g, '-')
      .replace(/_/g, '-')
      .replace(/--/g, '-')
      .replace(/-$/g, '')

  return new Slug(slugText)
}
  
}