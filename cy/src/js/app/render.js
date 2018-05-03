define(["jquery", 'handlebars'], function($, Handlebars) {
    function render(scriptID, data, contentBox) {
        var src = scriptID.html();

        var template = Handlebars.compile(src);
        // Handlebars.registerHelper("add", function(index) {
        //     return index + 1
        // });
        var html = template(data);
        contentBox.html(html);
    }
    return {
        render: render
    }
})