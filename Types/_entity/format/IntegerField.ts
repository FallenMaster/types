import Field from './Field';

/**
 * Формат целочисленного поля.
 * @remark
 * Создадим поле челочисленного типа:
 * <pre>
 *     var field = {
 *         name: 'foo',
 *         type: 'integer'
 *     };
 * </pre>
 * @class Types/_entity/format/IntegerField
 * @extends Types/_entity/format/Field
 * @public
 * @author Мальцев А.А.
 */
export default class IntegerField extends Field {
    _$defaultValue: number;
}

Object.assign(IntegerField.prototype, {
    '[Types/_entity/format/IntegerField]': true,
    _moduleName: 'Types/entity:format.IntegerField',
    _typeName: 'Integer',
    _$defaultValue: 0
});
