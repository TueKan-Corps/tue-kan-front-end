export const createPostData = [
  {
    id: 1,
    headerName: 'Topic : ',
    placeholder: 'Datacom, Movement, Number Theory, ...',
    name: 'topic',
    type: 'text',
    width: 'long',
  },
  {
    id: 2,
    headerName: 'Location : ',
    placeholder: 'ECC 801, E12 502, ...',
    name: 'location',
    type: 'text',
    width: 'long',
  },
  {
    id: 3,
    headerName: 'Date : ',
    placeholder: 'DD/MM/YY',
    name: 'date',
    type: 'text',
    width: 'normal',
  },
  {
    id: 4,
    headerName: 'Time : ',
    name: 'time',
    type: 'select',
    option: [
      {
        id: 0,
        value: '--select--'
      },
      {
        id: 1,
        value: '9.00'
      },
      {
        id: 2,
        value: '10.00'
      },
      {
        id: 3,
        value: '11.00'
      },
      {
        id: 4,
        value: '12.00'
      },
    ],
    width: 'normal',
  },
  {
    id: 5,
    headerName: 'Category : ',
    name: 'category',
    type: 'select',
    option: [
      {
        id: 0,
        value: '--select--'
      },
      {
        id: 1,
        value: 'Mathmetic'
      },
      {
        id: 2,
        value: 'Science'
      },
      {
        id: 3,
        value: 'Thai'
      },
      {
        id: 4,
        value: 'Social'
      },
      {
        id: 5,
        value: 'English'
      },
    ],
    width: 'normal',
  },
  {
    id: 6,
    headerName: 'Tue type : ',
    type: 'radio',
    option: [
      {
        id: 1,
        name: 'tue-type',
        value: 'FREE'
      },
      {
        id: 2,
        name: 'tue-type',
        value: 'PAYED'
      },
    ],
    width: 'normal',
  },
  {
    id: 7,
    headerName: 'Price : ',
    placeholder: '99,999',
    name: 'price',
    type: 'text',
    width: 'normal',
  },
  {
    id: 8,
    headerName: 'Description : ',
    placeholder: 'tue detail ...',
    name: 'description',
    type: 'textarea',
    width: 'long',
  },
];
