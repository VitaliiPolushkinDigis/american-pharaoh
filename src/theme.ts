import { createTheme, Theme, ThemeOptions } from '@mui/material';
import tinycolor from 'tinycolor2';

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--primaryColor': '#18563e',
          '--mainLightColor': '#467764',
          '--darkprimaryColor': '#0b291d',
          // Text
          '--primaryTextColor': '#fff',
          '--greyTextColor': '#c7c7d9',
          '--darkGrey': '#949494',

          // Background-color
          '--primaryBgrColor': '#000',
          '--darkGreyBg': '#252525',

          '--dividerColor': '#979797',

          // scroll-bar colors
          '--darkScrollColor': '#121527',
          '--lightScrollColor': '#6772b8',

          // Border Radius
          '--buttonBorderRadius': '8px',
          '--commonBorderRadius': '8px',

          // Paddings
          '--pagePadding': '24px',
          '--inversePagePadding': '-16px',
          '--titlePadding': '10px',
          '--additionalPagePadding': '10px',

          // Common
          '--white': '#fff',
          '--black': '#000',
          '--blue': '#009aff',
          '--blueDark': '#2d5af0',
          '--yellow': '#ffb515',
          '--error': '#c60f2f',
          '--blueTextColor': '#009aff',
          '--darkGreyButtonColor': '#1a1a1a',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          minWidth: '320px',
          fontSize: '14px',
          lineHeight: 1.4,
          color: 'var(--primaryTextColor)',
          backgroundColor: 'var(--primaryBgrColor)',
          fontFamily: `'Open Sans', sans-serif`,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 15px',
          borderRadius: 8,
        },
        outlinedPrimary: {
          padding: '11px 15px',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          lineHeight: '26px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          width: '100%',
          fontSize: '16px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          padding: '10px 0',
          color: '#C7C7D9',
          fontSize: '16px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        gutters: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        input: {
          height: 48,
          padding: '1.5px 14px',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#467764',
      main: '#407BFF',
      dark: '#103c2b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F59F1E',
      dark: '#121527',
    },
    common: {
      white: '#fff',
      black: '#000',
    },
    text: {
      disabled: '#c7c7d9',
    },
    action: {
      disabledBackground: '#bcbccc',
      disabled: '#fff',
    },
  },
  typography: {
    button: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'capitalize',
    },
    fontFamily: "'Open Sans', sans-serif",
  },
};

// Basic theme
const basicTheme = createTheme(themeOptions);

const createComponents = (theme: Theme) => {
  const isDark = tinycolor(theme.palette.primary.main).isDark();
  const primaryHoverColor = tinycolor(theme.palette.primary.main)
    [isDark ? 'lighten' : 'darken']()
    .toString();

  return {
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { color: '#c7c7d9' },
        multiline: {
          padding: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': { borderBottom: `1px solid ${theme.palette.primary.light}` },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: theme.palette.primary.contrastText,

          '&:hover': {
            backgroundColor: primaryHoverColor,
          },
        },
        outlinedPrimary: {
          borderColor: theme.palette.primary.main,

          '&:hover': {
            color: primaryHoverColor,
            borderColor: primaryHoverColor,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: '1px solid',
          borderColor: theme.palette.primary.main,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  };
};

// Theme with component color based overrides
export const theme = createTheme(basicTheme, {
  components: createComponents(basicTheme),
});

// Custom theme with custom primary main, primary light & secondary main colors
export const createCustomTheme = ({
  primaryColor = theme.palette.primary.main,
  secondaryColor = theme.palette.secondary.main,
  textColor,
}: {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
}) => {
  const customTheme = createTheme(themeOptions, {
    palette: {
      primary: {
        main: primaryColor,
        contrastText: textColor || theme.palette.getContrastText(primaryColor),
      },
      secondary: {
        main: secondaryColor || theme.palette.secondary.main,
        contrastText: textColor || theme.palette.getContrastText(secondaryColor),
      },
    },
  });

  return createTheme(customTheme, {
    components: createComponents(customTheme),
  });
};
