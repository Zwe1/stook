import get from 'lodash.get'
import { State, Handlers, NameOptions, NameProps } from '../types'

export class ToolBuilder<T> {
  constructor(private handlers: Handlers, private state: State<T>) {}

  createName = () => {
    const { state, handlers } = this
    /**
     * shortcut to bind form field with name，onChange, onBlur
     * @param name name of field
     * @param options onBlur options
     */
    return (name: string, options: NameOptions = { onBlur: true }) => {
      let { type, value } = options
      const props: NameProps = {
        name,
        onChange: handlers.handleChange,
      }
      if (type) props.type = type

      if (type === 'checkbox') {
        props.checked = get(state.values, name).includes(value)
      }
      if (type === 'radio') {
        props.checked = get(state.values, name) === value
      }
      props.value = value || get(state.values, name)

      if (options.onBlur) props.onBlur = handlers.handleBlur
      return props
    }
  }

  createError = () => {
    const { errors, touched } = this.state
    /**
     * shortcut to get error message
     * @param name name of field
     */
    return (name: string): any => {
      const isTouched = get(touched, name)
      const error = get(errors, name)
      if (!isTouched) return null
      return error || null
    }
  }
}
