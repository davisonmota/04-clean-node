// Error
export class Left<L> {
  constructor(readonly value: L) {}
}

// Success
export class Right<R> {
  constructor(readonly value: R) {}
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
