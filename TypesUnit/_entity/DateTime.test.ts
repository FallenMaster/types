import {assert} from 'chai';
import DateTime from 'Types/_entity/DateTime';

describe('Types/_entity/DateTime', () => {
    describe('.constructor()', () => {
        it('should create instance of Date', () => {
            const instance = new DateTime();
            assert.instanceOf(instance, Date);
        });
    });

    describe('.toJSON()', () => {
        it('should save milliseconds into $options', () => {
            const instance = new DateTime();
            const time = instance.getTime();
            const serialized = instance.toJSON();

            assert.equal(serialized.state.$options, time);
        });
    });

    describe('::fromJSON()', () => {
        it('should create date from $options', () => {
            const time = 1234567890;
            const instance = DateTime.fromJSON({
                $serialized$: 'inst',
                module: '',
                id: 0,
                state: {
                    $options: time
                }
            });

            assert.equal(instance.getTime(), time);
        });
    });
});
