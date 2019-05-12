yivue.routes.push({
		path: '/index',
		name: 'index',
		components: {
			'head': yivue.components['component-head'],
			'menu': yivue.components['component-menu'],
			'foot': yivue.components['component-foot'],
			'body': yivue.pages['page-index']
		}
	})

yivue.routes.push({
		path: '/news',
		name: 'news',
		components: {
			'head': yivue.components['component-head'],
			'menu': yivue.components['component-menu'],
			'foot': yivue.components['component-foot'],
			'body': yivue.pages['page-news']
		}
	})

