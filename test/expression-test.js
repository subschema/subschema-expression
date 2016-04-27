import expect from "expect";
import expression from "subschema-expression";
function junk(obj) {
    obj = obj || {};
    return '' + (escape($fns.stuff(loget(obj, 'name')))) + ' ' + (escapeGet(obj, 'other')) + ''
}
describe('expression', function () {
    this.timeout(50000);

    it('should substitute nicely', function () {

        var res = expression('{hello}');
        expect(res.listen.length).toBe(1, 'check length of listen')
        expect(res.listen[0]).toBe('hello', 'check value');

        expect(res.format({hello: 'joe'})).toBe('joe', 'substitute the value');
    });
    it('should substitute escape values', function () {

        var res = expression('{hello}');
        expect(res.listen.length).toBe(1, 'check length of listen')
        expect(res.listen[0]).toBe('hello', 'check value');
        var value = res.format({hello: '<h1>joe</h1>'});
        expect(value).toBe("&lt;h1&gt;joe&lt;/h1&gt;", 'substitute the value');
    });
    it('should substitute multiple values', function () {

        var res = expression('\'{hello} cruel <b>{world}</b>');
        expect(res.listen.length).toBe(2, 'check length of listen')

        var value = res.format({hello: '<h1>joe</h1>', world: 'is cool'});
        expect(value).toBe("\'&lt;h1&gt;joe&lt;/h1&gt; cruel <b>is cool</b>", 'substitute the value');
    });
    it('should substitute multiple values wierd', function () {
        var catche;
        try {
            var res = expression('{h\'ello} cruel <b>{world}</b>');
        }catch(e){
            catche = e;
        }
        expect(catche).toExist();
    });

    it('should substitute multiple values weirdo quotes', function () {

        var res = expression('{h\"ello} \"cruel <b>{world}</b>');
        expect(res.listen.length).toBe(2, 'check length of listen')

        var value = res.format({hello: '<h1>joe</h1>', world: 'is cool'});
        expect(value).toBe(" \"cruel <b>is cool</b>", 'substitute the value');
    });

});