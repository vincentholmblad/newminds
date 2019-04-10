import { shallowMount } from '@vue/test-utils'
import Search from './src/components/Search.vue'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Search)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})