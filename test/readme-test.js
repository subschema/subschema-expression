import expression from "subschema-expression";
import expect from "expect";

describe('expression/Readme', function () {

    it('should exec example 1', function () {

        const exprObj = expression('hello {world}');

        const str = exprObj.format({
            world: 'Joe'
        });

        expect(str).toBe('hello Joe');
    });
    it('should exec example 2', function () {
        const exprObj = expression('hello {comma(you, "me")} and {uppercase(world)}');

        const str = exprObj.format({
            world: 'Joe',
            you: 'Bob'
        }, {
            uppercase(f){
                return f == null ? '' : f.toUpperCase()
            },
            comma(...args){
                return args.join(', ');
            }
        });

        expect(str).toBe('hello Bob, me and JOE');
    });

    it('should exec example 3', function () {

        const exprObj = expression('hello {uppercase(name.first)} and {name.last}');

        const str = exprObj.format({
            name: {
                first: 'Joe',
                last: 'Bob'
            }
        }, {
            uppercase(f){
                return f == null ? '' : f.toUpperCase()
            }
        });
        //str is hello JOE and Bob
        expect(str).toBe('hello JOE and Bob');
    });

    it ('should exec example 4', function(){


        const exprObj = expression('hello {uppercase(name.first)} and {name.last}');
        const formatters = {
            uppercase(f){
                return f == null ? '' : f.toUpperCase()
            }
        };
        let str = exprObj.format({
            name: {
                first: 'Joe',
                last: 'Bob'
            }
        }, formatters);

        //str is hello JOE and Bob
        expect(str).toBe('hello JOE and Bob')
        str = exprObj.format({
            name: {
                first: 'Billy',
                last: 'Joe'
            }
        }, formatters);

        //str is hello BILLY and Joe
        expect(str).toBe('hello BILLY and Joe')
    })

});