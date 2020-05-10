import React from 'react';
import { create } from 'react-test-renderer';
import Pagination from './Pagination'

describe('Pagination component test', ()=>{
	test('Total items is 11 but should be showed only 10', ()=>{
		const component = create(<Pagination itemsCount={11} pageSize={1} portionSize={10} changePage={()=>{}} />)
		const listItems = component.root.findAllByType('li');
		expect(listItems.length).toBe(10)
	})
	test('One button should be present', ()=>{
		const component = create(<Pagination itemsCount={11} pageSize={1} portionSize={10} changePage={()=>{}} />)
		const button = component.root.findAllByType('button');
		expect(button.length).toBe(1)
	})
	test('If portionSize bigger then itemsCount should show all items', ()=>{
		const component = create(<Pagination itemsCount={100} pageSize={1} portionSize={20000} changePage={()=>{}} />)
		const listItems = component.root.findAllByType('li');
		expect(listItems.length).toBe(100)
	})
})