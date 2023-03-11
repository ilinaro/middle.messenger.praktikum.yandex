export type MessageType = {
  NotBlank: string
  NotCorrect: string
  MinLength?: string
  MaxLength?: string
}

export default interface ValidatorInterface {
  readonly REGEX: RegExp
  readonly Message: MessageType

  empty(): boolean
  validate(): boolean
}
