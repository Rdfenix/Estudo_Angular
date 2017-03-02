function ItemService(opt_items) {
	var items = opt_items || [];
	this.list = function () {
		return items;
	};
	this.add = function (item) {
		items.push(item);
	};
}

angular.module('noteApp', [])
	.provider('ItemService', function () {
		var haveDefaultItems = true;
		var self = this;
		self.disableDefaultItems = function () {
			haveDefaultItems = false;
		};

		//Esta função obtem nossas dependencias, e não o provedor anterior
		self.$get = [function () {
			var optItems = [];
			if (haveDefaultItems) {
				optItems = [{
						id: 1,
						label: 'Item 0'
					},
					{
						id: 2,
						label: 'Item 1'
					}
				];
			}
			return new ItemService(optItems);
		}];
	})
	.config(['ItemServiceProvider', function (ItemServiceProvider) {
		//Para ver como o provedor pode alterar a configuração, altere o valor de
		//shoulHaveDefaults para true e tente executar o exemplo
		var shoulHaveDefaults = false;

		//obtem a configuração do servidor
		//define shoulHaveDefaults de alguma maneira
		//suponha que ele mude de modo mágico, por enquanto
		if (!shoulHaveDefaults) {
			ItemServiceProvider.disableDefaultItems();
		}
	}])
	.controller('MainCtrl', [function () {
		var self = this;
		self.tab = 'first';
		self.open = function (tab) {
			self.tab = tab;
		};
	}])
	.controller('SubCtrl', ['ItemService', function (ItemService) {
		var self = this;
		self.list = function () {
			return ItemService.list();
		};
		self.add = function () {
			ItemService.add({
				id: self.list()
					.length + 1,
				label: 'Item ' + self.list()
					.length
			});
		};
	}]);
