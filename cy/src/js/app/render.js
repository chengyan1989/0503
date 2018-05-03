define(["jquery", "handlebars"], function($, Handlebars) {
    function render(scriptID, data, parendID) {
        var src = scriptID.html();
        var template = Handlebars.compile(src);
        var html = template(data);
        parendID.html(html);
    }
    return {
        render: render
    }
})