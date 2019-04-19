import DataSet from './DataSet';

/**
 * Интерфейс источника данных, поддерживающего {@link https://en.wikipedia.org/wiki/Remote_procedure_call RPC}.
 * @remark
 * Заставим тигра прыгнуть:
 * <pre>
 *    var dataSource = new RpcSource({
 *       endpoint: 'Tiger'
 *    });
 *    dataSource.call('jump', {height: '3 meters'}).addCallbacks(function(result) {
 *       console.log(result);
 *    }, function(error) {
 *       console.error(error);
 *    });
 * </pre>
 * @interface Types/_source/IRpc
 * @public
 * @author Мальцев А.А.
 */
export default interface IRpc {
   readonly '[Types/_source/IRpc]': boolean;

   /**
    *
    * Вызывает удаленный метод.
    * @param {String} command Имя метода
    * @param {Object} [data] Аргументы метода
    * @return {Promise.<Types/_source/DataSet>} Асинхронный результат выполнения: в случае успеха вернет
    * {@link Types/_source/DataSet}, в случае ошибки - Error.
    * @see Types/_source/DataSet
    * @example
    * Раздаем подарки сотрудникам, у которых сегодня день рождения. Также посчитаем их количество:
    * <pre>
    *    var dataSource = new RpcSource({
    *       endpoint: 'Employee'
    *    });
    *    dataSource.call('giveAGift', {
    *       birthDate: new Date(),
    *       giftCode: 'a-ticket-to-the-bowling'
    *    }).addCallbacks(function(dataSet) {
    *       var todaysBirthdayTotal = dataSet.getAll().getCount();
    *    }, function(error) {
    *       console.error(error);
    *    });
    * </pre>
    */
   call(command: string, data?: object): ExtendPromise<DataSet>;
}
