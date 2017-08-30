const data = {
  mainMenu: [
    {
      name: 'Global Picture',
      link: '/',
    },
    {
      name: 'Profiles',
      icon: 'pie graph',
      link: '',
      children: [
        {
          name: 'Country Profiles',
          link: '/country-profiles',
          icon: 'area graph',
        },
        {
          name: 'Multilateral Profiles',
          link: '/multilateral-profiles',
          icon: 'area graph',
        },
      ],
    },
    {
      name: 'Unbundling Aid',
      link: '/unbundling-aid',
    },
    {
      name: 'Spotlight on Uganda',
      link: '/spotlight-on-uganda',
    },
    {
      name: 'Other Visualisations',
      icon: 'pie graph',
      link: '',
      children: [
        {
          name: 'Unbundling other official flows',
          link: '/unbundling-other-flows',
          icon: 'barcode',
        },
        {
          name: 'Where are the poor and where will they be?',
          link: '/where-are-the-poor',
          icon: 'users',
        },
        {
          name: 'Are domestic public resources able to meet the needs of the poorest people?',
          link: '/methodology',
          icon: 'area graph',
        },
        {
          name: 'Different providers, different priorities',
          link: '/',
          icon: 'area graph',
        },
      ],
    },
    {
      name: 'Methodology',
      link: '/methodology',
    },
  ],
};

export default data;
