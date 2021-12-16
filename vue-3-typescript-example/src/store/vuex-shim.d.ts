//https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#typescript-support
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
      user:Student
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}