// Напиши скрипт, который при сабмите формы вызывает
//  функцию createPromise(position, delay) столько раз,
//  сколько ввели в поле amount. call=amount

// При каждом вызове передай ей номер
// создаваемого промиса(position)=номер amont и
// задержку учитывая введенную пользователем первую
// задержку(delay) и шаг(step). (1я задержка, а потом каждая с шагом)

// Дополни код функции createPromise так, чтобы она
// возвращала один промис, который выполянется или
// отклоняется через delay времени.

// !Значением промиса должен быть объект {},! в котором
// будут свойства position и delay со значениями
// одноименных параметров.

// Используй начальный код функции для выбора того,
// что нужно сделать с промисом - выполнить или отклонить.

// let position = null;
// let delay = null;
// let step = null;

// option 1

// function onSubmit(event) {
//   event.preventDefault();
//   position = refs.amount.value;
//   delay = refs.delay.value;
//   step = refs.step.value;
//   // console.log(delay);
//   // createPromise(values from input );
//   for (let index = 1; index <= position; index += 1) {
//     if (index != 1) {
//       delay = Number(delay) + Number(step);
//       // console.log(delay);
//     }

//     createPromise(index, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }

// option 2
// function onSubmit(event) {
//   event.preventDefault();
//   position = refs.amount.value;
//   delay = refs.delay.value;
//   step = refs.step.value;
//   // console.log(delay);
//   // createPromise(values from input );
//   for (let index = 1; index <= position; index += 1) {
//         createPromise(index, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay = Number(delay) + Number(step);
//   }
// }
