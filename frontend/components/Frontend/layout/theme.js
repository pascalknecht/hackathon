import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "48em",
  lg: "64em",
  xl: "80em",
  "2xl": "96em",
});

export const theme = extendTheme({
  breakpoints,
  colors: {
    orange: {
      600: "#EA580C",
    },
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6b7280",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    indigo: {
      50: "#EEF2FF",
      100: "#E0E7FF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#6366F1",
      600: "#4F46E5",
      700: "#4338CA",
      800: "#3730A3",
      900: "#312E81",
    },
    green: {
      500: "#10B981",
    },
    text: "#343D48", // body color and primary color
    text_secondary: "#02073E", // secondary body color
    heading: "#0F2137", // primary heading color
    heading_secondary: "#343D48", // heading color
    background: "#FFFFFF", // body background color
    background_secondary: "#F9FBFD", // secondary background color
    border_color: "#E9EDF5", // border color
    primary: "#EF9E48", // primary button and link color
    primaryLight: "#FCF2E8",
    black: "#0F2137",
    secondary: "#30c", // secondary color - can be used for hover states
    muted: "#7B8188", // muted color
    accent: "#609", // a contrast color for emphasizing UI
  },
  lineHeights: {
    body: "30px",
    // body: 1.5,
    heading: "50px",
    // heading: 1.125,
    tall: 1.8,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
    heading: "-0.5px",
  },
  layout: {
    container: {
      px: ["20px", null, null, null, "30px", "20px"],
    },
    header: {
      color: "#02073E",
      fontWeight: "normal",
      py: 3,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      // justifyContent: 'space-between',
    },
    main: {},
    footer: {
      backgroundColor: "background_secondary",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
      letterSpacing: "heading",
      color: "heading",
    },
    heroPrimary: {
      fontSize: [5, 55],
      fontWeight: "normal",
      lineHeight: ["40px", "80px"],
      letterSpacing: "-1px",
      textAlign: ["center", "left"],
    },
    title: {
      // extends the text.heading styles
      variant: "text.heading",
      // fontSize: [6, 7, 8],
      // fontWeight: 'display',
      fontWeight: "bold",
      fontSize: 18,
      lineHeight: "30px",
      color: "#0F2137",
    },
    heroSecondary: {
      color: "text_secondary",
      lineHeight: ["30px", "42px"],
      letterSpacing: "0.1em",
      textAlign: ["center", "left"],
    },
    lead: {
      fontSize: 40,
      fontFamily: "DM Sans",
      fontWeight: "500",
      lineHeight: "60px",
      letterSpacing: "-1.5px",
      color: "#0F2137",
    },
    muted: {
      lineHeight: "26px",
      color: "muted",
    },
    secondary: {
      fontWeight: 500,
      color: "#00A99D",
      lineHeight: "40px",
    },
  },
  components: {
    Steps,
    Container: {
      baseStyle: {
        maxW: "1200px",
      },
      variants: {
        SMALL: {
          maxW: "680px",
        },
      },
    },
    Link: {
      variants: {
        INDIGO: {
          bg: "indigo.600",
          color: "white",
          _hover: {
            textDecoration: "none",
            backgroundColor: "indigo.700",
          },
        },
        WHITE: {
          bg: "white",
          color: "indigo.600",
          _hover: {
            textDecoration: "none",
            backgroundColor: "gray.50",
          },
        },
      },
    },
    Input: {
      variants: {
        outlineNew: {
          field: {
            borderRadius: "4px",
            borderColor: "gray.300",
            borderWidth: 1,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 3,
            paddingBottom: 3,
            _placeholder: {
              color: "gray.500",
            },
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
      },
    },
    Textarea: {
      variants: {
        outlineNew: {
          borderRadius: "4px",
          borderColor: "gray.300",
          borderWidth: 1,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 3,
          paddingBottom: 3,
          _placeholder: {
            color: "gray.500",
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
      },
    },
    Checkbox: {
      variants: {
        outlineNew: {
          control: {
            borderRadius: "4px",
            borderColor: "gray.400",
            borderWidth: 1,
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
        colorScheme: "indigo",
      },
    },
    Radio: {
      variants: {
        outlineNew: {
          control: {
            borderColor: "gray.400",
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
        colorScheme: "indigo",
      },
    },
  },
  fonts: {
    body: "DM Sans",
    // body:
    //   'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "DM Sans",
    // heading: 'Bree Serif',
    monospace: "Menlo, monospace",
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.500",
      },
      "ul, ol": {
        listStyle: "none",
      },
    },
  },
});
