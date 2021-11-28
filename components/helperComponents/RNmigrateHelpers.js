export const View = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
)

export const TouchableWithoutFeedback = ({ children, ...rest }) => (
  <div {...rest} role="button" onClick={() => rest.onPress ? rest.onPress() : () => { }}>{children}</div>
)

export const Text = ({ children, ...rest }) => (
  <p {...rest}>{children}</p>
)
