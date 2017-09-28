// @flow
export type MenueItem = {
  name: string,
  link: string,
  icon?: string,
  children?: MenueItem[]
}
export type Menue = {
  mainMenu: MenueItem[]
}

export const menueData: Menue = {
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
          link: '/multilaterals',
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
          name: 'Who are the global P20',
          link: '/who-are-the-global-p20',
          icon: 'users',
        },
        {
          name: 'Different providers, different priorities',
          link: '/oda-donor',
          icon: 'area graph',
        },
        {
          name: 'Are domestic public resources able to meet the needs of the poorest people?',
          link: '/poverty',
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

