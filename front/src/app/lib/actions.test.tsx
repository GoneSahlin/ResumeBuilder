import { cleanData } from "./actions";




// jest.mock('./actions/cleanData', () => ({
//   cleanData: jest.fn(),
// }));

// describe('TodoList', () => {
//   it('calls action on submit', async () => {
//     render(<TodoList />)
//     fireEvent.input(screen.getByRole('textbox', { name: 'Message' }), { target: { value: 'new todo' }})
//     fireEvent.click(screen.getByRole('button'))

//     // wait for todos refreshed from server
//     await screen.findByText('new todo')
    
//     expect(addTodo).toHaveBeenCalledWith({ message: 'new todo'  })
//   })
// })
// const cleanData = require('./actions');

// test('tests clean data', () => {
//   // const exampleData: any = {
//   //   firstName: 'Zach',
//   //   lastName: 'Sahlin',
//   //   github: 'GoneSahlin',
//   //   educationName0: 'Gonzaga University',
//   //   educationLocation0: 'Spokane, WA',
//   //   educationStartDate0: 'Aug 2019',
//   //   educationEndDate0: 'May 2023',
//   //   educationMajor0: 'BS in Computer Science',
//   //   email: 'zach@sahlins.net',
//   //   education0bullet0: 'bullet1',
//   //   education0bullet1: 'bullet2'
//   // };

//   // expect(cleanData(exampleData)).toBe({});
//   expect("hello".toBe("hello"))
// });
