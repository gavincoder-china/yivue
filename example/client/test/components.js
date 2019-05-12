yivue.components["component-foot"] = {
		data: function () {
			return {

			}
		},
		template: document.getElementById('component-foot').innerHTML
	};

yivue.components["component-head"] = {
		data: function () {
			return {

			}
		},
		template: document.getElementById('component-head').innerHTML
	};

yivue.components["component-menu"] = {
		data: function () {
			return {
				lists: [
					{
						title: '导航一',
						isopen: true,
						ull: [
							{
								name: 'li',
								href: 'index',
								active: false,
								value: '首页'
							}
						]
					},
					{
						title: '导航二',
						isopen: false,
						ull: [
							{
								name: 'li',
								href: 'news',
								active: false,
								value: '新闻'
							}
						]
					}
				]
			}
		},
		created: function () {
			this.ShowHide();
		},
		methods: {
			ShowHide: function () {
				var _route = this.$route.name;
				this.lists.forEach(function (v, i) {
					v.isopen = false;
					var ull = v.ull;
					var len = ull.length;
					for (var i = 0; i < len; i++) {
						if (ull[i].href == _route) {
							v.isopen = true;
							ull[i].active = true;
						} else {
							ull[i].active = false;
						}
					}
				})
			},
			Toggle: function (item) {
				this.lists.forEach(function (v, i) {
					v.isopen = false;
				})
				item.isopen = !item.isopen;
			},
			GoHref: function (item) {
				this.$router.push({
					name: item.href,
					params: item.params
				});
				this.ShowHide();
			}
		},
		template: document.getElementById('component-menu').innerHTML
	};

