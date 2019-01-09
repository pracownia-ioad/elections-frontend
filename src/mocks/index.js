export const votings = [
  {
    id: 0,
    name: 'First',
    startDate: new Date(2018, 10, 24),
    endDate: new Date(2018, 10, 28),
  },
  {
    id: 1,
    name: 'Second',
    startDate: new Date(2018, 10, 24),
    endDate: new Date(2018, 11, 30),
  },
  {
    id: 2,
    name: 'Third',
    startDate: new Date(2018, 10, 12),
    endDate: new Date(2018, 10, 24),
  },
];

export const candidates = [
  { id: 0, firstName: 'Szymon', lastName: 'Tosik' },
  { id: 1, firstName: 'Dawid', lastName: 'Urbaniak' },
  { id: 2, firstName: 'Szymon', lastName: 'Marciniak' },
];

export const fullVotings = [
  {
    id: 0,
    name: 'First',
    description: 'Głosowanie na przewodniczącego rady samorządu studenckiego.',
    startDate: new Date(2018, 10, 24),
    endDate: new Date(2018, 10, 28),
    candidates,
  },
  {
    id: 1,
    name: 'Second',
    description: 'Głosowanie na zastępce przewodniczącego koła doktoranckiego.',
    startDate: new Date(2018, 10, 24),
    endDate: new Date(2018, 11, 30),
    candidates,
  },
  {
    id: 2,
    name: 'Third',
    description: 'Głosowanie na najgorszego wykładowcę.',
    startDate: new Date(2018, 10, 12),
    endDate: new Date(2018, 10, 24),
    candidates,
  },
];
