import store from '../../store'
import {setLoadingStatus} from '../../store/actions'

const Index = status => {
    store.dispatch(setLoadingStatus(status))
}

export default Index