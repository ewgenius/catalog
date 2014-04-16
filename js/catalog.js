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

var CatalogApp = function() {
    this.selector = $('#product_selector');
    this.table = $('#table_result');
    this.data = null;
    this.backet = {};

    var self = this;

    this.addItem = function(id) {
        var item = self.data[id];
        if (self.backet[id] == undefined) {
            self.backet[id] = item;
            self.backet[id].count = 1;

            var cell_count = $('<td>').html('1');
            var cell_cost = $('<td>').html('0');

            self.table.append($('<tr>')
                .attr('data-id', id)
                .append($('<td>').html(item.name))
                .append($('<td>').html($('<a>')
                    .html('-')
                    .attr('href', 'javascript:;')
                    .click(function() {
                        var row = $(this).parent().parent();
                        var id = row.attr('data-id');
                        if (self.backet[id].count > 0) {
                            self.backet[id].count--;
                            cell_count.html(self.backet[id].count);
                        } else {
                            delete self.backet[id];
                            row.remove();
                        }
                    })))
                .append(cell_count)
                .append($('<td>').html($('<a>')
                    .html('+')
                    .attr('href', 'javascript:;')
                    .click(function() {
                        var row = $(this).parent().parent();
                        var id = row.attr('data-id');
                        if (self.backet[id].count < self.backet[id].amount) {
                            self.backet[id].count++;
                            cell_count.html(self.backet[id].count);
                        }
                    })))
                .append(cell_cost)
                .append($('<td>').html($('<a>')
                    .html('&#xD7;')
                    .attr('href', 'javascript:;')
                    .click(function() {
                        var row = $(this).parent().parent();
                        delete self.backet[row.attr('data-id')];
                        row.remove();
                    }))));
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
    }
};

var app = new CatalogApp();
app.update(data);