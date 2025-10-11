export enum ContactField {
  LastNameLabel = 'Фамилия',
  FirstNameLabel = 'Имя',
  PhoneLabel = 'Контактный телефон',
  TypeLabel = 'Услуга',
  DescriptionLabel = 'Описание',

  LastName = 'lastName',
  FirstName = 'firstName',
  Phone = 'phone',
  Type = 'type',
  Description = 'description',
}

export enum FieldFormat {
  Date = 'DD.MM.YYYY',
  DateEN = 'MM/DD/YYYY',
}

export const FieldRules = {
  Required: { required: true, message: 'Заполните поле!' },
  PhoneNum: {
    pattern: /^\+7\d{10}$/,
    message: 'Формат номера +7 000 000 00 00',
  },
  ClientName: { pattern: /^[A-Za-zА-Яа-яЁё]+$/, message: 'Только буквы!' },
  PaymentAmount: {
    type: 'number',
    min: 0,
    max: 500000,
    message: 'Введите сумму от 0 до 300 000',
  },
} as const
