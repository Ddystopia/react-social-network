import React from 'react'
import { shallow } from 'enzyme'

import Pagination from './Pagination'

describe('Pagination component test', () => {
  test('Total items is 11 but should be showed only 10', () => {
    const wrapper = shallow(
      <Pagination itemsCount={11} pageSize={1} portionSize={10} changePage={() => {}} />
    )
    const listItems = wrapper.find('li')
    expect(listItems.length).toBe(10)
  })
  test('Next button should be present', () => {
    const wrapper = shallow(
      <Pagination itemsCount={11} pageSize={1} portionSize={10} changePage={() => {}} />
    )
    const button = wrapper.find('button')
    expect(button.length).toBe(1)
  })
  test('Only prev button should be present after click', () => {
    const wrapper = shallow(
      <Pagination itemsCount={11} pageSize={1} portionSize={10} changePage={() => {}} />
    )
    const next = wrapper.find('#next')
    expect(next.length).toBe(1)
    next.simulate('click')
    expect(wrapper.find('#next').length).toBe(0)
    expect(wrapper.find('#prev').length).toBe(1)
  })
  test('Button prev and next should be present after click', () => {
    const wrapper = shallow(
      <Pagination itemsCount={22} pageSize={1} portionSize={1} changePage={() => {}} />
    )
    wrapper.find('#next').simulate('click')
    expect(wrapper.find('#prev').length).toBe(1)
  })
  test('If portionSize bigger then itemsCount should show all items', () => {
    const wrapper = shallow(
      <Pagination itemsCount={100} pageSize={1} portionSize={20000} changePage={() => {}} />
    )
    const listItems = wrapper.find('li')
    expect(listItems.length).toBe(100)
  })
})
