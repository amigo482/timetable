const libraries = [
  {
    name: 'менеджера',
    type: 'admins',
    schema: {
      login: 'text',
      pass: 'pass',
      faculty: 'select'
    }
  },
  {
    name: 'факультета',
    type: 'faculties',
    schema: {
      name: 'text',
      abbr: 'text',
    }
  },
  {
    name: 'направления',
    type: 'directions',
    schema: {
      code: 'text',
      name: 'text',
      level: 'select',
      profile: 'text',
      abbr: 'text',
      faculty: 'select',
    }
  },
  {
    name: 'преподавателя',
    type: 'teachers',
    schema: {
      code: 'text',
      name: 'text',
      level: 'text',
      profile: 'text',
      abbr: 'text',
      faculty: 'select',
    }
  },
  {
    name: 'предмета',
    type: 'subjects',
    schema: {
      name: 'text',
      abbr: 'text',
      faculty: 'select',
    }
  },
  {
    name: 'аудитории',
    type: 'auditories',
    schema: {
      name: 'text',
      extraName: 'text',
      housing: 'text',
      capacity: 'text',
      projector: 'checkbox',
      computer: 'checkbox',
    }
  },
];


export default libraries;