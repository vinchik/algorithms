const ukraineTowns = [
    {
      name: 'Kyiv',
      neighbors: [
        'Chernihiv',
        'Zhytomyr',
        'Poltava'
      ]
    },
    {
      name: 'Zhytomyr',
      neighbors: [
        'Rivne',
        'Vinnytsia',
        'Kyiv'
      ]
    },
    {
      name: 'Poltava',
      neighbors: [
        'Kharkiv',
        'Kremenchuk',
        'Kyiv'
      ]
    },
    {
      name: 'Kremenchuk',
      neighbors: [
        'Poltava',
        'Kropyvnytskyi',
        'Dnipro'
      ]
    },
    {
      name: 'Kropyvnytskyi',
      neighbors: [
        'Vinnytsia',
        'Kremenchuk'
      ]
    },
    {
      name: 'Vinnytsia',
      neighbors: [
        'Zhytomyr',
        'Kropyvnytskyi'
      ]
    },
    {
      name: 'Dnipro',
      neighbors: [
        'Kharkiv',
        'Kryvyi Rih',
        'Kremenchuk'
      ]
    },
    {
      name: 'Kharkiv',
      neighbors: [
        'Dnipro',
        'Poltava',
        'Luhansk'
      ]
    }
  ];

export default ukraineTowns;