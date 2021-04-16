import { Store } from "pullstate"

export type StoreProps = {
    isSignedIn: boolean;
}

const store = new Store<StoreProps>({
    isSignedIn: false
})

export default store;