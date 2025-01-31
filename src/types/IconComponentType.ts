export interface IconComponentProps {
  className?: string
}

export type IconComponentType = new() => React.Component<IconComponentProps>;