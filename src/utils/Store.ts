import Block from './Block'
import { ChatsData } from '../api/ChatAPI'
import { EventBus } from './EventBus'
import { GuestData } from '../api/ProfileAPI'
import { User } from '../api/AuthAPI'
import { set } from './helpers'

interface State {
  messages:[]
  user?: {
    data?: User
    error?: string
    isLoading?: boolean
  }
  search?: {
    data?: GuestData[]
    error?: string
    isLoading?: boolean
  }
  selectUser?: GuestData
  chats?: {
    data?: ChatsData[]
    isLoading?: boolean
  }
}

enum StoreEvent {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: State = { user: {}, messages: [] }

  set(path: string, value: unknown) {
    set(this.state, path, value)

    this.emit(StoreEvent.Updated, this.state)
  }
  getState(): State {
    return this.state
  }
}

const store = new Store()

export const withStore = (mapStateToProps: (state: State) => any) => (
  Component: typeof Block,
) => {
  let propsFromState: any

  return class WithStore extends Component {
    constructor(props: any) {
      propsFromState = mapStateToProps(store.getState())

      super({ ...props, ...propsFromState })

      // store.on(StoreEvent.Updated, () => {
      //   const stateProps = mapStateToProps(store.getState())

      //   propsFromState = stateProps

      //   this.setProps({ ...stateProps })
      // })
      store.on(StoreEvent.Updated, (newState) => {
        const newPropsFromState = mapStateToProps(newState)

        // if (isEqual(propsFromState, newPropsFromState)) {
        //   return
        // }
        // propsFromState = { ...newPropsFromState }
        // this.setProps({ ...newPropsFromState })

        // -----
        propsFromState = { ...newPropsFromState }
        this.setProps({ ...propsFromState })
        // -----
      })
    }
  }
}

export default store
