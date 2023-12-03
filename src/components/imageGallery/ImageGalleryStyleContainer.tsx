import { Box } from '@chakra-ui/react';

const smallScreen = '768px';
const xSmallScreen = '480px';

const shadow = '0 2px 2px rgba(0,0,0,0.7)';

export const ImageGalleryStyleContainer = ({
  children,
  className
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <Box
    className={className}
    sx={{
      '.image-gallery-icon': {
        color: 'white',
        transition: 'all .3s ease-out',
        appearance: 'none',
        backgroundColor: 'transparent',
        border: 0,
        cursor: 'pointer',
        outline: 'none',
        position: 'absolute',
        zIndex: 4,
        filter: `drop-shadow(${shadow})`,

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            color: 'brand.blue',
            '.image-gallery-svg': {
              transform: 'scale(1.1)'
            }
          }
        },

        '&:focus': {
          // a11y support
          outline: (theme) => `2px solid ${theme.colors.brand.blue}`
        }
      },

      '.image-gallery-using-mouse': {
        '.image-gallery-icon': {
          '&:focus': {
            outline: 'none'
          }
        }
      },

      '.image-gallery-fullscreen-button, .image-gallery-play-button': {
        bottom: 0,
        padding: '20px',

        '.image-gallery-svg': {
          height: '28px',
          width: '28px'
        },

        [`@media (max-width: ${smallScreen})`]: {
          padding: '15px',

          '.image-gallery-svg': {
            height: '24px',
            width: '24px'
          }
        },

        [`@media (max-width: ${xSmallScreen})`]: {
          display: 'none',
          padding: '10px',

          '.image-gallery-svg': {
            height: '16px',
            width: '16px'
          }
        }
      },

      '.image-gallery-fullscreen-button': {
        right: 0
      },

      '.image-gallery-play-button': {
        left: 0
      },

      '.image-gallery-left-nav, .image-gallery-right-nav': {
        // padding: '50px 10px',
        padding: '-10px -10px',
        top: '50%',
        transform: 'translateY(-50%)',

        '.image-gallery-svg': {
          height: '120px',
          width: '60px'
        },

        '.image-navigation-svg': {
          height: '30px'
          // width: '60px'
        },

        [`@media (max-width: ${smallScreen})`]: {
          '.image-gallery-svg': {
            height: '72px',
            width: '36px'
          }
        },

        [`@media (max-width: ${xSmallScreen})`]: {
          '.image-gallery-svg': {
            height: '48px',
            width: '24px'
          }
        },

        '&[disabled]': {
          cursor: 'disabled',
          opacity: 0.6,
          pointerEvents: 'none'
        }
      },

      '.image-gallery-left-nav': {
        left: 0
      },

      '.image-gallery-right-nav': {
        right: 0
      },

      // End of Icon styles

      '.wrapper.fullscreen': {
        display: 'flex'
      },

      '.sidebar': {
        display: 'flex',
        flexGrow: 0
      },

      '&.image-gallery': {
        WebkitTapHighlightColor: 'transparent',
        position: 'relative',
        flexGrow: 1,

        '&.fullscreen-modal': {
          background: 'brand.darkestBlack',
          bottom: 0,
          height: '100%',
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 5,

          '.image-gallery-content': {
            top: '50%',
            transform: 'translateY(-50%)'
          }
        }
      },

      '.image-gallery-content': {
        position: 'relative',
        lineHeight: 0,
        top: 0,
        flexGrow: 1,

        '&.fullscreen': {
          background: 'brand.darkestBlack',
          width: '100%',
          '.image-gallery-image': {
            height: 'calc(100vh - 80px)' // 80 px for the thumbnail space
          }
        },

        '&.left, &.right': {
          '.image-gallery-slide .image-gallery-image': {
            maxHeight: '100vh'
          }
        }
      },

      '.image-gallery-slide-wrapper': {
        position: 'relative',

        '&.left, &.right': {
          display: 'inline-block',
          width: 'calc(100% - 110px)', // 100px + 10px for margin

          [`@media (max-width: ${smallScreen})`]: {
            width: 'calc(100% - 87px)' // 81px + 6px for margin
          }
        },

        '&.image-gallery-rtl': {
          direction: 'rtl'
        }
      },

      '.image-gallery-slides': {
        lineHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap',
        textAlign: 'center'
      },

      '.image-gallery-slide': {
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',

        '&.center': {
          position: 'relative'
        },

        '.image-gallery-image': {
          width: '100%',
          objectFit: 'contain',
          maxHeight: 'calc(100vh - 80px)' // 80 px for the thumbnail space
        },

        '.image-gallery-description': {
          background: 'brand.darkestBlack',
          bottom: '70px',
          color: 'white',
          left: 0,
          lineHeight: 1,
          padding: '10px 20px',
          position: 'absolute',
          whiteSpace: 'normal',

          [`@media (max-width: ${smallScreen})`]: {
            bottom: '45px',
            fontSize: '.8em',
            padding: '8px 15px'
          }
        }
      },

      '.image-gallery-bullets': {
        bottom: '8px',
        left: 0,
        margin: '0 auto',
        position: 'absolute',
        right: 0,
        width: '80%',
        zIndex: 4,

        '.image-gallery-bullets-container': {
          margin: 0,
          padding: 0,
          marginBottom: '10px',
          textAlign: 'center'
        },

        '.image-gallery-bullet': {
          appearance: 'none',
          backgroundColor: 'transparent',
          border: '1px solid white',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'inline-block',
          margin: '0 5px',
          outline: 'none',
          padding: '5px',
          transform: 'scale(0.7)',
          transition: 'all .2s ease-out',

          [`@media (max-width: ${smallScreen})`]: {
            margin: '0 3px',
            padding: '3px'
          },

          [`@media (max-width: ${xSmallScreen})`]: {
            padding: '2.7px'
          },

          '&:focus': {
            transform: 'scale(0.7)',
            background: 'brand.blue',
            border: (theme) => `1px solid ${theme.colors.brand.blue}`
          },

          '&.active': {
            transform: 'scale(0.7)',
            border: '1px solid white',
            background: 'white'
          },

          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
              background: 'brand.blue',
              border: (theme) => `1px solid ${theme.colors.brand.blue}`
            },

            '&.active:hover': {
              background: 'brand.blue'
            }
          }
        }
      },

      '.image-gallery-thumbnails-wrapper': {
        position: 'relative',

        '&.thumbnails-swipe-horizontal': {
          touchAction: 'pan-y'
        },

        '&.thumbnails-swipe-vertical': {
          touchAction: 'pan-x'
        },

        '&.thumbnails-wrapper-rtl': {
          direction: 'rtl'
        },

        '&.left, &.right': {
          display: 'inline-block',
          verticalAlign: 'top',
          width: '100px',

          [`@media (max-width: ${smallScreen})`]: {
            width: '81px' // 75px + 6px for border
          },

          '.image-gallery-thumbnails': {
            height: '100%',
            width: '100%',
            left: 0,
            padding: 0,
            position: 'absolute',
            top: 0,

            '.image-gallery-thumbnail': {
              display: 'block',
              marginRight: 0,
              padding: 0,

              '& + .image-gallery-thumbnail': {
                marginLeft: 0,
                marginTop: '2px'
              }
            }
          }
        },

        margin: '0 5px',

        [`@media (max-width: ${smallScreen})`]: {
          margin: '0 3px'
        }
      },

      '.image-gallery-thumbnails': {
        overflow: 'hidden',
        padding: '5px 0',

        [`@media (max-width: ${smallScreen})`]: {
          padding: '3px 0'
        },

        '.image-gallery-thumbnails-container': {
          cursor: 'pointer',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }
      },

      '.image-gallery-thumbnail': {
        display: 'inline-block',
        verticalAlign: 'middle',
        border: '4px solid transparent',
        transition: 'border .3s ease-out',
        maxWidth: '100px',
        background: 'transparent',
        padding: 0,

        [`@media (max-width: ${smallScreen})`]: {
          border: '3px solid transparent',
          width: '81px'
        },

        '+ .image-gallery-thumbnail': {
          marginLeft: '2px'
        },

        '.image-gallery-thumbnail-inner': {
          display: 'block',
          position: 'relative'
        },

        '.image-gallery-thumbnail-image': {
          verticalAlign: 'middle',
          width: '100%',
          lineHeight: 0,
          maxHeight: '60px'
        },

        '&.active, &:focus': {
          outline: 'none',
          border: (theme) => `4px solid ${theme.colors.brand.blue}`,

          [`@media (max-width: ${smallScreen})`]: {
            border: (theme) => `3px solid ${theme.colors.brand.blue}`
          }
        },

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            outline: 'none',
            border: (theme) => `4px solid ${theme.colors.brand.blue}`,

            [`@media (max-width: ${smallScreen})`]: {
              border: (theme) => `3px solid ${theme.colors.brand.blue}`
            }
          }
        }
      },

      '.image-gallery-thumbnail-label': {
        boxSizing: 'border-box',
        color: 'white',
        fontSize: '1em',
        left: 0,
        lineHeight: '1em',
        padding: '5%',
        position: 'absolute',
        top: '50%',
        textShadow: shadow,
        transform: 'translateY(-50%)',
        whiteSpace: 'normal',
        width: '100%',

        [`@media (max-width: ${smallScreen})`]: {
          fontSize: '.8em',
          lineHeight: '.8em'
        }
      },

      '.image-gallery-index': {
        background: 'brand.darkestBlack',
        color: 'white',
        lineHeight: 1,
        padding: '10px 20px',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 4,

        [`@media (max-width: ${smallScreen})`]: {
          fontSize: '.8em',
          padding: '5px 10px'
        }
      }
    }}
  >
    {children}
  </Box>
);
