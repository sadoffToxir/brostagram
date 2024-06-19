import { aliases, mdi } from 'vuetify/iconsets/mdi'

import colors from '../../assets/scss/vuetify/colors'

export default {
  theme: {
    themes: {
      light: {
        dark: false,
        colors
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
}
