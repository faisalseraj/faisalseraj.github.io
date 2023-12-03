import { extendTheme } from '@chakra-ui/react';

export enum Fonts {
  Inter = '"Inter", "sans-serif"',
  InknutAntiqua = '"Inknut Antiqua"'
}

export const theme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      darkestBlack: '#111213',
      black: '#1D1E20',
      lightBlack: '#2F3237',
      darkestGrey: '#5E636E',
      mediumGrey: '#8F96A3',
      normalGrey: '#C2C9D6',
      lightGrey: '#DEE3ED',
      lighterGrey: '#F1F3F9',
      lightestGrey: '#F8F9FC',
      red: '#E53E3E',
      blue: '#16408B',
      yellow: '#F1AE3C',
      orange: '#ED8936',
      green: '#38A169',
      // Used by Radio buttons etc
      500: '#F1AE3C'
    },

    blue: {
      50: '#95B6EE',
      500: '#16408B',
      600: '#11316A'
    },

    green: {
      500: '#38A169'
    },

    red: {
      500: '#E53E3E'
    },

    // For grey buttons
    gray: {
      500: '#5E636E'
    },

    success: '#38A169',
    warning: '#DD6B20',
    error: '#E53E3E'
  },

  styles: {
    global: {
      'body, html': {
        fontFamily: Fonts.Inter,
        fontSize: '16px',
        fontWeight: 500,
        color: 'brand.darkestBlack',
        backgroundColor: 'brand.lightestGrey',
        '& .printContainer': {
          backgroundColor: 'white',
          margin: '3em 3em 3em 3em',
          'h1, h2, h3, h4, h5, h6': {
            color: 'black'
          },
          a: {
            color: 'black'
          }
        },

        // In conjunction with the `focus-visible` package, we hide the focus outline
        // on the styled element that follows a hidden input (checkboxes, switches...) unless the
        // hidden input has the `data-focus-visible-added` attribute
        'input:not([data-focus-visible-added]) + [data-focus]': {
          boxShadow: 'none'
        }
      }
    }
  },
  components: {
    Heading: {
      baseStyle: {
        mb: [8, null, 16],
        fontFamily: Fonts.InknutAntiqua,
        fontWeight: 'medium'
      },
      sizes: {
        xl: {
          fontSize: ['xl', '2xl', '3xl']
        }
      },
      variants: {
        subTitle: {
          color: 'brand.black',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontFamily: Fonts.Inter,
          fontSize: `${18 / 16}rem`,
          mb: 0
        },

        sectionSubTitle: {
          color: 'brand.black',
          fontWeight: 600,
          fontFamily: Fonts.Inter,
          fontSize: `${18 / 16}rem !important`,
          mb: 0
        },

        sectionHeading: {
          fontSize: `${24 / 16}rem`,
          fontWeight: 600,
          fontFamily: Fonts.Inter,
          color: 'brand.black'
        },

        headedSectionHeading: {
          fontSize: `${24 / 16}rem`,
          fontWeight: 600,
          fontFamily: Fonts.Inter,
          color: 'white',
          marginBottom: 0
        }
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'brand.normalGrey',
            minHeight: '64px',
            backgroundColor: 'white',
            _placeholder: { color: 'brand.mediumGrey' }
          },
          addon: {
            borderColor: 'brand.normalGrey'
          }
        }
      },
      defaultProps: {
        focusBorderColor: 'brand.yellow'
      }
    },
    Text: {
      variants: {
        info: {
          color: 'brand.darkestGrey',
          mb: '5',
          mt: '2',
          fontSize: '14px'
        }
      }
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: 'brand.normalGrey',
          backgroundColor: 'white'
        }
      },
      defaultProps: {
        focusBorderColor: 'brand.yellow'
      }
    },
    FormLabel: {
      baseStyle: {
        fontSize: `${14 / 16}rem`,
        fontWeight: 600,
        color: 'brand.black'
      }
    },
    Select: {
      parts: ['field', 'icon'],
      baseStyle: {
        field: {
          minHeight: '64px',
          backgroundColor: 'white'
        }
      },
      variants: {
        outline: {
          field: {
            borderColor: 'brand.normalGrey',
            _placeholder: { color: 'brand.mediumGrey' }
          }
        }
      },
      defaultProps: {
        backgroundColor: 'white',
        focusBorderColor: 'brand.yellow'
      }
    },
    Switch: {
      defaultProps: {
        colorScheme: 'green',
        size: 'lg'
      }
    },
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white'
        },
        label: {
          color: 'brand.black'
        }
      }
    },
    Radio: {
      baseStyle: {
        control: {
          bg: 'white'
        }
      },
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Tabs: {
      baseStyle: {
        tab: {
          textTransform: 'uppercase',
          fontWeight: 700
        },
        tabpanel: {
          px: 0
        }
      },
      variants: {
        line: {
          tab: {
            borderBottomWidth: '6px',
            _selected: {
              color: 'brand.yellow',
              borderColor: 'currentColor',
              borderBottomWidth: '6px'
            }
          }
        },
        enclosed: {
          tab: {
            _selected: {
              color: 'brand.blue',
              bg: '#F8F9FC',
              borderLeft: '1px',
              borderTop: '1px',
              borderRight: '1px',
              borderLeftColor: '#C2C9D6',
              borderTopColor: '#C2C9D6',
              borderRightColor: '#C2C9D6',
              fontWeight: 700
            },
            borderBottom: '2px',
            borderBottomColor: '#C2C9D6',
            fontWeight: 500,
            color: '#5E636E',
            textTransform: 'capitalize'
          }
        }
      }
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        borderRadius: 6,
        fontWeight: 600,
        lineHeight: 1
      },
      sizes: {
        md: {
          height: 9,
          fontSize: 'xs'
        },
        lg: {
          height: '46px',
          fontSize: `${15 / 16}rem`
        }
      },
      variants: {
        'md-secondary': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props,
            colorScheme: 'blue'
          }),
          bgColor: 'white',
          color: 'brand.blue',
          borderColor: 'brand.blue',
          height: 9,
          fontSize: 'xs',
          lineHeight: 1,

          _hover: {
            bgColor: 'brand.lightGrey'
          },

          _disabled: {
            borderColor: 'brand.mediumGrey',
            color: 'brand.mediumGrey'
          },

          _active: {
            borderColor: 'white',
            color: 'white',
            bgColor: 'brand.blue'
          }
        }),
        'md-error': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props,
            colorScheme: 'red'
          }),
          bgColor: 'white',
          color: 'brand.red',
          borderColor: 'brand.red',
          height: 9,
          fontSize: 'xs',
          lineHeight: 1
        }),
        'md-success': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props,
            colorScheme: 'green'
          }),
          bgColor: 'white',
          color: 'brand.green',
          borderColor: 'brand.green',
          height: 9,
          fontSize: 'xs',
          lineHeight: 1
        }),

        'md-secondary-grey': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props
          }),
          color: 'brand.darkestGrey',
          borderColor: 'brand.darkestGrey',
          height: 9,
          fontSize: 'xs',
          lineHeight: 1
        }),

        'md-primary': (props: object) => ({
          ...theme.components.Button.variants.solid({
            ...props,
            colorScheme: 'blue'
          }),
          height: 9,
          fontSize: 'xs',
          lineHeight: 1
        }),

        'lg-secondary-black': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props,
            colorScheme: 'black'
          }),
          borderColor: '#111213',
          color: '#111213',
          px: '38px',
          height: '46px',
          fontSize: `${15 / 16}rem`,
          lineHeight: 1
        }),

        'lg-secondary': (props: object) => ({
          ...theme.components.Button.variants.outline({
            ...props,
            colorScheme: 'blue'
          }),
          color: 'brand.blue',
          borderColor: 'brand.blue',
          px: '38px',
          height: '46px',
          fontSize: `${15 / 16}rem`,
          lineHeight: 1,

          _hover: {
            bgColor: 'brand.lightGrey'
          },

          _disabled: {
            borderColor: 'brand.mediumGrey',
            color: 'brand.mediumGrey'
          },

          _active: {
            borderColor: 'white',
            color: 'white',
            bgColor: 'brand.blue'
          }
        }),

        'lg-primary': (props: object) => ({
          ...theme.components.Button.variants.solid({ ...props }),
          backgroundColor: 'brand.yellow',
          px: '38px',
          height: '46px',
          fontSize: `${15 / 16}rem`,
          lineHeight: 1,

          _hover: {
            bgColor: '#E29B00'
          },

          _disabled: {
            backgroundColor: 'brand.lightGrey',
            color: 'brand.mediumGrey'
          },

          _active: {
            backgroundColor: 'brand.lightGrey'
          }
        }),

        circular: (props: unknown) => ({
          ...theme.components.Button.variants.outline(props),
          color: 'brand.darkestGrey',
          borderColor: 'brand.darkestGrey',
          borderRadius: '10px'
        })
      }
    },
    CloseButton: {
      baseStyle: {
        _hover: {
          bgColor: 'transparent'
        }
      }
    },
    Link: {
      baseStyle: {
        textDecoration: 'underline',
        color: 'brand.blue'
      },
      variants: {
        primary: {
          color: 'brand.orange',
          fontWeight: 600
        }
      }
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: '10px',
          p: {
            base: 4,
            sm: 5
          }
        }
      },
      variants: {
        subtle: (props: { status: string }) => {
          switch (props.status) {
            case 'warning':
              return {
                container: {
                  backgroundColor: 'rgba(237, 137, 54, 0.1)',
                  borderColor: 'rgba(237, 137, 54, 0.4)'
                }
              };
            case 'error':
              return {
                container: {
                  backgroundColor: 'rgba(229, 62, 62, 0.2)',
                  borderWidth: 0
                }
              };
          }
        }
      }
    },
    Table: {
      variants: {
        simple: {
          thead: {
            '&.striped tr > th': {
              borderBottomWidth: 0
            }
          },
          tbody: {
            '&.striped > tr': {
              '& > th, & > td': {
                borderBottomWidth: 0
              },
              '&.even > td': {
                bgColor: 'brand.lightestGrey'
              },
              '&.odd > td': {
                bgColor: 'brand.lighterGrey'
              },
              '&.disabled > td': {
                bgColor: '#FFD5D5'
              }
            },

            'tr.first': {
              '& > td:first-of-type': {
                borderTopLeftRadius: '6px'
              },
              '& > td:last-of-type': {
                borderTopRightRadius: '6px'
              }
            },

            'tr.last': {
              '& > td:first-of-type': {
                borderBottomLeftRadius: '6px'
              },
              '& > td:last-of-type': {
                borderBottomRightRadius: '6px'
              }
            }
          }
        }
      }
    },
    Tooltip: {
      baseStyle: {
        bgColor: 'white',
        color: 'brand.darkestBlack'
      }
    }
  },

  layerStyles: {
    bodyText: {
      fontFamily: Fonts.Inter,

      fontSize: '16px',
      fontWeight: 500,
      textTransform: 'none',
      color: 'brand.darkestBlack'
    },

    // The white section that's most commonly used
    section: {
      bg: 'white',
      borderRadius: '10px',
      width: '100%',
      py: {
        base: 8,
        sm: 10
      },
      px: {
        base: 3,
        sm: 10
      },
      '& h2, & h3': {
        fontSize: `${24 / 16}rem`,
        fontWeight: 600,
        fontFamily: Fonts.Inter,
        mb: 0
      },

      '& h2': {
        mb: 4
      }
    },

    'notification-section': {
      border: '1px solid',
      borderColor: 'brand.orange',
      borderRadius: '10px',
      p: 5,
      bg: 'rgba(237, 137, 54, 0.1)'
    },

    // Used inside another section
    'sub-section': {
      bg: 'brand.lighterGrey',
      p: 3,
      border: '1px',
      borderRadius: '6px',
      borderColor: 'brand.lightGrey',
      color: '#5E636E'
    },

    'borderless-sub-section': {
      bg: 'brand.lighterGrey',
      p: 3,
      borderRadius: '6px'
    }
  }
});
