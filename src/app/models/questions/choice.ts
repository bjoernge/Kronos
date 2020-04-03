export interface Choice<T = string> {
  text: string;
  value: T;
  hideIf?: (context: any) => boolean
}
