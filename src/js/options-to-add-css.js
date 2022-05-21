// option 1 is to add selectors in css

// option 2 is to add tag style in the head
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Countdown timer</title>
//     <link rel="stylesheet" href="css/common.css" />
//     <!-- <style>
//       .timer {
//         display: flex;
//       }
//       .value {
//         display: block;
//         font-size: 36px;
//       }
//       .field {
//         margin-right: 15px;
//         text-align: center;
//         text-transform: uppercase;
//       }
//     </style> -->
//   </head>

// option 3 is to use a template string to add styles
// refs.startBtn.style = `width: 50px;
// height: 50px;
// border-radius: 50%;
// font-size: 15px;
// background-color: green;
// color: white;
// cursor: pointer;
// `;
// refs.divTimer.style = `font-size: 24px;
// color: rgb(120 35 150);
// `;

// option 4 in js using queryselectors and cycle

// refs.divTimer.style.display = 'flex';
// // // console.log(refs.field); // array
// refs.field.forEach(el => {
//   el.style.display = 'flex';
//   el.style.flexDirection = 'column';
//   el.style.alignItems = 'center';
//   el.style.width = 'auto';
//   el.style.margin = '20px';
//   el.style.fontSize = '25px';
//   el.style.fontWeight = '500';
//   el.style.textTransform = 'uppercase';
// });
