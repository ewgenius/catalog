var data = [{
    "name": "Браслет Power Balance",
    "cost": 990,
    "amount": 590
}, {
    "name": "Часы Samurai",
    "cost": 890,
    "amount": 590
}, {
    "name": "Часы Ice Watch",
    "cost": 890,
    "amount": 590
}, {
    "name": "Часы Casio G-Shock",
    "cost": 1290,
    "amount": 890
}];

(function() {
    var CatalogApp = function() {
        this.selector = $('#product_selector');
        this.table = $('#table_result');
        this.data = null;
        this.backet = {
            items: {},
            cell_total: $('#total'),
            total: 0,
            addOne: function(id) {
                if (this.items[id].count < this.items[id].amount) {
                    this.items[id].count++;
                    this.items[id].cell_count.html(this.items[id].count);
                    this.total += this.items[id].cost;
                    this.updateCost(id);
                } else {
                    alert('Максимум ' + this.items[id].amount + ' единиц товара');
                }
            },
            removeOne: function(id) {
                if (this.items[id].count > 0) {
                    this.items[id].count--;
                    this.items[id].cell_count.html(this.items[id].count);
                    this.total -= this.items[id].cost;
                    this.updateCost(id);
                }
            },
            remove: function(id) {
                this.total -= this.items[id].cost * this.items[id].count;
                this.cell_total.html(this.total);
                this.items[id].row.remove();
                delete this.items[id];
            },
            updateCost: function(id) {
                this.items[id].cell_cost.html(this.items[id].cost * this.items[id].count);
                this.cell_total.html(this.total);
            },
            clear: function() {
                for (var id in this.items) {
                    this.remove(id);
                }
            },
            submit: function() {
                // send result
                this.clear();
                alert('Заказ оформлен');
            }
        };

        var self = this;

        $('#submit').click(function() {
            self.backet.submit();
        });


        this.addItem = function(id) {
            var item = self.data[id];
            if (self.backet.items[id] == undefined) {
                var cell_count = $('<td>').html('1').addClass('center');
                var cell_cost = $('<td>').html('0').addClass('center');

                self.backet.items[id] = item;
                self.backet.items[id].count = 1;
                self.backet.items[id].cell_count = cell_count;
                self.backet.items[id].cell_cost = cell_cost;
                self.backet.total += item.cost;
                self.backet.updateCost(id);

                var row = $('<tr>')
                    .attr('data-id', id)
                    .append($('<td>').html(item.name))
                    .append($('<td>')
                        .addClass('button')
                        .html($('<a>')
                            .html('-')
                            .attr('href', 'javascript:;')
                            .click(function() {
                                var row = $(this).parent().parent();
                                var id = row.attr('data-id');
                                self.backet.removeOne(id);
                            })))
                    .append(cell_count)
                    .append($('<td>')
                        .addClass('button')
                        .html($('<a>')
                            .html('+')
                            .attr('href', 'javascript:;')
                            .click(function() {
                                var row = $(this).parent().parent();
                                var id = row.attr('data-id');
                                self.backet.addOne(id);
                            })))
                    .append(cell_cost)
                    .append($('<td>')
                        .addClass('button')
                        .html($('<a>')
                            .html('&#xD7;')
                            .attr('href', 'javascript:;')
                            .click(function() {
                                var row = $(this).parent().parent();
                                self.backet.remove(row.attr('data-id'));
                            })));
                self.backet.items[id].row = row;

                $(self.table.find('tr')[0]).after(row);
            }
        }

        this.selector.change(function() {
            var id = this.selectedIndex;
            self.addItem(id);
        });

        this.update = function(data) {
            this.data = data;
            for (var i = 0; i < data.length; i++) {
                this.selector.append($('<option>')
                    .html(data[i].name));
            };
        };
    };

    var app = new CatalogApp();
    app.update(data);
})();