﻿import { observer } from 'mobx-react-lite';
import React from 'react'
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityFilters() {
	const { activityStore: { predicate, setPredicate } } = useStore();
	return (
		<>
			<Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
				<Header icon='filter' attached color='teal' content='Filters' />
				<Menu.Item 
					content='All Activities'
					active={predicate.has('all')}
					onclick={() => setPredicate('all', 'true') }
                    
				/>
				<Menu.Item
					content="I'm going"
					active={predicate.has('isGoing')}
					onclick={() => setPredicate('isGoing', 'true')}
				/>
				<Menu.Item content="I'm hosting"
					active={predicate.has('isHost')}
					onclick={() => setPredicate('isHost', 'true')}   
				/>
			</Menu>
			<Header />
			<Calendar
				onChange={(date: Date) => setPredicate('startDate', date as Date)}
				value={predicate.get('startDate') || new Date()}
			/>
		</>

	);

});